import React from 'react';

import { Sequence } from '~components/organisms/sequence';
import AndFailStates from '~src/components/templates/andFailStates';

import { GetSeriesDetailPageDataQuery } from './__generated__/detail';

export interface SeriesDetailProps {
	sequence: GetSeriesDetailPageDataQuery['series'];
}

const WithFailStates = (props: SeriesDetailProps) => (
	<AndFailStates
		Component={Sequence}
		componentProps={props}
		options={{ should404: ({ sequence }) => !sequence }}
	/>
);
export default WithFailStates;
