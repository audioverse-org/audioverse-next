import React from 'react';

import Playlist from '@components/organisms/playlist';
import { Recording } from '@components/organisms/recording';
import { SongFragment } from '@lib/generated/graphql';

export interface SongProps {
	songs: SongFragment[];
}

function Song({ songs }: SongProps): JSX.Element {
	return (
		<Playlist recordings={songs}>
			{(song) => <Recording recording={song} />}
		</Playlist>
	);
}

export default Song;
