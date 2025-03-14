import React from 'react';

import { useFormattedTime } from '~lib/time';
import usePlaybackSession from '~src/lib/hooks/usePlaybackSession';

import styles from './playbackTimes.module.scss';
import { PlayerFragment } from './player/__generated__';

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
