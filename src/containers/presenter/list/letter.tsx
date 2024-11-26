import React from 'react';

import AndFailStates from '~src/components/templates/andFailStates';

import Presenters, { PresentersProps } from './list';

export type { PresentersProps } from './list';

function Letter(props: PresentersProps) {
	return <Presenters {...props} />;
}

const WithFailStates = (props: Parameters<typeof Letter>[0]) => (
	<AndFailStates
		Component={Letter}
		componentProps={props}
		options={{ should404: ({ persons }) => !persons?.length }}
	/>
);
export default WithFailStates;
