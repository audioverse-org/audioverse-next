import clsx from 'clsx';
import Image from 'next/image';
import React, { CSSProperties, useState } from 'react';
import { useIntl } from 'react-intl';

import ButtonDownload from '@components/molecules/buttonDownload';
import ButtonNudge from '@components/molecules/buttonNudge';
import ButtonPlay from '@components/molecules/buttonPlay';
import ButtonShareRecording from '@components/molecules/buttonShareRecording';
import ButtonSpeed from '@components/molecules/buttonSpeed';
import PlaybackTimes from '@components/molecules/playbackTimes';
import RecordingProgressBar from '@components/molecules/recordingProgressBar';
import { BaseColors } from '@lib/constants';
import { AndMiniplayerFragment, PlayerFragment } from '@lib/generated/graphql';
import hasVideo from '@lib/hasVideo';
import usePlaybackSession from '@lib/usePlaybackSession';

import IconFullscreen from '../../../public/img/icon-fullscreen.svg';
import IconPause from '../../../public/img/icon-pause-large.svg';
import IconPlay from '../../../public/img/icon-play-large.svg';

import CircleButton from './circleButton';
import styles from './player.module.scss';
import RecordingButtonFavorite from './recordingButtonFavorite';

export interface PlayerProps {
	recording: PlayerFragment;
	backgroundColor: BaseColors;
	playlistRecordings?: AndMiniplayerFragment[];
	disableUserFeatures?: boolean;
	prefersAudio?: boolean;
	compact?: boolean;
}

const Player = ({
	recording,
	backgroundColor,
	disableUserFeatures,
	playlistRecordings,
	prefersAudio,
	compact,
}: PlayerProps): JSX.Element => {
	const intl = useIntl();
	const session = usePlaybackSession(recording, {
		playlistRecordings,
		prefersAudio,
	});
	const shouldShowPoster =
		hasVideo(recording) &&
		!prefersAudio &&
		(!session.isLoaded || session.isPaused);
	const shouldShowAudioControls =
		!hasVideo(recording) || session.isAudioLoaded || prefersAudio;
	const shouldShowVideoControls = !shouldShowAudioControls;
	const video = session.getVideo();
	const [posterHovered, setPosterHovered] = useState(false);

	return (
		<div
			data-testid={recording.id}
			aria-label={intl.formatMessage({
				id: 'player__playerLabel',
				defaultMessage: 'player',
				description: 'player label',
			})}
		>
			{shouldShowVideoControls && (
				<div className={styles.videoWrapper}>
					<div>
						<button
							className={clsx(
								styles.poster,
								(shouldShowPoster || posterHovered) && styles.posterPlayShown
							)}
							onClick={() =>
								session.isPaused ? session.play() : session.pause()
							}
							onTouchStart={() => setPosterHovered(true)}
							onTouchEnd={() => setPosterHovered(false)}
						>
							{session.isVideoLoaded ? (
								video
							) : (
								<Image
									src="/img/poster.jpg"
									alt={recording.title}
									layout="fill"
									objectFit="cover"
									objectPosition="left bottom"
								/>
							)}
							<span className={styles.posterPlay}>
								{session.isPaused ? <IconPlay /> : <IconPause />}
							</span>
						</button>
					</div>
				</div>
			)}

			{shouldShowVideoControls && (
				<div className={styles.videoProgress}>
					<RecordingProgressBar recording={recording} />
					<PlaybackTimes recording={recording} />
				</div>
			)}

			{shouldShowAudioControls && (
				<div className={styles.controls}>
					<ButtonPlay
						{...{
							recording,
							playlistRecordings,
							backgroundColor,
							prefersAudio,
						}}
						large={!compact}
						active
						className={styles.play}
					/>
					<div className={styles.controlGrow}>
						<div
							className={styles.waves}
							style={
								{
									'--progress': `${session.progress * 100}%`,
									'--buffered': `${session.bufferedProgress * 100}%`,
								} as CSSProperties
							}
						>
							<input
								type="range"
								aria-label={intl.formatMessage({
									id: 'player__progressLabel',
									defaultMessage: 'progress',
									description: 'player progress label',
								})}
								value={session.progress * 100}
								onChange={(e) => {
									const percent = parseInt(e.target.value) / 100;
									session.setProgress(percent);
								}}
							/>
						</div>
						<PlaybackTimes recording={recording} />
					</div>
				</div>
			)}

			<div className={styles.buttons}>
				<div
					className={clsx(
						styles.leftButtons,
						compact && styles.leftButtonsCompact
					)}
				>
					<ButtonNudge
						recording={recording}
						reverse={true}
						backgroundColor={backgroundColor}
					/>
					<ButtonNudge
						recording={recording}
						backgroundColor={backgroundColor}
					/>
				</div>
				<div className={styles.rightButtons}>
					{shouldShowVideoControls && (
						<CircleButton
							onClick={() => session.requestFullscreen()}
							backgroundColor={backgroundColor}
							aria-label={intl.formatMessage({
								id: 'player__fullscreenButtonLabel',
								defaultMessage: 'fullscreen',
								description: 'player fullscreen button label',
							})}
						>
							<IconFullscreen />
						</CircleButton>
					)}
					<ButtonSpeed {...{ recording, backgroundColor }} />
					<ButtonDownload {...{ recording, backgroundColor }} />
					<ButtonShareRecording
						{...{
							recording,
							backgroundColor,
							shareVideo: shouldShowVideoControls,
							disableEmbedCode: disableUserFeatures,
						}}
					/>
					{!disableUserFeatures && (
						<RecordingButtonFavorite
							id={recording.id}
							backgroundColor={backgroundColor}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Player;
