import defaultsDeep from 'lodash/defaultsDeep';
import { PartialDeep } from 'type-fest';

import * as api from '~lib/api/fetchApi';

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

type PartialData<T> = PartialDeep<T> | Record<string, never>;

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

		const t = o.once ? api.__apiMockReturnValueOnce : api.__apiMockReturnValue;
		const c = o.controlled ? getController<T>(d) : undefined;
		const p = c?.promise ?? Promise.resolve(d);

		t({ data: p, document, variables: o.variables });

		return { data: d, controller: c };
	};

	return fn;
}
