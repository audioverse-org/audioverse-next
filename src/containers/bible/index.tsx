import React from 'react';

import withFailStates from '~src/components/HOCs/withFailStates';

import Tease from '~src/components/molecules/tease';
import PassageNavigation from '~src/components/organisms/passageNavigation';

import { useLocalStorage } from '~src/lib/hooks/useLocalStorage';

import { GetAudiobibleIndexDataQuery } from './__generated__';
import styles from './index.module.scss';
import BibleHat from './hat';

type Version = NonNullable<
	GetAudiobibleIndexDataQuery['collections']['nodes']
>[0];

export type BibleIndexProps = {
	data: Array<Version>;
};

function Bible({ data }: BibleIndexProps): JSX.Element {
	const [selected, setSelected] = useLocalStorage<Version>(
		'bibleVersion',
		data[0],
	);

	return (
		<Tease className={styles.base}>
			<BibleHat selected={selected} onSelect={setSelected} versions={data} />

			<div className={styles.content}>
				<PassageNavigation books={selected.sequences.nodes || []} />
			</div>
		</Tease>
	);
}

export default withFailStates(Bible, {
	useShould404: ({ data }) => !data.length,
});
