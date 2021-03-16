import { ENTRIES_PER_PAGE, REVALIDATE } from '@lib/constants';
import { getPaginatedData, PaginatedGetter } from '@lib/getPaginatedData';

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
	getter: PaginatedGetter<T>,
	parseNodes: (data: T) => N[] | null | undefined,
	parseCount: (count: T) => number | null | undefined
): Promise<PaginatedStaticProps<T, N>> {
	const { i: pageIndex } = params;
	const data = await getPaginatedData(params, getter);
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
