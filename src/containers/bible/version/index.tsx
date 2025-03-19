import React from 'react';
import { FormattedMessage } from 'react-intl';

import Tease from '~src/components/molecules/tease';
import PassageNavigation from '~src/components/organisms/passageNavigation';
import AndFailStates from '~src/components/templates/andFailStates';

import { useVersion } from './useVersion';
import { useVersions } from './useVersions';

export interface VersionProps {
	versionId: string;
}

function BibleVersion({ versionId }: VersionProps): JSX.Element {
	const version = useVersion(versionId);
	const versions = useVersions();

	if (!version.data || !versions.data) {
		return (
			<div>
				<FormattedMessage
					id="container-version__loading"
					defaultMessage="Loading..."
				/>
			</div>
		);
	}

	return (
		<Tease>
			<PassageNavigation version={version.data} versions={versions.data} />
		</Tease>
	);
}

const WithFailStates = (props: VersionProps) => (
	<AndFailStates Component={BibleVersion} componentProps={props} />
);

export default WithFailStates;
