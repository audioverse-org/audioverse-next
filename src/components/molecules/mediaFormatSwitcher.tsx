import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import hasVideo from '~lib/media/hasVideo';
import useOnRecordingLoad from '~src/lib/media/useOnRecordingLoad';
import usePrefersAudio from '~src/lib/media/usePrefersAudio';

import { PlayerFragment } from './__generated__/player';
import styles from './mediaFormatSwitcher.module.scss';

export default function MediaFormatSwitcher({
	recording,
}: {
	recording: PlayerFragment;
}): JSX.Element | null {
	const { prefersAudio, setPrefersAudio } = usePrefersAudio();
	const onLoad = useOnRecordingLoad();

	const setPref = useCallback(
		(pref: boolean) => {
			onLoad({
				recording,
				prefersAudio: pref,
				fn: () => setPrefersAudio(pref),
			});
		},
		[onLoad, recording, setPrefersAudio]
	);

	if (!hasVideo(recording)) return null;

	return (
		<div className={styles.container}>
			<button
				className={styles.button}
				onClick={() => setPref(true)}
				aria-pressed={prefersAudio}
			>
				<FormattedMessage
					id="mediaFormatSwitcher__audio"
					defaultMessage="Audio"
				/>
			</button>
			<button
				className={styles.button}
				onClick={() => setPref(false)}
				aria-pressed={!prefersAudio}
			>
				<FormattedMessage
					id="mediaFormatSwitcher__video"
					defaultMessage="Video"
				/>
			</button>
		</div>
	);
}
