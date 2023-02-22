import React from 'react';
import { FormattedMessage } from 'react-intl';
import { InferrableEntity } from '@components/molecules/card/inferred';
import { useQueryString } from '@lib/useQueryString';
import { useLanguageId } from '@lib/useLanguageId';
import {
	GetSearchAudiobooksDocument,
	GetSearchConferencesDocument,
	GetSearchMusicTracksDocument,
	GetSearchPersonsDocument,
	GetSearchRecordingsDocument,
	GetSearchSeriesDocument,
	GetSearchSponsorsDocument,
	GetSearchStoryProgramsDocument,
} from '@lib/generated/graphql';
import { InfiniteQueryObserverResult, useInfiniteQuery } from 'react-query';
import { fetchApi } from '@lib/api/fetchApi';

const PAGE_SIZE = 10;

type Filter = {
	heading: JSX.Element;
	seeAll?: JSX.Element;
	document?: string;
};

export const filters: Record<string, Filter> = {
	all: {
		heading: <FormattedMessage id="search__allHeading" defaultMessage="All" />,
	},
	presenters: {
		heading: (
			<FormattedMessage
				id="search__presentersHeading"
				defaultMessage="Presenters"
			/>
		),
		seeAll: (
			<FormattedMessage
				id="search__presentersSeeAll"
				defaultMessage="See All Matching Presenters"
			/>
		),
		document: GetSearchPersonsDocument,
	},
	teachings: {
		heading: (
			<FormattedMessage
				id="search__teachingsHeading"
				defaultMessage="Teachings"
			/>
		),
		seeAll: (
			<FormattedMessage
				id="search__teachingsSeeAll"
				defaultMessage="See All Matching Teachings"
			/>
		),
		document: GetSearchRecordingsDocument,
	},
	series: {
		heading: (
			<FormattedMessage id="search__seriesHeading" defaultMessage="Series" />
		),
		seeAll: (
			<FormattedMessage
				id="search__seriesSeeAll"
				defaultMessage="See All Matching Series"
			/>
		),
		document: GetSearchSeriesDocument,
	},
	books: {
		heading: (
			<FormattedMessage id="search__booksHeading" defaultMessage="Audiobooks" />
		),
		seeAll: (
			<FormattedMessage
				id="search__booksSeeAll"
				defaultMessage="See All Matching Audiobooks"
			/>
		),
		document: GetSearchAudiobooksDocument,
	},
	sponsors: {
		heading: (
			<FormattedMessage
				id="search__sponsorsHeading"
				defaultMessage="Sponsors"
			/>
		),
		seeAll: (
			<FormattedMessage
				id="search__sponsorsSeeAll"
				defaultMessage="See All Matching Sponsors"
			/>
		),
		document: GetSearchSponsorsDocument,
	},
	conferences: {
		heading: (
			<FormattedMessage
				id="search__conferencesHeading"
				defaultMessage="Conferences"
			/>
		),
		seeAll: (
			<FormattedMessage
				id="search__conferencesSeeAll"
				defaultMessage="See All Matching Conferences"
			/>
		),
		document: GetSearchConferencesDocument,
	},
	music: {
		heading: (
			<FormattedMessage id="search__musicHeading" defaultMessage="Music" />
		),
		seeAll: (
			<FormattedMessage
				id="search__musicSeeAll"
				defaultMessage="See All Matching Music"
			/>
		),
		document: GetSearchMusicTracksDocument,
	},
	stories: {
		heading: (
			<FormattedMessage id="search__storiesHeading" defaultMessage="Stories" />
		),
		seeAll: (
			<FormattedMessage
				id="search__storiesSeeAll"
				defaultMessage="See All Matching Stories"
			/>
		),
		document: GetSearchStoryProgramsDocument,
	},
};

export type FilterId = keyof typeof filters;

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

function reduceInnerData(result: QueryResult): InnerData {
	const pages: OuterData[] = result?.data?.pages || [];
	const values: (InnerData | string)[] = pages.flatMap((p) => Object.values(p));
	const datas: InnerData[] = values.filter(isInnerData);

	return {
		aggregate: datas[0]?.aggregate,
		nodes: datas.flatMap((d) => d.nodes || []) || [],
		pageInfo: datas[datas.length - 1]?.pageInfo,
	};
}

type AugmentedFilter = Filter & {
	id: FilterId;
	innerData: InnerData | undefined;
	nodes: InferrableEntity[];
	hasNextPage: boolean;
};

function getNextPageParam(lastPage: {
	[queryName: string]: InnerData | string;
}) {
	const data = Object.values(lastPage).find(isInnerData);
	return data?.pageInfo.hasNextPage ? data.pageInfo.endCursor : undefined;
}

export default function useSearch(tab: FilterId): {
	isLoading: boolean;
	visible: AugmentedFilter[];
	loadMore: () => void;
} {
	const vars = {
		term: useQueryString('q') || '',
		language: useLanguageId(),
		first: PAGE_SIZE,
	};

	function useSearchQuery(tab: FilterId) {
		const doc = filters[tab].document;
		if (!doc) throw new Error('No document for tab');
		const fn = ({ pageParam = null }) =>
			fetchApi<OuterData>(doc, {
				variables: {
					...vars,
					after: pageParam,
				},
			});
		return useInfiniteQuery(['search', tab, vars], fn, {
			getNextPageParam,
		});
	}

	const results: Record<FilterId, QueryResult> = {
		presenters: useSearchQuery('presenters'),
		teachings: useSearchQuery('teachings'),
		series: useSearchQuery('series'),
		books: useSearchQuery('books'),
		sponsors: useSearchQuery('sponsors'),
		conferences: useSearchQuery('conferences'),
		music: useSearchQuery('music'),
		stories: useSearchQuery('stories'),
	};

	const entries = Object.entries(filters);

	const visible =
		tab === 'all'
			? entries.filter(([k]) => reduceInnerData(results[k]).nodes?.length)
			: [entries.find(([k]) => k === tab) as [FilterId, Filter]];

	const rich = visible.map(([k, s]) => {
		const data = reduceInnerData(results[k]);
		return {
			...s,
			id: k,
			innerData: data,
			nodes: data?.nodes || [],
			hasNextPage: results[k].hasNextPage || false,
		};
	});

	return {
		isLoading: Object.values(results).some((r) => r.isLoading),
		visible: rich,
		loadMore: () => {
			const r = results[tab];
			if (r.hasNextPage) {
				r.fetchNextPage();
			}
		},
	};
}
