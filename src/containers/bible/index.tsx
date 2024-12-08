import React from 'react';
import withFailStates from '~src/components/HOCs/withFailStates';
import Tease from '~src/components/molecules/tease';
import PassageNavigation, {
	Version,
} from '~src/components/organisms/passageNavigation';

export type BibleIndexProps = {
	data: Array<Version>;
};

function Bible({ data }: BibleIndexProps): JSX.Element {
	return (
		<Tease>
			<PassageNavigation versions={data} />
		</Tease>
	);
}

export default withFailStates(Bible, {
	useShould404: ({ data }) => !data.length,
});
