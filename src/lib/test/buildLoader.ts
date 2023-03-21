import { when } from 'jest-when';
import defaultsDeep from 'lodash/defaultsDeep';
import { PartialDeep } from 'type-fest';

import { fetchApi } from '@lib/api/fetchApi';

type Options = {
	useDefaults?: boolean;
};

export function buildLoader<T>(
	document: string,
	defaults: PartialDeep<T>
): (data?: PartialDeep<T>, options?: Options) => T {
	// TODO: Figure out how to set T to actual query return type
	// https://spin.atomicobject.com/2017/03/15/typescript-generate-test-data/
	// https://github.com/willryan/factory.ts/blob/master/src/sync.ts
	// It will already accept the type manually:
	// const loadData = buildLoader<GetHomeStaticPropsQuery>(GetHomeStaticPropsDocument, { .. })
	// should disallow including data in defaults that isn't in type
	return (
		data: PartialDeep<T> | Record<string, never> = {},
		{ useDefaults = true }: Options = {}
	) => {
		if (useDefaults) defaultsDeep(data, defaults);
		when(fetchApi)
			.calledWith(document, expect.anything())
			.mockResolvedValue(data);
		return data as T;
	};
}
