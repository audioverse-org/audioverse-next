import defaultsDeep from 'lodash/defaultsDeep';
import { PartialDeep } from 'type-fest';

import { fetchApi, __load } from '@lib/api/fetchApi';

export function buildLoader<T>(
	document: string,
	defaults: PartialDeep<T>
): (data?: PartialDeep<T>) => T {
	// TODO: Figure out how to set T to actual query return type
	// https://spin.atomicobject.com/2017/03/15/typescript-generate-test-data/
	// https://github.com/willryan/factory.ts/blob/master/src/sync.ts
	// It will already accept the type manually:
	// const loadData = buildLoader<GetHomeStaticPropsQuery>(GetHomeStaticPropsDocument, { .. })
	// should disallow including data in defaults that isn't in type
	return (data: PartialDeep<T> | Record<string, never> = {}) => {
		const value = defaultsDeep(data, defaults);
		__load(document, value);
		return value;
	};
}
