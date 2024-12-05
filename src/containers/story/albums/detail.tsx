import React from 'react';

import { Sequence } from '~components/organisms/sequence';
import AndFailStates from '~src/components/templates/andFailStates';

import { GetStoryAlbumDetailPageDataQuery } from './__generated__/detail';

export interface StoryAlbumDetailProps {
	sequence: GetStoryAlbumDetailPageDataQuery['storySeason'];
}

const WithFailStates = (props: StoryAlbumDetailProps) => (
	<AndFailStates
		Component={Sequence}
		componentProps={props}
		options={{
			should404: (props) => !props.sequence,
		}}
	/>
);

export default WithFailStates;
