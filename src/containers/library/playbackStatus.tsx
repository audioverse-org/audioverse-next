import React from 'react';

import withAuthGuard from '@components/HOCs/withAuthGuard';
import CardFavorite from '@components/molecules/card/favorite';
import CardMasonry from '@components/molecules/cardMasonry';
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

	return (
		<div className={baseStyles.wrapper}>
			<LibraryNav currentNavHref={path} />

			<CardMasonry
				items={data?.me?.user.favorites.nodes || []}
				render={({ data }) => <CardFavorite favorite={data} />}
				key={viewerPlaybackStatus}
			/>
		</div>
	);
}

export default withAuthGuard(LibraryPlaybackStatus, LibraryLoggedOut);
