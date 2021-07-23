import React from 'react';

import ProgressBar from '@components/atoms/progressBar';
import ButtonPlay from '@components/molecules/buttonPlay';
import { TeaseRecordingFragment } from '@lib/generated/graphql';

import styles from './teaseRecording.module.scss';
import usePlaybackSession from '@lib/usePlaybackSession';
import { useFormattedDuration } from '@lib/time';

export default function TeaseRecording({
	recording,
}: {
	recording: TeaseRecordingFragment;
}): JSX.Element {
	const session = usePlaybackSession(recording);
	return (
		<div className={styles.base}>
			<div className={styles.title}>
				<h4>{recording.title}</h4>
				<ButtonPlay recording={recording} />
			</div>
			<div className={styles.progressLockup}>
				<span className={styles.duration}>
					{useFormattedDuration(session.duration)}
				</span>
				<span className={styles.progress}>
					<ProgressBar recording={recording} interactive={false} />
				</span>
			</div>
		</div>
	);
}
