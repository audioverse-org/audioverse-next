import React from 'react';

import { Sequence } from '~components/organisms/sequence';
import AndFailStates from '~src/components/templates/andFailStates';

import { GetSongAlbumsDetailPageDataQuery } from './__generated__/detail';

export interface SongAlbumDetailProps {
	sequence: GetSongAlbumsDetailPageDataQuery['musicAlbum'];
}

const WithFailStates = (props: SongAlbumDetailProps) => (
	<AndFailStates
		Component={Sequence}
		componentProps={props}
		options={{ should404: ({ sequence }) => !sequence }}
	/>
);
export default WithFailStates;
