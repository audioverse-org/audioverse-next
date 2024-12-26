import React from 'react';

import AndFailStates from '~src/components/templates/andFailStates';

import Sponsors, { SponsorsProps } from './list';

export type { SponsorsProps } from './list';

function LetterSponsors(props: SponsorsProps) {
	return (
		<Sponsors
			{...props}
			title={props.sponsors[0].title.substring(0, 1).toUpperCase()}
		/>
	);
}

const WithFailStates = (props: Parameters<typeof LetterSponsors>[0]) => (
	<AndFailStates
		Component={LetterSponsors}
		componentProps={props}
		options={{ should404: ({ sponsors }) => !sponsors?.length }}
	/>
);
export default WithFailStates;
