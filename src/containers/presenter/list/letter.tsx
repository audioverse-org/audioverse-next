import React from 'react';

import withFailStates from '~components/HOCs/withFailStates';

import Presenters, { PresentersProps } from './list';

export type { PresentersProps } from './list';

function Letter(props: PresentersProps) {
	return (
		<Presenters
			{...props}
			title={props.persons[0].surname.substring(0, 1).toUpperCase()}
		/>
	);
}

export default withFailStates(Letter, {
	useShould404: ({ persons }) => !persons?.length,
});
