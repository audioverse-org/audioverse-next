import withFailStates from '@components/HOCs/withFailStates';
import Sponsors, { SponsorsProps } from './list';
import React from 'react';

export type { SponsorsProps } from './list';

function LetterSponsors(props: SponsorsProps) {
	return (
		<Sponsors
			{...props}
			title={props.sponsors[0].title.substring(0, 1).toUpperCase()}
		/>
	);
}

export default withFailStates(LetterSponsors, {
	useShould404: ({ sponsors }) => !sponsors?.length,
});
