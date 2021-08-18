import React from 'react';
import { FormattedMessage } from 'react-intl';

import ProgressBar from '@components/atoms/progressBar';
import ButtonFavorite from '@components/molecules/buttonFavorite';
import ButtonPlay from '@components/molecules/buttonPlay';
import { TeaseRecordingFragment } from '@lib/generated/graphql';
import { useFormattedDuration } from '@lib/time';
import usePlaybackSession from '@lib/usePlaybackSession';

import styles from './teaseRecording.module.scss';

export default function TeaseRecording({
	recording,
}: {
	recording: TeaseRecordingFragment;
}): JSX.Element {
	const session = usePlaybackSession(recording);
	const index = recording.sequenceIndex;
	const count = recording.sequence?.recordings.aggregate?.count;
	return (
		<div className={styles.base}>
			<div className={styles.part}>
				<FormattedMessage
					id={'molecule-teaseRecording__partInfo'}
					defaultMessage={'Part {index} of {count}'}
					description={'recording tease part info'}
					values={{ index, count }}
				/>
			</div>
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
				<span>
					<ButtonFavorite id={recording.id} />
				</span>
			</div>
		</div>
	);
}
