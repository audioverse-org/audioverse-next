import React from 'react';

import withFailStates from '~components/HOCs/withFailStates';

import Presenters, { PresentersProps } from './list';

export type { PresentersProps } from './list';

function Letter(props: PresentersProps) {
	return <Presenters {...props} />;
}

export default withFailStates(Letter, {
	useShould404: ({ persons }) => !persons?.length,
});
