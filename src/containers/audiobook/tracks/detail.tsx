import React from 'react';

import { Recording } from '~components/organisms/recording';
import AndFailStates from '~src/components/templates/andFailStates';

import { GetAudiobookTrackDetailDataQuery } from './__generated__/detail';

export interface AudiobookTrackDetailProps {
	recording: GetAudiobookTrackDetailDataQuery['audiobookTrack'];
}

const WithFailStates = (props: AudiobookTrackDetailProps) => (
	<AndFailStates
		Component={Recording}
		componentProps={props}
		options={{ should404: (props) => !props.recording }}
	/>
);
export default WithFailStates;
