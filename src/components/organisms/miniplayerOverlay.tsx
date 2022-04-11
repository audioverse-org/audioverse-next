import Slider from '@material-ui/core/Slider';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useIntl } from 'react-intl';

import ButtonNudge from '@components/molecules/buttonNudge';
import ButtonPlay from '@components/molecules/buttonPlay';
import RecordingProgressBar from '@components/molecules/recordingProgressBar';
import { PlaybackContext } from '@components/templates/andPlaybackContext';
import { BaseColors } from '@lib/constants';
import { SequenceContentType } from '@lib/generated/graphql';
import { getSequenceTypeTheme } from '@lib/getSequenceType';
import { useFormattedTime } from '@lib/time';

import IconVolumeHigh from '../../../public/img/icon-volume-high.svg';
import IconVolumeLow from '../../../public/img/icon-volume-low.svg';

import 'video.js/dist/video-js.css';
import styles from './miniplayerOverlay.module.scss';

export default function MiniplayerOverlay(): JSX.Element | null {
	const intl = useIntl();
	const playbackContext = useContext(PlaybackContext);
	const volume = playbackContext.getVolume();
	const recording = playbackContext.getRecording();
	const isShowingVideo = playbackContext.getVideoLocation() === 'miniplayer';
	const timeString = useFormattedTime(playbackContext.getTime());
	const durationString = useFormattedTime(playbackContext.getDuration());

	if (!recording) return null;

	let sequenceLine = null;
	if (recording.sequence) {
		const { Icon } = getSequenceTypeTheme(recording.sequence.contentType);
		sequenceLine = (
			<div className={styles.series} aria-label="series">
				<Icon width={13} height={13} />
				{recording.sequence.contentType === SequenceContentType.BibleBook
					? recording.collection?.title
					: recording.sequence.title}
			</div>
		);
	}

	return (
		<div>
			<div className={styles.miniplayer} aria-label="miniplayerOverlay">
				<div className={styles.player}>
					{/*TODO: Get rid of ID; use ref instead*/}
					<div id="mini-player" className={styles.pane} />
					<div
						className={clsx(styles.controls, isShowingVideo && styles.hidden)}
					>
						<ButtonNudge
							recording={recording}
							reverse={true}
							backgroundColor={BaseColors.WHITE}
							large
							dark
						/>
						<ButtonPlay
							recording={recording}
							backgroundColor={BaseColors.WHITE}
						/>
						<ButtonNudge
							recording={recording}
							backgroundColor={BaseColors.WHITE}
							large
							dark
						/>
					</div>
				</div>
				<div className={styles.meta}>
					<Link href={recording.canonicalPath}>
						<a className={styles.link}>
							{sequenceLine}
							<h4 className={styles.title}>{recording.title}</h4>
						</a>
					</Link>
					<div className={styles.progress}>
						<span>{timeString}</span>
						<span className={styles.bar}>
							<RecordingProgressBar recording={recording} />
						</span>
						<span>{durationString}</span>
					</div>
				</div>
				<div className={styles.volume}>
					<button
						aria-label={intl.formatMessage({
							id: 'miniplayerOverlay__reduceVolume',
							defaultMessage: 'Reduce volume',
						})}
						onClick={() => playbackContext.setVolume(volume - 10)}
					>
						<IconVolumeLow />
					</button>
					<Slider
						className={styles.slider}
						value={volume}
						onChange={(e, val) => playbackContext.setVolume(val as number)}
						aria-label={intl.formatMessage({
							id: 'miniplayerOverlay__volume',
							defaultMessage: 'Volume',
						})}
					/>
					<button
						aria-label={intl.formatMessage({
							id: 'miniplayerOverlay__increaseVolume',
							defaultMessage: 'Increase volume',
						})}
						onClick={() => playbackContext.setVolume(volume + 10)}
					>
						<IconVolumeHigh />
					</button>
				</div>
			</div>
		</div>
	);
}
