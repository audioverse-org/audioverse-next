import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import {
	GetSearchAudiobooksDocument,
	GetSearchConferencesDocument,
	GetSearchMusicTracksDocument,
	GetSearchPersonsDocument,
	GetSearchRecordingsDocument,
	GetSearchSeriesDocument,
	GetSearchSponsorsDocument,
	GetSearchStoryProgramsDocument,
} from './__generated__/searchResults';

export type EntityFilter = {
	heading: JSX.Element;
	seeAll?: JSX.Element;
	document?: string;
};

export type EntityFilterId = keyof typeof filters;

export function useContextualFilterId(): EntityFilterId {
	const { pathname } = useRouter();
	const filterIds = Object.keys(filters) as EntityFilterId[];
	const filterId = filterIds.find((id) =>
		pathname.match(`/\\[language\\]\\/${id}/`)
	);

	return filterId || 'all';
}

export const filters: Record<string, EntityFilter> = {
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
