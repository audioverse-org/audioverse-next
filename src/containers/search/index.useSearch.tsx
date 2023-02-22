import { InferrableEntity } from '@components/molecules/card/inferred';
import { useQueryString } from '@lib/useQueryString';
import { useLanguageId } from '@lib/useLanguageId';
import { InfiniteQueryObserverResult, useInfiniteQuery } from 'react-query';
import { fetchApi } from '@lib/api/fetchApi';
import { EntityFilter, EntityFilterId, filters } from './index.filters';

const PAGE_SIZE = 10;

type InnerData = {
	aggregate: {
		count: number;
	} | null;
	nodes: InferrableEntity[] | null;
	pageInfo: {
		hasNextPage: boolean;
		endCursor: string | null;
	};
};

type OuterData = {
	[queryName: string]: InnerData | string;
};

type QueryResult = InfiniteQueryObserverResult<OuterData>;

type AugmentedFilter = EntityFilter & {
	id: EntityFilterId;
	nodes: InferrableEntity[];
	hasNextPage: boolean;
};

function isObject(d: unknown): d is Record<string, unknown> {
	return typeof d === 'object' && d !== null;
}

function isInnerData(d: unknown): d is InnerData {
	if (!isObject(d)) return false;
	const { aggregate, nodes, pageInfo } = d;
	return (
		(aggregate === null || isObject(aggregate)) &&
		Array.isArray(nodes) &&
		isObject(pageInfo) &&
		typeof pageInfo.hasNextPage === 'boolean' &&
		(pageInfo.endCursor === null || typeof pageInfo.endCursor === 'string')
	);
}

function reduceNodes(result: QueryResult): InferrableEntity[] {
	const pages: OuterData[] = result.data?.pages || [];
	const values: (InnerData | string)[] = pages.flatMap((p) => Object.values(p));
	const datas: InnerData[] = values.filter(isInnerData);

	return datas.map((d) => d.nodes || []).flat();
}

function getNextPageParam(lastPage: {
	[queryName: string]: InnerData | string;
}) {
	const data = Object.values(lastPage).find(isInnerData);
	return data?.pageInfo.hasNextPage ? data.pageInfo.endCursor : undefined;
}

export default function useSearch(filter: EntityFilterId): {
	isLoading: boolean;
	visible: AugmentedFilter[];
	loadMore: () => void;
} {
	const vars = {
		term: useQueryString('q') || '',
		language: useLanguageId(),
		first: PAGE_SIZE,
	};

	function useFilterQuery(filter: EntityFilterId) {
		const doc = filters[filter].document;
		if (!doc) throw new Error('No document for filter');
		const fn = ({ pageParam = null }) =>
			fetchApi<OuterData>(doc, {
				variables: {
					...vars,
					after: pageParam,
				},
			});
		return useInfiniteQuery(['search', filter, vars], fn, {
			getNextPageParam,
		});
	}

	const results: Record<EntityFilterId, QueryResult> = {
		presenters: useFilterQuery('presenters'),
		teachings: useFilterQuery('teachings'),
		series: useFilterQuery('series'),
		books: useFilterQuery('books'),
		sponsors: useFilterQuery('sponsors'),
		conferences: useFilterQuery('conferences'),
		music: useFilterQuery('music'),
		stories: useFilterQuery('stories'),
	};

	const entries = Object.entries(results);

	const visible =
		filter === 'all'
			? entries.filter(([, r]) => reduceNodes(r).length)
			: [entries.find(([k]) => k === filter) as [EntityFilterId, QueryResult]];

	const augmented = visible.map(([k, r]) => ({
		...filters[k],
		id: k,
		nodes: reduceNodes(r),
		hasNextPage: r.hasNextPage || false,
	}));

	return {
		isLoading: Object.values(results).some((r) => r.isLoading),
		visible: augmented,
		loadMore: () => {
			const r = results[filter];
			if (r.hasNextPage) r.fetchNextPage();
		},
	};
}
