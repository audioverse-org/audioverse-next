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

type Section = {
	heading: JSX.Element;
	seeAll?: JSX.Element;
};

export const definitions: Record<string, Section> = {
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
	},
};

export type TabId = keyof typeof definitions;

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
	const { aggregate, nodes, pageInfo } = d as Record<string, unknown>;
	return (
		(aggregate === null || isObject(aggregate)) &&
		Array.isArray(nodes) &&
		isObject(pageInfo) &&
		typeof pageInfo.hasNextPage === 'boolean' &&
		(pageInfo.endCursor === null || typeof pageInfo.endCursor === 'string')
	);
}

function reduceInnerData(result: QueryResult): InnerData | undefined {
	const pages = result?.data?.pages || [];
	const values = pages.flatMap((p) => Object.values(p));
	const datas = values.filter(isInnerData);

	return {
		aggregate: datas[0]?.aggregate,
		nodes: datas.flatMap((d) => d.nodes || []),
		pageInfo: datas[datas.length - 1]?.pageInfo,
	};
}

type RichSection = Section & {
	id: TabId;
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

const opts = {
	getNextPageParam,
};

export default function useSections(tab: TabId): {
	isLoading: boolean;
	visible: RichSection[];
	loadMore: () => void;
} {
	const vars = {
		term: useQueryString('q') || '',
		language: useLanguageId(),
		first: PAGE_SIZE,
	};

	function f(doc: string) {
		return ({ pageParam = null }) =>
			fetchApi<OuterData>(doc, {
				variables: {
					...vars,
					after: pageParam,
				},
			});
	}

	const results: Record<TabId, QueryResult> = {
		presenters: useInfiniteQuery(
			['search', 'presenters', vars],
			f(GetSearchPersonsDocument),
			opts
		),
		teachings: useInfiniteQuery(
			['search', 'teachings', vars],
			f(GetSearchRecordingsDocument),
			opts
		),
		series: useInfiniteQuery(
			['search', 'series', vars],
			f(GetSearchSeriesDocument),
			opts
		),
		books: useInfiniteQuery(
			['search', 'books', vars],
			f(GetSearchAudiobooksDocument),
			opts
		),
		sponsors: useInfiniteQuery(
			['search', 'sponsors', vars],
			f(GetSearchSponsorsDocument),
			opts
		),
		conferences: useInfiniteQuery(
			['search', 'conferences', vars],
			f(GetSearchConferencesDocument),
			opts
		),
		music: useInfiniteQuery(
			['search', 'music', vars],
			f(GetSearchMusicTracksDocument),
			opts
		),
		stories: useInfiniteQuery(
			['search', 'stories', vars],
			f(GetSearchStoryProgramsDocument),
			opts
		),
	};

	const entries = Object.entries(definitions);

	const visible =
		tab === 'all'
			? entries.filter(([k]) => reduceInnerData(results[k])?.nodes?.length)
			: [entries.find(([k]) => k === tab) as [TabId, Section]];

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
