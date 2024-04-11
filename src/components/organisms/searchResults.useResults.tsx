import {
	InfiniteQueryObserverResult,
	useInfiniteQuery,
} from '@tanstack/react-query';
import { useMemo } from 'react';
import { useDebounce } from 'use-debounce';

import { InferrableEntity } from '~components/molecules/card/inferred';
import { fetchApi } from '~lib/api/fetchApi';
import { useLanguageId } from '~lib/useLanguageId';

import { EntityFilter, EntityFilterId, filters } from './searchResults.filters';

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

export type AugmentedFilter = EntityFilter & {
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
	const pages: OuterData[] = result?.data?.pages.filter((p) => !!p) || [];
	const values: (InnerData | string)[] = pages.flatMap((p) => Object.values(p));
	const datas: InnerData[] = values.filter(isInnerData);
	return datas.map((d) => d.nodes || []).flat();
}

function getNextPageParam(lastPage: OuterData) {
	if (!isObject(lastPage)) return undefined;
	const d = Object.values(lastPage).find(isInnerData);
	if (!d) return undefined;
	const p = d.pageInfo;
	return p?.hasNextPage ? p?.endCursor : undefined;
}

function useFilterQuery(
	filter: EntityFilterId,
	vars: {
		term: string;
		language: string;
		first: number;
	},
	activeFilter: EntityFilterId
) {
	const doc = filters[filter].document;
	if (!doc) throw new Error('No document for filter');
	const fn = ({ pageParam = null }) =>
		fetchApi<OuterData>(doc, {
			variables: {
				...vars,
				after: pageParam,
			},
		});
	const isActive = filter === activeFilter || activeFilter === 'all';
	const enabled = !!vars.term && isActive;
	return useInfiniteQuery(['search', filter, vars], fn, {
		getNextPageParam,
		enabled,
	});
}

function useQueryResults(filter: EntityFilterId, term: string) {
	const language = useLanguageId();
	const [_term] = useDebounce(term, 200);

	const vars = useMemo(
		() => ({
			term: _term,
			language,
			first: PAGE_SIZE,
		}),
		[_term, language]
	);

	const results: Record<EntityFilterId, QueryResult> = {
		presenters: useFilterQuery('presenters', vars, filter),
		teachings: useFilterQuery('teachings', vars, filter),
		series: useFilterQuery('series', vars, filter),
		books: useFilterQuery('books', vars, filter),
		egwbooks: useFilterQuery('egwbooks', vars, filter),
		bibles: useFilterQuery('bibles', vars, filter),
		sponsors: useFilterQuery('sponsors', vars, filter),
		conferences: useFilterQuery('conferences', vars, filter),
		music: useFilterQuery('music', vars, filter),
		stories: useFilterQuery('stories', vars, filter),
	};

	return results;
}

export default function useResults(
	filter: EntityFilterId,
	term: string
): {
	isLoading: boolean;
	visible: AugmentedFilter[];
	loadMore: () => void;
} {
	const results = useQueryResults(filter, term);
	const result = results[filter];
	const entries = Object.entries(results);
	const nonEmpty = entries.filter(([, r]) => reduceNodes(r).length);
	const visible: [EntityFilterId, QueryResult][] =
		filter === 'all' ? nonEmpty : [[filter, result]];
	const augmented = visible.map(([k, r]) => ({
		...filters[k],
		id: k,
		nodes: reduceNodes(r),
		hasNextPage: r?.hasNextPage || false,
	}));

	return {
		isLoading:
			filter === 'all'
				? Object.values(results).some((r) => r.isLoading)
				: result.isLoading,
		visible: augmented,
		loadMore: () =>
			filter !== 'all' && result.hasNextPage && result.fetchNextPage(), // loads aditional results
	};
}
