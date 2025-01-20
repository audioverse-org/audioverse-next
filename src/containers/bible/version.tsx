import React from 'react';

import Tease from '~src/components/molecules/tease';
import PassageNavigation, {
	Version,
	VersionFull,
} from '~src/components/organisms/passageNavigation';
import AndFailStates from '~src/components/templates/andFailStates';

export interface VersionProps {
	version: VersionFull;
	versions: Array<Version>;
}

function BibleVersion({ version, versions }: VersionProps): JSX.Element {
	return (
		<Tease>
			<PassageNavigation version={version} versions={versions} />
		</Tease>
	);
}

const WithFailStates = (props: VersionProps) => (
	<AndFailStates
		Component={BibleVersion}
		componentProps={props}
		options={{ should404: ({ versions }) => !versions.length }}
	/>
);

export default WithFailStates;
