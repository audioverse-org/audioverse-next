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

export function getLibraryPlaybackStatusDataVariables(
	language: Language,
	viewerPlaybackStatus: RecordingViewerPlaybackStatus,
	sort: string
): GetLibraryDataQueryVariables {
	const { sortField, sortDirection } = getLibraryDataDefaultVariables(
		language,
		sort
	);
	return {
		language,
		first: 1500,
		offset: 0,
		groupSequences: true,
		types: null,
		viewerPlaybackStatus,
		sortField,
		sortDirection,
	};
}

function LibraryPlaybackStatus({
	language,
	viewerPlaybackStatus,
	path,
}: ILibraryPlaybackStatusProps): JSX.Element {
	const router = useRouter();

	const { data, isLoading } = useGetLibraryDataQuery(
		getLibraryPlaybackStatusDataVariables(
			language,
			viewerPlaybackStatus,
			router.query.sort as string
		)
	);

	const items = data?.me?.user.favorites.nodes || [];

	return (
		<div className={baseStyles.wrapper}>
			<LibraryNav currentNavHref={path} />

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
