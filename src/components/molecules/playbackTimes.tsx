import React from 'react';

import { useFormattedTime } from '~lib/time';
import usePlaybackSession from '~lib/media/usePlaybackSession';

import { PlayerFragment } from './__generated__/player';
import styles from './playbackTimes.module.scss';

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
