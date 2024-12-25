import { ENTRIES_PER_PAGE } from '~lib/constants';

export interface PaginatedGetter<T, E> {
	(variables: { offset: number; first: number } & E): Promise<T>;
}

function getPageOffset(page: number | string): number {
	return (+page - 1) * ENTRIES_PER_PAGE;
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
