import React from 'react';
import { FormattedMessage } from 'react-intl';

import hasVideo from '~lib/hasVideo';
import usePlaybackSession from '~src/lib/hooks/usePlaybackSession';

import styles from './mediaFormatSwitcher.module.scss';
import { PlayerFragment } from './player/__generated__';

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
				<FormattedMessage
					id="mediaFormatSwitcher__audio"
					defaultMessage="Audio"
				/>
			</button>
			<button
				className={styles.button}
				onClick={() => session.setPrefersAudio(false)}
				aria-pressed={!session.prefersAudio}
			>
				<FormattedMessage
					id="mediaFormatSwitcher__video"
					defaultMessage="Video"
				/>
			</button>
		</div>
	);
}
