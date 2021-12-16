import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import withAuthGuard from '@components/HOCs/withAuthGuard';
import CardFavorite from '@components/molecules/card/favorite';
import CardMasonry from '@components/molecules/cardMasonry';
import LoadingCards from '@components/molecules/loadingCards';
import LibraryError from '@components/organisms/libraryError';
import LibraryNav from '@components/organisms/libraryNav';
import {
	GetLibraryDataQueryVariables,
	Language,
	RecordingContentType,
	RecordingViewerPlaybackStatus,
	useGetLibraryDataQuery,
} from '@lib/generated/graphql';

import baseStyles from './base.module.scss';
import LibraryLoggedOut from './loggedOut';

import { getLibraryDataDefaultVariables } from '.';

export type ILibraryPlaybackStatusProps = {
	language: Language;
	path: string;
	viewerPlaybackStatus: RecordingViewerPlaybackStatus;
};

const CONTENT_TYPE_MAP = {
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

export function getLibraryPlaybackStatusDataVariables(
	language: Language,
	viewerPlaybackStatus: RecordingViewerPlaybackStatus,
	sort: string
): GetLibraryDataQueryVariables {
	const defaultVariables = getLibraryDataDefaultVariables(language, sort, '');
	return {
		...defaultVariables,
		first: 1500,
		viewerPlaybackStatus,
	};
}

function LibraryPlaybackStatus({
	language,
	viewerPlaybackStatus,
	path,
}: ILibraryPlaybackStatusProps): JSX.Element {
	const router = useRouter();

	const queryContentType = router.query.contentType + '';
	let recordingContentType = null;
	if (CONTENT_TYPE_MAP[queryContentType]) {
		recordingContentType = CONTENT_TYPE_MAP[queryContentType];
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

	const { data, isLoading } = useGetLibraryDataQuery({
		...getLibraryPlaybackStatusDataVariables(
			language,
			viewerPlaybackStatus,
			router.query.sort as string
		),
		hasVideo,
		recordingContentType,
		recordingDuration,
	});

	const filtersApplied = queryContentType || queryDuration;

	const items = data?.me?.user.favorites.nodes || [];

	return (
		<div className={baseStyles.wrapper}>
			<LibraryNav currentNavHref={path} useRecordingFilters />

			{isLoading ? (
				<LoadingCards />
			) : items.length ? (
				<CardMasonry
					items={items}
					render={({ data }) => <CardFavorite favorite={data} />}
					key={`${viewerPlaybackStatus}-${items.length}`}
				/>
			) : (
				<LibraryError
					title={
						filtersApplied ? (
							viewerPlaybackStatus ===
							RecordingViewerPlaybackStatus.Finished ? (
								<FormattedMessage
									id="libraryPlaybackStatus__finishedNoMatchingHeading"
									defaultMessage="You haven’t finished any matching items yet"
								/>
							) : viewerPlaybackStatus ===
							  RecordingViewerPlaybackStatus.Started ? (
								<FormattedMessage
									id="libraryPlaybackStatus__startedNoMatchingHeading"
									defaultMessage="You haven’t started any matching items yet"
								/>
							) : (
								<FormattedMessage
									id="libraryPlaybackStatus__unstartedNoMatchingHeading"
									defaultMessage="You don’t have any matching items saved yet"
								/>
							)
						) : viewerPlaybackStatus ===
						  RecordingViewerPlaybackStatus.Finished ? (
							<FormattedMessage
								id="libraryPlaybackStatus__finishedEmptyHeading"
								defaultMessage="You haven’t finished any items yet"
							/>
						) : viewerPlaybackStatus ===
						  RecordingViewerPlaybackStatus.Started ? (
							<FormattedMessage
								id="libraryPlaybackStatus__startedEmptyHeading"
								defaultMessage="You haven’t started any items yet"
							/>
						) : (
							<FormattedMessage
								id="libraryPlaybackStatus__unstartedEmptyHeading"
								defaultMessage="You don’t have any items saved yet"
							/>
						)
					}
					message={
						<FormattedMessage
							id="libraryPlaybackStatus__emptyCopy"
							defaultMessage="Find something to listen to on the Discover page."
						/>
					}
				/>
			)}
		</div>
	);
}

export default withAuthGuard(LibraryPlaybackStatus, LibraryLoggedOut);
