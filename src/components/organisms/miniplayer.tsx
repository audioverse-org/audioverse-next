import Slider from '@material-ui/core/Slider';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { useIntl } from 'react-intl';

import ButtonNudge from '@components/molecules/buttonNudge';
import ButtonPlay from '@components/molecules/buttonPlay';
import RecordingProgressBar from '@components/molecules/recordingProgressBar';
import { PlaybackContext } from '@components/templates/andPlaybackContext';
import { BaseColors } from '@lib/constants';
import {
	AndMiniplayerFragment,
	ButtonDownloadFragment,
	ButtonShareRecordingFragment,
	SequenceContentType,
} from '@lib/generated/graphql';
import { getSequenceTypeTheme } from '@lib/getSequenceType';
import { useFormattedTime } from '@lib/time';
import ButtonDownload from '@components/molecules/buttonDownload';
import ButtonShareRecording from '@components/molecules/buttonShareRecording';
// import ButtonSpeed from '@components/molecules/buttonSpeed';
import RecordingButtonFavorite from '@components/molecules/recordingButtonFavorite';

import IconVolumeHigh from '../../../public/img/icons/icon-volume-high.svg';
import IconVolumeLow from '../../../public/img/icons/icon-volume-low.svg';
import IconExitFullscreen from '../../../public/img/icons/icon-exit-fullscreen.svg';

import 'video.js/dist/video-js.css';
import styles from './miniplayer.module.scss';
import hasVideo from '@lib/hasVideo';
import CircleButton from '@components/molecules/circleButton';
import usePlaybackSession from '@lib/usePlaybackSession';

export default function Miniplayer({
	overlay,
}: {
	overlay?: boolean;
}): JSX.Element | null {
	const intl = useIntl();
	const playbackContext = useContext(PlaybackContext);
	const volume = playbackContext.getVolume();
	const recording = playbackContext.getRecording();
	const recordingAMF = recording as AndMiniplayerFragment;
	const recordingBDF = recording as ButtonDownloadFragment;
	const recordingBSRF = recording as ButtonShareRecordingFragment;

	const isShowingVideo = playbackContext.getVideoLocation() === 'miniplayer';
	const timeString = useFormattedTime(playbackContext.getTime());
	const durationString = useFormattedTime(playbackContext.getDuration());
	const session = usePlaybackSession(recordingAMF, {});
	const [showOverlayVolumeControl, setShowOverlayVolumeControl] =
		useState<boolean>(false);
	if (!recording) return null;
	const shouldShowAudioControls = !hasVideo(recordingAMF);
	const shouldShowVideoControls = !shouldShowAudioControls;

	let sequenceLine = null;
	if (recordingAMF.sequence) {
		const { Icon } = getSequenceTypeTheme(recordingAMF.sequence.contentType);
		sequenceLine = (
			<div
				className={clsx(styles.series, overlay && styles.overlay)}
				aria-label={intl.formatMessage({
					id: 'miniplayer__series',
					defaultMessage: 'Series',
				})}
			>
				<Icon width={13} height={13} />
				{recordingAMF.sequence.contentType === SequenceContentType.BibleBook
					? recordingAMF.collection?.title
					: recordingAMF.sequence.title}
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
						recording={recordingAMF}
						reverse={true}
						backgroundColor={overlay ? BaseColors.DARK : BaseColors.WHITE}
						large
						dark={overlay && true}
					/>
					<ButtonPlay
						recording={recordingAMF}
						backgroundColor={overlay ? BaseColors.DARK : BaseColors.WHITE}
						active
					/>
					<ButtonNudge
						recording={recordingAMF}
						backgroundColor={overlay ? BaseColors.DARK : BaseColors.WHITE}
						large
						dark={overlay && true}
					/>
				</div>
			</div>
			<div className={styles.meta}>
				<Link href={recordingAMF.canonicalPath}>
					<a className={clsx(styles.link, overlay && styles.overlay)}>
						{sequenceLine}
						<h4 className={clsx(styles.title, overlay && styles.overlay)}>
							{recordingAMF.title}
						</h4>
					</a>
				</Link>
				<div className={clsx(styles.progress, overlay && styles.overlay)}>
					<span>{timeString}</span>
					<span className={styles.bar}>
						<RecordingProgressBar recording={recordingAMF} />
					</span>
					<span>{durationString}</span>
				</div>
			</div>

			{overlay ? (
				<>
					<div
						className={clsx(
							styles.rightButtons,
							showOverlayVolumeControl ? styles.hide : styles.show
						)}
					>
						<ButtonDownload
							recording={recordingBDF}
							backgroundColor={overlay ? BaseColors.DARK : BaseColors.WHITE}
						/>
						<ButtonShareRecording
							{...{
								recording: recordingBSRF,
								shareVideo: shouldShowVideoControls,
							}}
							backgroundColor={overlay ? BaseColors.DARK : BaseColors.WHITE}
						/>
						<RecordingButtonFavorite
							id={recordingAMF.id}
							backgroundColor={overlay ? BaseColors.DARK : BaseColors.WHITE}
						/>
						{/* <ButtonSpeed
						{...{ recording }}
						backgroundColor={overlay ? BaseColors.DARK : BaseColors.WHITE}
					/> */}
						{shouldShowVideoControls && (
							<CircleButton
								onClick={() => session?.cancelFullScreen()}
								backgroundColor={overlay ? BaseColors.DARK : BaseColors.WHITE}
								aria-label={intl.formatMessage({
									id: 'player__fullscreenButtonLabel',
									defaultMessage: 'fullscreen',
									description: 'player fullscreen button label',
								})}
							>
								<IconExitFullscreen />
							</CircleButton>
						)}
						<button
							aria-label={intl.formatMessage({
								id: 'miniplayer__reduceVolume',
								defaultMessage: 'Reduce volume',
							})}
							onClick={() => setShowOverlayVolumeControl(true)}
						>
							<IconVolumeLow />
						</button>
					</div>
					<div
						className={clsx(
							styles.volume,
							showOverlayVolumeControl ? styles.show : styles.hide
						)}
					>
						<button
							aria-label={intl.formatMessage({
								id: 'miniplayer__reduceVolume',
								defaultMessage: 'Reduce volume',
							})}
							onClick={() => setShowOverlayVolumeControl(false)}
						>
							<IconVolumeHigh />
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
							onClick={() => setShowOverlayVolumeControl(false)}
						>
							<IconVolumeLow />
						</button>
					</div>
				</>
			) : (
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
			)}
		</div>
	);
}
