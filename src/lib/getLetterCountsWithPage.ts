import { ENTRIES_PER_PAGE } from './constants';

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
