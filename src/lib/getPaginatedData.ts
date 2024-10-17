import { ENTRIES_PER_PAGE } from '~lib/constants';
import getPageOffset from '~lib/getPageOffset';

export interface PaginatedGetter<T, E> {
	(variables: { offset: number; first: number } & E): Promise<T>;
}

export async function getPaginatedData<T, E>(
	index: number | string,
	getter: PaginatedGetter<T, E>,
	extraVariables: E = {} as E,
): Promise<T | null> {
	return getter({
		...extraVariables,
		offset: getPageOffset(index),
		first: ENTRIES_PER_PAGE,
	}).catch(() => null);
}
