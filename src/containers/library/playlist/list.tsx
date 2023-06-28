import clsx from 'clsx';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import InfoBox from '~components/atoms/infoBox';
import withAuthGuard from '~components/HOCs/withAuthGuard';
import CardPlaylist from '~components/molecules/card/playlist';
import CardMasonry from '~components/molecules/cardMasonry';
import LoadingCards from '~components/molecules/loadingCards';
import EmptyState from '~components/organisms/emptyState';
import LibraryNav from '~components/organisms/libraryNav';
import { Language } from '~src/__generated__/graphql';

import baseStyles from '../base.module.scss';
import LibraryLoggedOut from '../loggedOut';
import { useGetLibraryPlaylistsDataQuery } from './__generated__/list';
import styles from './list.module.scss';

export type ILibraryPlaylistsProps = {
	language: Language;
} & React.JSX.IntrinsicAttributes;

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
				<EmptyState
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
