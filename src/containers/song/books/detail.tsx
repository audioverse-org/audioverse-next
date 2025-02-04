import startCase from 'lodash/startCase';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import Heading6 from '~components/atoms/heading6';
import ButtonShare from '~components/molecules/buttonShare';
import CardSong from '~components/molecules/card/song';
import CardGroup from '~components/molecules/cardGroup';
import ContentWidthLimiter from '~components/molecules/contentWidthLimiter';
import SequenceTypeLockup from '~components/molecules/sequenceTypeLockup';
import Tease from '~components/molecules/tease';
import { BaseColors } from '~lib/constants';
import root from '~lib/routes';
import { useFormattedDuration } from '~lib/time';
import useLanguageRoute from '~lib/useLanguageRoute';
import { SequenceContentType } from '~src/__generated__/graphql';
import AndFailStates from '~src/components/templates/andFailStates';

import { GetSongBooksDetailPageDataQuery } from './__generated__/detail';
import styles from './detail.module.scss';

export type SongBooksDetailProps = {
	book: string;
	musicTracks: NonNullable<
		GetSongBooksDetailPageDataQuery['musicTracks']['nodes']
	>;
};

function SongBooksDetail({
	book,
	musicTracks,
}: SongBooksDetailProps): JSX.Element {
	const languageRoute = useLanguageRoute();
	const shareUrl = `https://www.audioverse.org${root
		.lang(languageRoute)
		.songs.book(book)
		.get()}`;

	return (
		<Tease className={styles.container}>
			<ContentWidthLimiter>
				<SequenceTypeLockup contentType={SequenceContentType.MusicAlbum} />
				<Heading2 sans className={styles.header}>
					{startCase(book)}
				</Heading2>
				<Heading6 sans uppercase loose className={styles.contributors}>
					<FormattedMessage
						id="songsBooksDetail__contributors"
						defaultMessage="Various Contributors"
					/>
				</Heading6>
				<Heading6 sans uppercase loose unpadded className={styles.songCount}>
					<FormattedMessage
						id="songsBooksDetail__numSongs"
						defaultMessage="{count} songs"
						values={{ count: musicTracks.length }}
					/>
				</Heading6>
				<div className={styles.row}>
					<div className={styles.duration}>
						{useFormattedDuration(
							musicTracks.reduce((c, t) => c + t.duration, 0),
						)}
					</div>
					<ButtonShare
						shareUrl={shareUrl}
						backgroundColor={BaseColors.SONG_H}
						light
						triggerClassName={styles.iconButton}
						contentType={SequenceContentType.MusicAlbum}
						id={undefined}
						title={book}
					/>
				</div>
			</ContentWidthLimiter>
			<CardGroup className={styles.cardGroup}>
				{musicTracks.map((musicTrack) => (
					<CardSong
						song={{
							...musicTrack,
							canonicalPath: root
								.lang(languageRoute)
								.songs.book(book)
								.track(musicTrack.canonicalPath)
								.get(),
						}}
						key={musicTrack.canonicalPath}
					/>
				))}
			</CardGroup>
		</Tease>
	);
}

const WithFailStates = (props: Parameters<typeof SongBooksDetail>[0]) => (
	<AndFailStates
		Component={SongBooksDetail}
		componentProps={props}
		options={{ should404: ({ musicTracks }) => !musicTracks.length }}
	/>
);
export default WithFailStates;
