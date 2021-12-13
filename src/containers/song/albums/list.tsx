import clsx from 'clsx';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import CardSequence from '@components/molecules/card/sequence';
import CardSongBook from '@components/molecules/card/songBook';
import CardGroup from '@components/molecules/cardGroup';
import ContentWidthLimiter from '@components/molecules/contentWidthLimiter';
import Mininav from '@components/molecules/mininav';
import { GetSongAlbumsListPageDataQuery } from '@lib/generated/graphql';
import { makeBibleMusicTrackRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './list.module.scss';

export type SongAlbumsListProps = GetSongAlbumsListPageDataQuery;

function SongAlbumList({
	musicAlbums,
	musicBookTags,
}: SongAlbumsListProps): JSX.Element {
	const languageRoute = useLanguageRoute();
	const [currentTab, setCurrentTab] = useState('albums');

	return (
		<>
			<ContentWidthLimiter>
				<Heading1>
					<FormattedMessage
						id="songsListPage__title"
						defaultMessage="Scripture Songs"
					/>
				</Heading1>
				<p className={styles.intro}>
					<FormattedMessage
						id="songsListPage__intro"
						defaultMessage="Listening to to the Word of God in musical form is a great way to commit the passages of scripture to memory. Listen by album or by book of the Bible."
					/>
				</p>
			</ContentWidthLimiter>
			<Mininav
				items={[
					{
						id: 'albums',
						label: (
							<FormattedMessage
								id="songsListPage__tabAlbums"
								defaultMessage="Albums"
							/>
						),
						onClick: (e) => {
							e.preventDefault();
							setCurrentTab('albums');
						},
						isActive: currentTab === 'albums',
					},
					{
						id: 'passage',
						label: (
							<FormattedMessage
								id="songsListPage__tabPassage"
								defaultMessage="Passage"
							/>
						),
						onClick: (e) => {
							e.preventDefault();
							setCurrentTab('books');
						},
						isActive: currentTab === 'books',
					},
				]}
			/>
			<CardGroup className={clsx(currentTab !== 'albums' && styles.hidden)}>
				{musicAlbums?.nodes?.map((n) => (
					<CardSequence
						sequence={n}
						recordings={n.recordings?.nodes}
						key={n.canonicalPath}
					/>
				))}
			</CardGroup>
			<CardGroup className={clsx(currentTab !== 'books' && styles.hidden)}>
				{musicBookTags?.nodes?.map((n) => (
					<CardSongBook
						book={n.name}
						recordings={n.recordings.nodes?.map((r) => ({
							...r,
							canonicalPath: makeBibleMusicTrackRoute(
								languageRoute,
								n.name,
								r.canonicalPath
							),
						}))}
						recordingCount={n.recordings.aggregate?.count}
						key={n.id}
					/>
				))}
			</CardGroup>
		</>
	);
}

export default SongAlbumList;
