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
import { ValueOf } from 'type-fest';

const Tab: Record<string, string> = {
	All: 'all',
	Presenters: 'presenters',
	Teachings: 'teachings',
	Series: 'series',
	Books: 'books',
	Sponsors: 'sponsors',
	Conferences: 'conferences',
	Music: 'music',
	Stories: 'stories',
};

export type TabId = ValueOf<typeof Tab>;

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

type Section = {
	id: TabId;
	heading: JSX.Element;
	seeAll: JSX.Element;
};

export const sectionDefinitions: Section[] = [
	{
		id: Tab.Presenters,
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
	{
		id: Tab.Teachings,
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
	{
		id: Tab.Series,
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
	{
		id: Tab.Books,
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
	{
		id: Tab.Sponsors,
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
	{
		id: Tab.Conferences,
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
	{
		id: Tab.Music,
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
	{
		id: Tab.Stories,
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
];

function getData(result: QueryResult): QueryShape | undefined {
	return Object.values(result.data || {}).find(
		(v) => typeof v !== 'string'
	) as QueryShape;
}

type RichSection = Section & {
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

	const visible =
		tab === 'all'
			? sectionDefinitions.filter((s) => getData(results[s.id])?.nodes?.length)
			: [sectionDefinitions.find((s) => s.id === tab) as Section];

	const rich = visible.map((s) => ({
		...s,
		innerData: getData(results[s.id]),
		nodes: getData(results[s.id])?.nodes || [],
		hasNextPage: getData(results[s.id])?.pageInfo.hasNextPage || false,
	}));

	return {
		isLoading: Object.values(results).some((r) => r.isLoading),
		visible: rich,
	};
}
