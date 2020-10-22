import { useMachine } from '@xstate/react';
import React from 'react';

import RecordingListEntry from '@components/molecules/recordingListEntry';

import machine from './recordingList.machine';
import styles from './recordingList.module.scss';

interface RecordingListProps {
	sermons: Sermon[];
}

export default function RecordingList({
	sermons,
}: RecordingListProps): JSX.Element {
	const [state, send] = useMachine(machine);

	return (
		<>
			<div>
				<label>
					<input
						type={'radio'}
						name={'type'}
						checked={state.value === 'all'}
						onChange={() => send('ALL')}
					/>
					All
				</label>
				<label>
					<input
						type={'radio'}
						name={'type'}
						checked={state.value === 'video'}
						onChange={() => send('VIDEO')}
					/>
					Video
				</label>
				<label>
					<input
						type={'radio'}
						name={'type'}
						checked={state.value === 'audio'}
						onChange={() => send('AUDIO')}
					/>
					Audio
				</label>
			</div>
			<table className={styles.list}>
				<tbody>
					{sermons.map((s) => (
						<RecordingListEntry key={s.id} sermon={s} />
					))}
				</tbody>
			</table>
		</>
	);
}
