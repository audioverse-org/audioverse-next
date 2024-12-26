import React from 'react';

import Tease from '~src/components/molecules/tease';
import PassageNavigation, {
	Version,
} from '~src/components/organisms/passageNavigation';
import AndFailStates from '~src/components/templates/andFailStates';

export interface BibleIndexProps {
	data: Array<Version>;
}

function Bible({ data }: BibleIndexProps): JSX.Element {
	return (
		<Tease>
			<PassageNavigation versions={data} />
		</Tease>
	);
}

const WithFailStates = (props: BibleIndexProps) => (
	<AndFailStates
		Component={Bible}
		componentProps={props}
		options={{ should404: ({ data }) => !data.length }}
	/>
);

export default WithFailStates;
