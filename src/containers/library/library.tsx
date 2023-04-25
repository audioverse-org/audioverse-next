import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import withAuthGuard from '~components/HOCs/withAuthGuard';
import CardFavorite from '~components/molecules/card/favorite';
import CardMasonry from '~components/molecules/cardMasonry';
import LoadingCards from '~components/molecules/loadingCards';
import EmptyState from '~components/organisms/emptyState';
import LibraryNav from '~components/organisms/libraryNav';
import {
	FavoritableCatalogEntityType,
	FavoritesSortableField,
	Language,
	OrderByDirection,
	RecordingContentType,
	RecordingViewerPlaybackStatus,
} from '~src/__generated__/graphql';

import {
	GetLibraryDataQueryVariables,
	useGetLibraryDataQuery,
} from './__generated__/library';
import baseStyles from './base.module.scss';
import LibraryLoggedOut from './loggedOut';

export const SORT_MAP = {
	new: [FavoritesSortableField.FavoritedAt, OrderByDirection.Desc],
	old: [FavoritesSortableField.FavoritedAt, OrderByDirection.Asc],
	a: [FavoritesSortableField.EntityTitle, OrderByDirection.Asc],
	z: [FavoritesSortableField.EntityTitle, OrderByDirection.Desc],
} as Record<string, [FavoritesSortableField, OrderByDirection]>;

export const CONTENT_TYPE_MAP = {
	people: [FavoritableCatalogEntityType.Person],
	conferences: [FavoritableCatalogEntityType.Collection],
	series: [FavoritableCatalogEntityType.Sequence],
	sponsors: [FavoritableCatalogEntityType.Sponsor],
} as Record<string, FavoritableCatalogEntityType[]>;

export const RECORDING_CONTENT_TYPE_MAP = {
	teachings: RecordingContentType.Sermon,
	music: RecordingContentType.MusicTrack,
	audiobooks: RecordingContentType.AudiobookTrack,
	stories: RecordingContentType.Story,
} as Record<string, RecordingContentType>;

const MEDIA_TYPE_MAP = {
	video: true,
	audio: false,
} as Record<string, boolean>;

const DURATION_MAP = {
	'15': [900, 1800],
	'30': [1800, 2700],
	'45': [2700, 3600],
	'60': [3600, null],
} as Record<string, [number, number | null]>;

const PLAYBACK_STATUS_MAP = {
	unstarted: RecordingViewerPlaybackStatus.Unstarted,
	started: RecordingViewerPlaybackStatus.Started,
	finished: RecordingViewerPlaybackStatus.Finished,
} as Record<string, RecordingViewerPlaybackStatus>;

export type ILibraryProps = {
	language: Language;
};

function Library({ language }: ILibraryProps): JSX.Element {
	const router = useRouter();
	let querySort = router.query.sort as string;
	const queryContentType = router.query.contentType as string;

	if (!(SORT_MAP as Record<string, unknown>)[querySort]) {
		querySort = 'new';
	}
	const [sortField, sortDirection] =
		SORT_MAP[querySort as keyof typeof SORT_MAP];

	let types = null;
	if (CONTENT_TYPE_MAP[queryContentType]) {
		types = CONTENT_TYPE_MAP[queryContentType];
	}

	let recordingContentType = null;
	if (RECORDING_CONTENT_TYPE_MAP[queryContentType]) {
		recordingContentType = RECORDING_CONTENT_TYPE_MAP[queryContentType];
	}

	const queryMediaType = router.query.mediaType + '';
	let hasVideo = null;
	if (typeof MEDIA_TYPE_MAP[queryMediaType] === 'boolean') {
		hasVideo = MEDIA_TYPE_MAP[queryMediaType];
	}

	const queryDuration = router.query.duration + '';
	let recordingDuration = null;
	if (DURATION_MAP[queryDuration]) {
		const [min, max] = DURATION_MAP[queryDuration];
		recordingDuration = {
			greaterThan: min,
			lessThan: max,
			greaterThanOrEqualTo: null,
			lessThanOrEqualTo: null,
		};
	}

	const queryPlaybackStatus = router.query.playbackStatus + '';
	let viewerPlaybackStatus = null;
	if (PLAYBACK_STATUS_MAP[queryPlaybackStatus]) {
		viewerPlaybackStatus = PLAYBACK_STATUS_MAP[queryPlaybackStatus];
	}

	const variables: GetLibraryDataQueryVariables = {
		language,
		first: 1500,
		offset: 0,
		groupSequences: true,
		hasVideo,
		recordingContentType,
		recordingDuration,
		types,
		viewerPlaybackStatus,
		sortField,
		sortDirection,
	};

	const { data, isLoading } = useGetLibraryDataQuery(variables);
	const items = data?.me?.user.favorites.nodes || [];

	const filtersApplied =
		Object.keys(router.query).filter((k) => router.query[k]).length > 0;

	return (
		<div className={baseStyles.wrapper}>
			<LibraryNav currentNavHref="" />

			{isLoading ? (
				<LoadingCards />
			) : items.length ? (
				<CardMasonry
					items={items}
					render={({ data }) => <CardFavorite favorite={data} />}
					key={`item-${items.length}`}
				/>
			) : filtersApplied ? (
				<EmptyState
					title={
						<FormattedMessage
							id="library__noMatchingHeading"
							defaultMessage="You don’t have any matching items saved yet"
						/>
					}
					message={
						<FormattedMessage
							id="library__noMatchingCopy"
							defaultMessage="Bookmark items or listen to items from the Discover page."
						/>
					}
				/>
			) : (
				<EmptyState
					title={
						<FormattedMessage
							id="library__emptyHeading"
							defaultMessage="You don’t have any items saved yet"
						/>
					}
					message={
						<FormattedMessage
							id="library__emptyCopy"
							defaultMessage="Bookmark items or listen to items from the Discover page."
						/>
					}
				/>
			)}
		</div>
	);
}

export default withAuthGuard(Library, LibraryLoggedOut);
