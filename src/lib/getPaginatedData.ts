import { ENTRIES_PER_PAGE } from '@lib/constants';
import { Language } from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import getPageOffset from '@lib/getPageOffset';

export interface PaginatedGetter<T> {
	({
		language,
		offset,
		first,
	}: {
		language: Language;
		offset: number;
		first: number;
	}): Promise<T>;
}

export async function getPaginatedData<T>(
	params: {
		language: string;
		i: number | string;
	},
	getter: PaginatedGetter<T>
): Promise<T | null> {
	const { language, i } = params;
	return getter({
		language: getLanguageIdByRoute(language),
		offset: getPageOffset(i),
		first: ENTRIES_PER_PAGE,
	}).catch(() => null);
}
