import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import CardSong from '@components/molecules/card/song';
import CardGroup from '@components/molecules/cardGroup';
import { GetSongBooksDetailPageDataQuery } from '@lib/generated/graphql';

export type SongBooksDetailProps = {
	musicTracks: NonNullable<
		GetSongBooksDetailPageDataQuery['musicTracks']['nodes']
	>;
};

function SongBooksDetail({ musicTracks }: SongBooksDetailProps): JSX.Element {
	return (
		<>
			<CardGroup>
				{musicTracks.map((musicTrack) => (
					<CardSong song={musicTrack} key={musicTrack.canonicalPath} />
				))}
			</CardGroup>
		</>
	);
}

export default withFailStates(
	SongBooksDetail,
	({ musicTracks }) => !musicTracks.length
);
