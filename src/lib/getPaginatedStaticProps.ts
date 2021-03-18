import { REVALIDATE } from '@lib/constants';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getPaginatedData, PaginatedGetter } from '@lib/getPaginatedData';
import getPaginationPageCount from '@lib/getPaginationPageCount';

export interface PaginationData {
	total: number;
	current: number;
}

// TODO: Improve nodes type
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
	getter: PaginatedGetter<T, { language: string }>,
	parseNodes: (data: T) => N[] | null | undefined,
	parseCount: (count: T) => number | null | undefined
): Promise<PaginatedStaticProps<T, N>> {
	const { i: pageIndex, language } = params;
	const data = await getPaginatedData(pageIndex, getter, {
		language: getLanguageIdByRoute(language),
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
