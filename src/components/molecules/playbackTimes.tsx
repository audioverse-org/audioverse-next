import React from 'react';

import { useFormattedTime } from '@lib/time';
import usePlaybackSession from '@lib/usePlaybackSession';

import styles from './playbackTimes.module.scss';
import { PlayerFragment } from './__generated__/player';

export default function PlaybackTimes({
	recording,
}: {
	recording: PlayerFragment;
}): JSX.Element {
	const session = usePlaybackSession(recording);
	return (
		<div className={styles.base}>
			<span>{useFormattedTime(session.time)}</span>
			<span>{useFormattedTime(session.duration)}</span>
		</div>
	);
}
