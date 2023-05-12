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

type Loader<T> = (
	data?: PartialDeep<T>,
	options?: Options
) => { data: T; promiseController?: PromiseController<PartialDeep<T>> };

export function buildLoader<T>(
	document: string,
	defaults: PartialDeep<T>
): Loader<T> {
	const loader = (
		data: PartialDeep<T> | Record<string, never> = {},
		{
			useDefaults = true,
			once = false,
			controlled = false,
			variables,
		}: Options = {}
	) => {
		if (useDefaults) defaultsDeep(data, defaults);

		// const onCall = when(fetchApi).calledWith(document, { variables });

		// console.dir({ variables }, { depth: null });

		let promiseController: PromiseController<PartialDeep<T>> | undefined =
			undefined;

		if (controlled) {
			const c = createControlledPromise<PartialDeep<T>>();

			promiseController = {
				resolve: (data?: PartialDeep<T>) => {
					c.resolve(data);
				},
				reject: (data?: PartialDeep<T>) => {
					c.reject(data);
				},
				promise: c.promise,
			};
			if (once) {
				__apiMockReturnValueOnce({ data: c.promise, document, variables });
			} else {
				__apiMockReturnValue({ data: c.promise, document, variables });
			}
		} else {
			if (once) {
				// when(fetchApi)
				// 	.calledWith(document, variables ? { variables } : expect.anything())
				// 	.mockResolvedValueOnce(data);

				__apiMockResolvedValueOnce({ data, document, variables });
			} else {
				// when(fetchApi)
				// 	.calledWith(document, variables ? { variables } : expect.anything())
				// 	.mockResolvedValue(data);

				__apiMockResolvedValue({ data, document, variables });
			}
		}

		return { data: data as T, promiseController };
	};

	return loader;
}
