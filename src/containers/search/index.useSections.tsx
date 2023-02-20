import React from 'react';
import { FormattedMessage } from 'react-intl';
import { InferrableEntity } from '@components/molecules/card/inferred';
import { useQueryString } from '@lib/useQueryString';
import { useLanguageId } from '@lib/useLanguageId';
import {
	useGetSearchAudiobooksQuery,
	useGetSearchConferencesQuery,
	useGetSearchMusicTracksQuery,
	useGetSearchPersonsQuery,
	useGetSearchRecordingsQuery,
	useGetSearchSeriesQuery,
	useGetSearchSponsorsQuery,
	useGetSearchStoryProgramsQuery,
} from '@lib/generated/graphql';
import { QueryObserverResult } from 'react-query';

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

type QueryShape = {
	aggregate: {
		count: number;
	} | null;
	nodes: InferrableEntity[] | null;
	pageInfo: {
		hasNextPage: boolean;
		endCursor: string | null;
	};
};

type QueryResult = QueryObserverResult<{
	[queryName: string]: QueryShape | string;
}>;

function getData(result: QueryResult): QueryShape | undefined {
	return Object.values(result?.data || {}).find(
		(v) => typeof v !== 'string'
	) as QueryShape;
}

type RichSection = Section & {
	id: TabId;
	innerData: QueryShape | undefined;
	nodes: InferrableEntity[];
	hasNextPage: boolean;
};

export default function useSections(tab: TabId): {
	isLoading: boolean;
	visible: RichSection[];
} {
	const vars = {
		term: useQueryString('q') || '',
		language: useLanguageId(),
		first: 3,
		after: null,
	};

	const results: Record<TabId, QueryResult> = {
		presenters: useGetSearchPersonsQuery(vars),
		teachings: useGetSearchRecordingsQuery(vars),
		series: useGetSearchSeriesQuery(vars),
		books: useGetSearchAudiobooksQuery(vars),
		sponsors: useGetSearchSponsorsQuery(vars),
		conferences: useGetSearchConferencesQuery(vars),
		music: useGetSearchMusicTracksQuery(vars),
		stories: useGetSearchStoryProgramsQuery(vars),
	};

	const entries = Object.entries(definitions);

	const visible =
		tab === 'all'
			? entries.filter(([k]) => getData(results[k])?.nodes?.length)
			: [entries.find(([k]) => k === tab) as [TabId, Section]];

	const rich = visible.map(([k, s]) => ({
		...s,
		id: k,
		innerData: getData(results[k]),
		nodes: getData(results[k])?.nodes || [],
		hasNextPage: getData(results[k])?.pageInfo.hasNextPage || false,
	}));

	return {
		isLoading: Object.values(results).some((r) => r.isLoading),
		visible: rich,
	};
}
