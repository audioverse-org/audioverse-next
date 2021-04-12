import { REVALIDATE } from '@lib/constants';
import { Language } from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getPaginatedData, PaginatedGetter } from '@lib/getPaginatedData';
import getPaginationPageCount from '@lib/getPaginationPageCount';

export interface PaginationData {
	total: number;
	current: number;
}

export interface PaginatedStaticProps<T, N> {
	props: {
		nodes: N[];
		pagination: PaginationData;
		data: T | null;
	};
	revalidate: number;
}

export async function getPaginatedStaticProps<T, N>(
	params: {
		language: string;
		i: number | string;
	},
	getter: PaginatedGetter<T, { language: Language }>,
	parseNodes: (data: T) => N[] | null | undefined,
	parseCount: (count: T) => number | null | undefined
): Promise<PaginatedStaticProps<T, N>> {
	const { i: pageIndex, language: languageRoute } = params;
	const data = await getPaginatedData(pageIndex, getter, {
		language: getLanguageIdByRoute(languageRoute),
	});
	const nodes = (data && parseNodes(data)) || [];
	const count = (data && parseCount(data)) || 0;
	const total = getPaginationPageCount(count);

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
