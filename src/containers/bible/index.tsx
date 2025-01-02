import React from 'react';

import Tease from '~src/components/molecules/tease';
import PassageNavigation, {
	Version,
} from '~src/components/organisms/passageNavigation';
import AndFailStates from '~src/components/templates/andFailStates';

export interface BibleIndexProps {
	versions: Array<Version>;
}

function Bible({ versions }: BibleIndexProps): JSX.Element {
	return (
		<Tease>
			<PassageNavigation versions={versions} />
		</Tease>
	);
}

const WithFailStates = (props: BibleIndexProps) => (
	<AndFailStates
		Component={Bible}
		componentProps={props}
		options={{ should404: ({ versions }) => !versions.length }}
	/>
);

export default WithFailStates;
