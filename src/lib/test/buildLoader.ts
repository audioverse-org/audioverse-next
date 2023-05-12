import defaultsDeep from 'lodash/defaultsDeep';
import { PartialDeep } from 'type-fest';

import {
	__apiMockResolvedValue,
	__apiMockResolvedValueOnce,
	__apiMockReturnValue,
	__apiMockReturnValueOnce,
} from '~lib/api/fetchApi';

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
) => { data: T; promiseController?: PromiseController<PartialData<T>> };

function getController<T>(defaults: PartialData<T>) {
	const c = createControlledPromise<PartialData<T>>();

	return {
		resolve: (data: PartialData<T> = {}) =>
			c.resolve(defaultsDeep(data, defaults)),
		reject: (data: PartialData<T> = {}) =>
			c.reject(defaultsDeep(data, defaults)),
		promise: c.promise,
	};
}

export function buildLoader<T>(
	document: string,
	defaults: PartialData<T>
): Loader<T> {
	const loader = (
		data: PartialData<T> = {},
		{
			useDefaults = true,
			once = false,
			controlled = false,
			variables,
		}: Options = {}
	) => {
		if (useDefaults) defaultsDeep(data, defaults);

		const train = once ? __apiMockReturnValueOnce : __apiMockReturnValue;
		const promiseController = controlled ? getController<T>(data) : undefined;
		const payload = promiseController?.promise ?? Promise.resolve(data);

		train({ data: payload, document, variables });

		return { data: data as T, promiseController };
	};

	return loader;
}
