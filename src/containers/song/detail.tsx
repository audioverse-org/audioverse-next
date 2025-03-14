import React from 'react';

import { Recording } from '~components/organisms/recording';
import AndFailStates from '~src/components/templates/andFailStates';

import { GetSongDetailDataQuery } from './__generated__/detail';

type SongTrack = NonNullable<GetSongDetailDataQuery['musicTrack']>;

export interface SongDetailProps {
	recording: SongTrack | null | undefined;
}

const WithFailStates = (props: SongDetailProps) => (
	<AndFailStates
		Component={Recording}
		componentProps={props}
		options={{ should404: (props) => !props.recording }}
	/>
);
export default WithFailStates;
