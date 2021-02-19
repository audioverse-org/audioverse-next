import { ENTRIES_PER_PAGE, REVALIDATE } from '@lib/constants';
import { Language } from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

// TODO: Improve nodes type
export interface PaginatedStaticProps<T, N> {
	props: {
		nodes: N[];
		pagination: {
			total: number;
			current: number;
		};
		data: T | null;
	};
	revalidate: number;
}

interface Getter<T> {
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

export async function getPaginatedStaticProps<T, N>(
	params: {
		language: string;
		i: number | string;
	},
	getter: Getter<T>,
	parseNodes: (data: T) => N[] | null | undefined,
	parseCount: (count: T) => number | null | undefined
): Promise<PaginatedStaticProps<T, N>> {
	const { language: languageRoute, i: pageIndex } = params;

	const data = await getter({
		language: getLanguageIdByRoute(languageRoute),
		offset: (+pageIndex - 1) * ENTRIES_PER_PAGE,
		first: ENTRIES_PER_PAGE,
	}).catch(() => null);

	const nodes = (data && parseNodes(data)) || [];
	const count = (data && parseCount(data)) || 0;
	const total = Math.ceil(count / ENTRIES_PER_PAGE);

	return {
		props: {
			nodes,
			pagination: {
				total,
				current: +pageIndex,
			},
			data,
		},
		revalidate: REVALIDATE,
	};
}
