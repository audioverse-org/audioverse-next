import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import withAuthGuard from '~components/HOCs/withAuthGuard';
import CardPlaylist from '~components/molecules/card/playlist';
import CardMasonry from '~components/molecules/cardMasonry';
import EmptyState from '~components/organisms/emptyState';
import LibraryNav from '~components/organisms/libraryNav';
import { Language } from '~src/__generated__/graphql';
import Loader from '~src/components/atoms/Loader';

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

	const [playlistData, setPlaylistData] = useState(
		data?.me?.user.playlists.nodes || []
	);
	const [isScrollable, setIsScrollable] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setPlaylistData([...(data?.me?.user.playlists.nodes || [])]);
	}, [data?.me?.user.playlists.nodes]);

	useEffect(() => {
		if (containerRef.current) {
			const isScrollable =
				containerRef.current.scrollHeight > containerRef.current.clientHeight;
			setIsScrollable(isScrollable);
		}
	}, [playlistData]);

	return (
		<div className={baseStyles.wrapper}>
			<LibraryNav currentNavHref="playlists" disableFiltersAndSorts />

			{isLoading ? (
				<Loader />
			) : playlistData.length ? (
				<div ref={containerRef} className={baseStyles.scrollContainer}>
					<CardMasonry
						key={playlistData.length}
						items={playlistData}
						render={({ data }) => <CardPlaylist playlist={data} />}
					/>
					{isScrollable && (
						<>
							<div className={baseStyles.gradientOverlay}></div>
							<div className={baseStyles.scrollIndicator}>
								<FormattedMessage
									id="scroll-down"
									defaultMessage="Scroll down for more"
								/>
							</div>
						</>
					)}
				</div>
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
