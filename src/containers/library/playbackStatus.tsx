import React from 'react';
import { FormattedMessage } from 'react-intl';

import withAuthGuard from '@components/HOCs/withAuthGuard';
import CardFavorite from '@components/molecules/card/favorite';
import CardMasonry from '@components/molecules/cardMasonry';
import LibraryError from '@components/organisms/libraryError';
import LibraryNav from '@components/organisms/libraryNav';
import {
	GetLibraryDataQueryVariables,
	Language,
	RecordingViewerPlaybackStatus,
	useGetLibraryDataQuery,
} from '@lib/generated/graphql';

import baseStyles from './base.module.scss';
import LibraryLoggedOut from './loggedOut';

export type ILibraryPlaybackStatusProps = {
	language: Language;
	path: string;
	viewerPlaybackStatus: RecordingViewerPlaybackStatus;
};

export function getLibraryPlaybackStatusDataVariables(
	language: Language,
	viewerPlaybackStatus: RecordingViewerPlaybackStatus
): GetLibraryDataQueryVariables {
	return {
		language,
		first: 25,
		offset: 0,
		groupSequences: true,
		types: null,
		viewerPlaybackStatus,
	};
}

function LibraryPlaybackStatus({
	language,
	viewerPlaybackStatus,
	path,
}: ILibraryPlaybackStatusProps): JSX.Element {
	const { data } = useGetLibraryDataQuery(
		getLibraryPlaybackStatusDataVariables(language, viewerPlaybackStatus)
	);

	const items = data?.me?.user.favorites.nodes || [];

	return (
		<div className={baseStyles.wrapper}>
			<LibraryNav currentNavHref={path} />

			{items.length ? (
				<CardMasonry
					items={items}
					render={({ data }) => <CardFavorite favorite={data} />}
					key={viewerPlaybackStatus}
				/>
			) : (
				<LibraryError
					title={
						viewerPlaybackStatus === RecordingViewerPlaybackStatus.Finished ? (
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
