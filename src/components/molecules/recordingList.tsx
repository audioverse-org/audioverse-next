import React from 'react';

import RecordingListEntry from '@components/molecules/recordingListEntry';

import styles from './recordingList.module.scss';

interface RecordingListProps {
	sermons: Sermon[];
}

export default function RecordingList({
	sermons,
}: RecordingListProps): JSX.Element {
	return (
		<table className={styles.table}>
			{sermons.map((s) => (
				<RecordingListEntry key={s.id} sermon={s} />
			))}
		</table>
	);
}
