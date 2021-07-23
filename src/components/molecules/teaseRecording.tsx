import React from 'react';

import ButtonPlay from '@components/molecules/buttonPlay';
import { TeaseRecordingFragment } from '@lib/generated/graphql';

import styles from './teaseRecording.module.scss';
import ProgressBar from '@components/atoms/progressBar';

export default function TeaseRecording({
	recording,
}: {
	recording: TeaseRecordingFragment;
}): JSX.Element {
	return (
		<div className={styles.base}>
			<h4 className={styles.title}>{recording.title}</h4>
			<ButtonPlay recording={recording} />
			<ProgressBar recording={recording} interactive={false} />
		</div>
	);
}
