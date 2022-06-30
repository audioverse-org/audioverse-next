import clsx from 'clsx';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import InfoBox from '@components/atoms/infoBox';
import withAuthGuard from '@components/HOCs/withAuthGuard';
import CardPlaylist from '@components/molecules/card/playlist';
import CardMasonry from '@components/molecules/cardMasonry';
import LoadingCards from '@components/molecules/loadingCards';
import LibraryError from '@components/organisms/libraryError';
import LibraryNav from '@components/organisms/libraryNav';
import { Language } from '@src/__generated__/graphql';

import baseStyles from '../base.module.scss';
import LibraryLoggedOut from '../loggedOut';

import styles from './list.module.scss';
import { useGetLibraryPlaylistsDataQuery } from '@containers/library/playlist/__generated__/list';

export type ILibraryPlaylistsProps = {
	language: Language;
};

function LibraryPlaylists({ language }: ILibraryPlaylistsProps): JSX.Element {
	const { data, isLoading } = useGetLibraryPlaylistsDataQuery({
		language,
		first: 1500,
		offset: 0,
	});
	const playlistItems = data?.me?.user.playlists.nodes || [];

	const [showingPlaylistsAlert, setShowingPlaylistsAlert] = useState(true);

	return (
		<div className={baseStyles.wrapper}>
			<LibraryNav currentNavHref="playlists" disableFiltersAndSorts />

			{isLoading ? (
				<LoadingCards />
			) : playlistItems.length ? (
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
					<CardMasonry
						items={playlistItems}
						render={({ data }) => <CardPlaylist playlist={data} />}
					/>
				</>
			) : (
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
		</div>
	);
}

export default withAuthGuard(LibraryPlaylists, LibraryLoggedOut);
