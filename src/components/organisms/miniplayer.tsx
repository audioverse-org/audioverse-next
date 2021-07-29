import Slider from '@material-ui/core/Slider';
import React, { useContext } from 'react';

import ProgressBar from '@components/atoms/progressBar';
import ButtonNudge from '@components/molecules/buttonNudge';
import ButtonPlay from '@components/molecules/buttonPlay';
import { PlaybackContext } from '@components/templates/andMiniplayer';
import { useFormattedTime } from '@lib/time';

import ListIcon from '../../../public/img/icon-list-alt-solid.svg';
import IconVolumeHigh from '../../../public/img/icon-volume-high.svg';
import IconVolumeLow from '../../../public/img/icon-volume-low.svg';

import styles from './miniplayer.module.scss';

export default function Miniplayer(): JSX.Element | null {
	const playback = useContext(PlaybackContext);
	const volume = playback.getVolume();
	const recording = playback.getRecording();
	const isShowingVideo = playback.getVideoLocation() === 'miniplayer';
	const timeString = useFormattedTime(playback.getTime());
	const durationString = useFormattedTime(playback.getDuration());

	// TODO: Move this guard into andMiniplayer
	if (!recording) return null;

	return (
		<div className={styles.miniplayer} aria-label={'miniplayer'}>
			<div className={styles.player}>
				{/*TODO: Get rid of ID; use ref instead*/}
				<div id="mini-player" className={styles.pane} />
				<div
					className={`${styles.controls} ${isShowingVideo && styles.hidden}`}
				>
					<ButtonNudge recording={recording} reverse={true} />
					<ButtonPlay recording={recording} />
					<ButtonNudge recording={recording} />
				</div>
			</div>
			<div className={styles.meta}>
				{recording.sequence && (
					<div className={styles.series} aria-label={'series'}>
						<ListIcon width={13} height={13} />
						{recording.sequence.title}
					</div>
				)}
				<h4 className={styles.title}>{recording.title}</h4>
				<div className={styles.progress}>
					<span>{timeString}</span>
					<span className={styles.bar}>
						<ProgressBar recording={recording} />
					</span>
					<span>{durationString}</span>
				</div>
			</div>
			<div className={styles.volume}>
				<button
					aria-label={'reduce volume'}
					onClick={() => playback.setVolume(volume - 10)}
				>
					<IconVolumeLow />
				</button>
				{/*TODO: Localize*/}
				<Slider
					value={volume}
					onChange={(e, val) => playback.setVolume(val as number)}
					aria-label={'volume'}
				/>
				<button
					aria-label={'increase volume'}
					onClick={() => playback.setVolume(volume + 10)}
				>
					<IconVolumeHigh />
				</button>
			</div>
		</div>
	);
}
