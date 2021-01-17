import React from 'react';

import RecordingListEntry from '@components/molecules/recordingListEntry';
import { RecordingListFragment } from '@lib/generated/graphql';

import styles from './recordingList.module.scss';

interface RecordingListProps {
	sermons: RecordingListFragment[];
}

export default function RecordingList({
	sermons,
}: RecordingListProps): JSX.Element {
	return (
		<table className={styles.list}>
			<tbody>
				{sermons &&
					sermons.map((s, i) => <RecordingListEntry key={i} sermon={s} />)}
			</tbody>
		</table>
	);
}
