import { when } from 'jest-when';
import defaultsDeep from 'lodash/defaultsDeep';

import * as api from '~lib/api/fetchApi';
import { PartialDeepRecursive } from '~src/types/types';

import {
	createControlledPromise,
	PromiseController,
} from './loadControlledPromise';

type Options = {
	useDefaults?: boolean;
	once?: boolean;
	controlled?: boolean;
	variables?: Record<string, unknown>;
};

type PartialData<T> = PartialDeepRecursive<T> | Record<string, never>;

type Loader<T> = (
	data?: PartialData<T>,
	options?: Options
) => {
	data: PartialData<T>;
	controller?: PromiseController<PartialData<T>>;
};

function getController<T>(defaults: PartialData<T>) {
	const c = createControlledPromise<PartialData<T>>();

	return {
		...c,
		resolve: (d: PartialData<T> = {}) => c.resolve(defaultsDeep(d, defaults)),
		reject: (d: PartialData<T> = {}) => c.reject(defaultsDeep(d, defaults)),
	};
}

export function buildLoader<T>(
	document: string,
	defaults: PartialData<T>
): Loader<T> {
	const fn = (d: PartialData<T> = {}, o: Options = {}) => {
		if (o.useDefaults !== false) defaultsDeep(d, defaults);

		const m = api.__apiDocumentMock(document);
		const c = o.controlled ? getController<T>(d) : undefined;
		const p = c?.promise ?? Promise.resolve(d);

		if (o.variables && o.once) {
			when(m).calledWith(o.variables).mockReturnValueOnce(p);
		} else if (o.variables) {
			when(m).calledWith(o.variables).mockReturnValue(p);
		} else if (o.once) {
			m.mockReturnValueOnce(p);
		} else {
			m.mockReturnValue(p);
		}

		return { data: d, controller: c };
	};

	return fn;
}
