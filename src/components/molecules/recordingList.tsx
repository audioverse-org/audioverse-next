import React from 'react';

import RecordingListEntry from '@components/molecules/recordingListEntry';
import { RecordingListFragment } from '@lib/generated/graphql';
import { makeSermonRoute } from '@lib/routes';

import styles from './recordingList.module.scss';

interface RecordingListProps {
	recordings: RecordingListFragment[];
	route?: (languageRoute: string, entityId: string) => string;
}

export default function RecordingList({
	recordings,
	route = makeSermonRoute,
}: RecordingListProps): JSX.Element {
	return (
		<table className={styles.list}>
			<tbody>
				{recordings?.map((rec) => (
					<RecordingListEntry key={rec.id} recording={rec} route={route} />
				))}
			</tbody>
		</table>
	);
}
