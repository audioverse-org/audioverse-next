import React from 'react';

import type { PlayerFragment } from '@lib/generated/graphql';
import hasVideo from '@lib/hasVideo';
import usePlaybackSession from '@lib/usePlaybackSession';

import styles from './mediaFormatSwitcher.module.scss';

export default function MediaFormatSwitcher({
	recording,
}: {
	recording: PlayerFragment;
}): JSX.Element | null {
	const session = usePlaybackSession(recording);

	if (!hasVideo(recording)) return null;

	return (
		<div className={styles.container}>
			<button
				className={styles.button}
				onClick={() => session.setPrefersAudio(true)}
				aria-pressed={session.prefersAudio}
			>
				Audio
			</button>
			<button
				className={styles.button}
				onClick={() => session.setPrefersAudio(false)}
				aria-pressed={!session.prefersAudio}
			>
				Video
			</button>
		</div>
	);
}
