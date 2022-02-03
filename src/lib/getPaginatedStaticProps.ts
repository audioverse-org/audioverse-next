import find from 'lodash/find';

import { IBaseProps } from '@containers/base';
import { LANGUAGES, REVALIDATE } from '@lib/constants';
import { Language } from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getPaginatedData, PaginatedGetter } from '@lib/getPaginatedData';
import getPaginationPageCount from '@lib/getPaginationPageCount';

export interface PaginationData {
	total: number;
	current: number;
}

export interface PaginatedProps<N, T = null> {
	nodes: N[];
	pagination: PaginationData;
	data: T | null;
}

export interface PaginatedStaticProps<T, N> {
	props: PaginatedProps<N, T>;
	revalidate: number;
}

export async function getPaginatedStaticProps<T, N>(
	params:
		| {
				language: string;
				i: number | string;
		  }
		| undefined,
	getter: PaginatedGetter<T, { language: Language }>,
	parseNodes: (data: T) => N[] | null | undefined,
	parseCount: (count: T) => number | null | undefined,
	parseExtraProps?: (data: T | null) => Record<string, unknown> & IBaseProps
): Promise<PaginatedStaticProps<T, N>> {
	const { i: pageIndex, language: languageRoute } = params || {
		language: Language.English,
		i: '1',
	};
	if (!find(LANGUAGES, (l) => l.base_url === languageRoute)) {
		return formatPaginatedStaticProps(null as unknown as T, [], 0, +pageIndex);
	}
	const data = await getPaginatedData(pageIndex, getter, {
		language: getLanguageIdByRoute(languageRoute),
	});
	const nodes = (data && parseNodes(data)) || [];
	const count = (data && parseCount(data)) || 0;
	const extraProps = (parseExtraProps && parseExtraProps(data)) || {};

	return formatPaginatedStaticProps(data, nodes, count, +pageIndex, extraProps);
}

export function formatPaginatedStaticProps<T, N>(
	data: T | null,
	nodes: N[],
	count: number,
	current = 1,
	extraProps: Record<string, unknown> & IBaseProps = {}
): PaginatedStaticProps<T, N> {
	const total = getPaginationPageCount(count);

	return {
		props: {
			...extraProps,
			nodes,
			pagination: {
				total,
				current,
			},
			data,
		},
		revalidate: REVALIDATE,
	};
}
