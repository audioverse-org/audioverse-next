import clsx from 'clsx';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import InfoBox from '@components/atoms/infoBox';
import LineHeading from '@components/atoms/lineHeading';
import withAuthGuard from '@components/HOCs/withAuthGuard';
import CardFavorite from '@components/molecules/card/favorite';
import CardPlaylist from '@components/molecules/card/playlist';
import CardMasonry from '@components/molecules/cardMasonry';
import LibraryError from '@components/organisms/libraryError';
import LibraryNav from '@components/organisms/libraryNav';
import {
	FavoritableCatalogEntityType,
	Language,
	useGetLibraryDataQuery,
	useGetLibraryPlaylistsDataQuery,
} from '@lib/generated/graphql';

import baseStyles from './base.module.scss';
import styles from './collections.module.scss';
import LibraryLoggedOut from './loggedOut';

import { getLibraryDataDefaultVariables } from '.';

export type ILibraryCollectionsProps = {
	language: Language;
};

function LibraryCollections({
	language,
}: ILibraryCollectionsProps): JSX.Element {
	const { data: playlistsData } = useGetLibraryPlaylistsDataQuery({
		language,
		first: 1500,
		offset: 0,
	});
	const playlistItems = playlistsData?.me?.user.playlists.nodes || [];

	const variables = {
		...getLibraryDataDefaultVariables(language),
		first: 1500,
	};
	const { data: collectionData } = useGetLibraryDataQuery({
		...variables,
		types: [FavoritableCatalogEntityType.Collection],
	});
	const collectionItems = collectionData?.me?.user.favorites.nodes || [];

	const { data: personData } = useGetLibraryDataQuery({
		...variables,
		types: [FavoritableCatalogEntityType.Person],
	});
	const personItems = personData?.me?.user.favorites.nodes || [];

	const { data: sponsorData } = useGetLibraryDataQuery({
		...variables,
		types: [FavoritableCatalogEntityType.Sponsor],
	});
	const sponsorItems = sponsorData?.me?.user.favorites.nodes || [];

	const [showingPlaylistsAlert, setShowingPlaylistsAlert] = useState(true);

	return (
		<div className={baseStyles.wrapper}>
			<LibraryNav currentNavHref="collections" />

			{!playlistItems.length &&
				!collectionItems.length &&
				!personItems.length &&
				!sponsorItems.length && (
					<LibraryError
						title={
							<FormattedMessage
								id="libraryCollections__emptyHeading"
								defaultMessage="You don’t have any collections items saved yet"
							/>
						}
						message={
							<FormattedMessage
								id="libraryCollections__emptyCopy"
								defaultMessage="Bookmark items or listen to audio from the Discover page."
							/>
						}
					/>
				)}

			{playlistItems.length ? (
				<>
					{showingPlaylistsAlert && (
						<InfoBox className={styles.playlistsAlert}>
							<div>
								<FormattedMessage
									id="libraryCollections__playlistsAlert"
									defaultMessage="At the moment, we’re reimagining the playlist experience. You can still manage your playlists using the mobile app."
								/>
							</div>
							<a
								onClick={(e) => {
									e.preventDefault();
									setShowingPlaylistsAlert(false);
								}}
								className={clsx(
									styles.playlistsAlertDismiss,
									'decorated hover--salmon'
								)}
							>
								<FormattedMessage
									id="libraryCollections__dismiss"
									defaultMessage="Dismiss"
								/>
							</a>
						</InfoBox>
					)}
					<LineHeading>
						<FormattedMessage
							id="libraryCollections__playlistsHeading"
							defaultMessage="Playlists"
						/>
					</LineHeading>
					<CardMasonry
						items={playlistItems}
						render={({ data }) => <CardPlaylist playlist={data} />}
					/>
				</>
			) : null}

			{collectionItems.length ? (
				<>
					<LineHeading>
						<FormattedMessage
							id="libraryCollections__collectionsHeading"
							defaultMessage="Collections"
						/>
					</LineHeading>
					<CardMasonry
						items={collectionItems}
						render={({ data }) => <CardFavorite favorite={data} />}
						key={`collectionItems-${collectionItems.length}`}
					/>
				</>
			) : null}

			{personItems.length ? (
				<>
					<LineHeading>
						<FormattedMessage
							id="libraryCollections__personsHeading"
							defaultMessage="Speakers"
						/>
					</LineHeading>
					<CardMasonry
						items={personItems}
						render={({ data }) => <CardFavorite favorite={data} />}
						key={`personItems-${personItems.length}`}
					/>
				</>
			) : null}

			{sponsorItems.length ? (
				<>
					<LineHeading>
						<FormattedMessage
							id="libraryCollections__sponsorsHeading"
							defaultMessage="Sponsors"
						/>
					</LineHeading>
					<CardMasonry
						items={sponsorItems}
						render={({ data }) => <CardFavorite favorite={data} />}
						key={`sponsorItems-${sponsorItems.length}`}
					/>
				</>
			) : null}
		</div>
	);
}

export default withAuthGuard(LibraryCollections, LibraryLoggedOut);
