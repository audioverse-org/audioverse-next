import React from 'react';

import RecordingListEntry from '@components/molecules/recordingListEntry';
import { RecordingListFragment } from '@lib/generated/graphql';

import styles from './recordingList.module.scss';

interface RecordingListProps {
	recordings: RecordingListFragment[];
}

export default function RecordingList({
	recordings,
}: RecordingListProps): JSX.Element {
	return (
		<table className={styles.list}>
			<tbody>
				{recordings?.map((rec) => (
					<RecordingListEntry key={rec.id} recording={rec} />
				))}
			</tbody>
		</table>
	);
}
