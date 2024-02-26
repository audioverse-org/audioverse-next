import React from 'react';
import { FormattedMessage } from 'react-intl';

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

	return (
		<div className={baseStyles.wrapper}>
			<LibraryNav currentNavHref="playlists" disableFiltersAndSorts />

			{isLoading ? (
				<LoadingCards />
			) : playlistItems.length ? (
				<CardMasonry
					items={playlistItems}
					render={({ data }) => <CardPlaylist playlist={data} />}
				/>
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
