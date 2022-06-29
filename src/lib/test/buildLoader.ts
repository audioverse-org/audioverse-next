import { when } from 'jest-when';
import defaultsDeep from 'lodash/defaultsDeep';
import { PartialDeep } from 'type-fest';

import { fetchApi } from '@lib/api/fetchApi';

type LoaderOptions<T> = {
	data?: Partial<T> | PartialDeep<T>;
	merge?: boolean;
};

export function buildLoader<T>(
	document: string,
	defaults: PartialDeep<T>
): (options?: LoaderOptions<T>) => T {
	// TODO: Figure out how to set T to actual query return type
	// https://spin.atomicobject.com/2017/03/15/typescript-generate-test-data/
	// https://github.com/willryan/factory.ts/blob/master/src/sync.ts
	// It will already accept the type manually:
	// const loadData = buildLoader<GetHomeStaticPropsQuery>(GetHomeStaticPropsDocument, { .. })
	// should disallow including data in defaults that isn't in type
	return (options: LoaderOptions<T> = {}) => {
		const { data, merge = true } = options;
		const value = defaultsDeep(data, merge ? defaults : {});
		when(fetchApi)
			.calledWith(document, expect.anything())
			.mockResolvedValue(value);
		return value;
	};
}
