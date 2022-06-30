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

import IconVolumeHigh from '../../../public/img/icons/icon-volume-high.svg';
import IconVolumeLow from '../../../public/img/icons/icon-volume-low.svg';

import 'video.js/dist/video-js.css';
import styles from './miniplayer.module.scss';

export default function Miniplayer({
	overlay,
}: {
	overlay?: boolean;
}): JSX.Element | null {
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
			<div
				className={styles.series}
				aria-label={intl.formatMessage({
					id: 'miniplayer__series',
					defaultMessage: 'Series',
				})}
			>
				<Icon width={13} height={13} />
				{recording.sequence.contentType === SequenceContentType.BibleBook
					? recording.collection?.title
					: recording.sequence.title}
			</div>
		);
	}

	return (
		<div
			className={clsx(styles.miniplayer, overlay && styles.overlay)}
			aria-label={intl.formatMessage({
				id: 'miniplayer__label',
				defaultMessage: 'miniplayer',
			})}
		>
			<div className={styles.player}>
				{/*TODO: Get rid of ID; use ref instead*/}
				<div id="mini-player" className={styles.pane} />
				<div
					className={clsx(
						styles.controls,
						overlay && styles.overlay,
						isShowingVideo && styles.hidden
					)}
				>
					<ButtonNudge
						recording={recording}
						reverse={true}
						backgroundColor={overlay ? BaseColors.DARK : BaseColors.WHITE}
						large
						dark={overlay && true}
					/>
					<ButtonPlay
						recording={recording}
						backgroundColor={overlay ? BaseColors.DARK : BaseColors.WHITE}
						active
					/>
					<ButtonNudge
						recording={recording}
						backgroundColor={overlay ? BaseColors.DARK : BaseColors.WHITE}
						large
						dark={overlay && true}
					/>
				</div>
			</div>
			<div className={styles.meta}>
				<Link href={recording.canonicalPath}>
					<a className={clsx(styles.link, overlay && styles.overlay)}>
						{sequenceLine}
						<h4 className={clsx(styles.title, overlay && styles.overlay)}>
							{recording.title}
						</h4>
					</a>
				</Link>
				<div className={clsx(styles.progress, overlay && styles.overlay)}>
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
						id: 'miniplayer__reduceVolume',
						defaultMessage: 'Reduce volume',
					})}
					onClick={() => playbackContext.setVolume(volume - 10)}
				>
					<IconVolumeLow />
				</button>
				<Slider
					className={clsx(styles.slider, overlay && styles.overlay)}
					value={volume}
					onChange={(e, val) => playbackContext.setVolume(val as number)}
					aria-label={intl.formatMessage({
						id: 'miniplayer__volume',
						defaultMessage: 'Volume',
					})}
				/>
				<button
					aria-label={intl.formatMessage({
						id: 'miniplayer__increaseVolume',
						defaultMessage: 'Increase volume',
					})}
					onClick={() => playbackContext.setVolume(volume + 10)}
				>
					<IconVolumeHigh />
				</button>
			</div>
		</div>
	);
}
