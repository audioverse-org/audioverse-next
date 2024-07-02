import 'video.js/dist/video-js.css';

import Slider from '@material-ui/core/Slider';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { useIntl } from 'react-intl';

import ButtonNudge from '~components/molecules/buttonNudge';
import ButtonPlay from '~components/molecules/buttonPlay';
import RecordingProgressBar from '~components/molecules/recordingProgressBar';
import { PlaybackContext } from '~components/templates/andPlaybackContext';
import { BaseColors } from '~lib/constants';
import { getSequenceTypeTheme } from '~lib/getSequenceType';
import { useFormattedTime } from '~lib/time';
import IconVolumeHigh from '~public/img/icons/icon-volume-high.svg';
import IconVolumeLow from '~public/img/icons/icon-volume-low.svg';
import { SequenceContentType } from '~src/__generated__/graphql';
import usePlayer from '~src/lib/media/usePlayer';
import usePlayerLocation from '~src/lib/media/usePlayerLocation';
import usePlayerRecording from '~src/lib/media/usePlayerRecording';
import useVolume from '~src/lib/media/useVolume';

import styles from './miniplayer.module.scss';

export default function Miniplayer(): JSX.Element | null {
	const intl = useIntl();
	const playbackContext = useContext(PlaybackContext);
	const { recording } = usePlayerRecording();
	const timeString = useFormattedTime(playbackContext.getTime());
	const durationString = useFormattedTime(playbackContext.getDuration());
	const { player } = usePlayer();
	const { getVolume, setVolume } = useVolume(player);
	const { playerLocation, registerPlayerLocation } = usePlayerLocation();

	useEffect(() => {
		const el = document.getElementById('location-miniplayer');
		if (!el) return;
		registerPlayerLocation({
			locationId: 'miniplayer',
			locationEl: el as HTMLDivElement,
		});
	}, [registerPlayerLocation]);

	let sequenceLine = null;
	if (recording?.sequence) {
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
			className={clsx(styles.miniplayer, !recording && styles.hidden)}
			aria-label={intl.formatMessage({
				id: 'miniplayer__label',
				defaultMessage: 'miniplayer',
			})}
			aria-hidden={!recording}
		>
			<div className={styles.player}>
				<div id="location-miniplayer" className={styles.pane} />
				<div
					className={clsx(
						styles.controls,
						playerLocation === 'miniplayer' && styles.hidden
					)}
				>
					{recording && (
						<>
							<ButtonNudge
								recording={recording}
								reverse={true}
								backgroundColor={BaseColors.WHITE}
								large
							/>
							<ButtonPlay
								recording={recording}
								backgroundColor={BaseColors.WHITE}
							/>
							<ButtonNudge
								recording={recording}
								backgroundColor={BaseColors.WHITE}
								large
							/>
						</>
					)}
				</div>
			</div>
			<div className={styles.meta}>
				{recording && (
					<>
						<Link href={recording.canonicalPath} legacyBehavior>
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
					</>
				)}
			</div>
			<div className={styles.volume}>
				<button
					aria-label={intl.formatMessage({
						id: 'miniplayer__reduceVolume',
						defaultMessage: 'Reduce volume',
					})}
					onClick={() => setVolume(getVolume() - 10)}
				>
					<IconVolumeLow />
				</button>
				<Slider
					className={styles.slider}
					value={getVolume()}
					onChange={(e, val) => setVolume(val as number)}
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
					onClick={() => setVolume(getVolume() + 10)}
				>
					<IconVolumeHigh />
				</button>
			</div>
		</div>
	);
}
