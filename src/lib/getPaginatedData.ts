import { ENTRIES_PER_PAGE } from '@lib/constants';
import getPageOffset from '@lib/getPageOffset';

export interface PaginatedGetter<T, E> {
	(variables: { offset: number; first: number } & E): Promise<T>;
}

export async function getPaginatedData<T, E>(
	index: number | string,
	getter: PaginatedGetter<T, E>,
	extraVariables: E = {} as E
): Promise<T | null> {
	return getter({
		...extraVariables,
		offset: getPageOffset(index),
		first: ENTRIES_PER_PAGE,
	}).catch(() => null);
}

export function getLetterCountsWithPage(
	letterCounts: { letter: string; count: number }[]
): { letter: string; page: number }[] {
	const { lettersByPage } = letterCounts.reduce(
		({ lettersByPage, currentSum }, { count, letter }) => {
			lettersByPage.push({
				letter,
				page: Math.ceil(currentSum / ENTRIES_PER_PAGE) || 1,
			});
			currentSum += count;
			return { lettersByPage, currentSum };
		},
		{ lettersByPage: [] as { letter: string; page: number }[], currentSum: 0 }
	);
	return lettersByPage;
}
