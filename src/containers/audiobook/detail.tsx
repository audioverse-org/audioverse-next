import React from 'react';

import { Sequence } from '~components/organisms/sequence';
import AndFailStates from '~src/components/templates/andFailStates';

import { GetAudiobookDetailPageDataQuery } from './__generated__/detail';

export interface AudiobookDetailProps {
	sequence: GetAudiobookDetailPageDataQuery['audiobook'];
}

const WithFailStates = (props: AudiobookDetailProps) => (
	<AndFailStates
		Component={Sequence}
		componentProps={props}
		options={{ should404: (props) => !props.sequence }}
	/>
);
export default WithFailStates;
