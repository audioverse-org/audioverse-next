import React from 'react';

import { Recording } from '~components/organisms/recording';
import AndFailStates from '~src/components/templates/andFailStates';

import { GetSermonDetailDataQuery } from './__generated__/detail';

export interface SermonDetailProps {
	recording: GetSermonDetailDataQuery['sermon'];
}

const WithFailStates = (props: SermonDetailProps) => (
	<AndFailStates
		Component={Recording}
		componentProps={props}
		options={{ should404: (props) => !props.recording }}
	/>
);
export default WithFailStates;
