import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import Playlist from '@components/organisms/playlist';
import { Recording } from '@components/organisms/recording';
import { SongFragment } from '@lib/generated/graphql';

export interface SongDetailProps {
	songs: SongFragment[];
}

function SongDetail({ songs }: SongDetailProps): JSX.Element {
	return (
		<Playlist recordings={songs}>
			{(song) => <Recording recording={song} />}
		</Playlist>
	);
}

export default withFailStates(SongDetail, ({ songs }) => !songs.length);
