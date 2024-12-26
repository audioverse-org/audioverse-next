import React from 'react';

import { Recording } from '~components/organisms/recording';
import AndFailStates from '~src/components/templates/andFailStates';

import { GetStoryDetailDataQuery } from './__generated__/detail';

export interface StoryDetailProps {
	recording: GetStoryDetailDataQuery['story'];
}

const WithFailStates = (props: StoryDetailProps) => (
	<AndFailStates
		Component={Recording}
		componentProps={props}
		options={{ should404: (props) => !props.recording }}
	/>
);
export default WithFailStates;
