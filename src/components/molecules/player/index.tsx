import clsx from 'clsx';
import Image from 'next/legacy/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import ButtonDownload from '~components/molecules/buttonDownload';
import ButtonNudge from '~components/molecules/buttonNudge';
import ButtonPlay, {
	isBackgroundColorDark,
} from '~components/molecules/buttonPlay';
import ButtonShareRecording from '~components/molecules/buttonShareRecording';
import ButtonSpeed from '~components/molecules/buttonSpeed';
import PlaybackTimes from '~components/molecules/playbackTimes';
import RecordingProgressBar from '~components/molecules/recordingProgressBar';
import { AndMiniplayerFragment } from '~components/templates/__generated__/andMiniplayer';
import { BaseColors } from '~lib/constants';
import hasVideo from '~lib/hasVideo';
import IconAirPlayAudio from '~public/img/icon-airplay-audio.svg';
import IconChromeCast from '~public/img/icon-chromecast.svg';
import IconFullscreen from '~public/img/icons/icon-fullscreen.svg';
import IconPause from '~public/img/icons/icon-pause-large.svg';
import IconPlay from '~public/img/icons/icon-play-large.svg';
import useGlobalSpaceDown from '~src/lib/hooks/useGlobalSpaceDown';
import useIsAuthenticated from '~src/lib/hooks/useIsAuthenticated';
import usePlaybackSession from '~src/lib/hooks/usePlaybackSession';
import isServerSide from '~src/lib/isServerSide';

import ButtonAddToPlaylist from '../buttonAddToPlaylist';
import ButtonDownloadBlank from '../buttonDownloadBlank';
import CircleButton from '../circleButton';
import { PlayerFragment } from './__generated__/index';
import styles from './index.module.scss';

export interface PlayerProps {
	recording: PlayerFragment;
	backgroundColor: BaseColors;
	playlistRecordings?: AndMiniplayerFragment[];
	disableUserFeatures?: boolean;
	disableDownload?: boolean;
	prefersAudio?: boolean;
	compact?: boolean;
}

const DownloadButton = ({
	recording,
	backgroundColor,
}: PlayerProps): JSX.Element => {
	const { isUserLoggedIn } = useIsAuthenticated();

	return isUserLoggedIn ? (
		<ButtonDownload backgroundColor={backgroundColor} recording={recording} />
	) : (
		<ButtonDownloadBlank backgroundColor={backgroundColor} />
	);
};

const Player = ({
	recording,
	backgroundColor,
	disableUserFeatures,
	playlistRecordings,
	prefersAudio,
	compact,
	disableDownload,
}: PlayerProps): JSX.Element => {
	const intl = useIntl();
	const params = useSearchParams();
	const session = usePlaybackSession(recording, {
		playlistRecordings,
		prefersAudio,
	});
	const shouldShowPoster =
		hasVideo(recording) &&
		!prefersAudio &&
		(!session.isLoaded || session.isPaused);
	const shouldShowAudioControls =
		session.prefersAudio || !hasVideo(recording) || session.isAudioLoaded;
	const shouldShowVideoControls = !shouldShowAudioControls;
	const video = session.getVideo();
	const [posterHovered, setPosterHovered] = useState(false);
	const [browser, setBrowser] = useState<string | null>(null);

	useGlobalSpaceDown(() => {
		session.isPaused ? session.play() : session.pause();
	});

	useEffect(() => {
		if (navigator.userAgent.match(/chrome|chromium|crios/i)) {
			setBrowser('chrome');
		} else if (navigator.userAgent.match(/safari/i)) {
			setBrowser('safari');
		} else {
			setBrowser(null);
		}
	}, []);

	useEffect(() => {
		if (isServerSide()) return;
		if (!recording) return;
		if (!params.has('autoplay')) return;
		session.play();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recording]);

	const iconColor = isBackgroundColorDark(backgroundColor)
		? BaseColors.WHITE
		: BaseColors.DARK;

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
								(shouldShowPoster || posterHovered) && styles.posterPlayShown,
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
							style={{
								'--progress': `${session.progress * 100}%`,
								'--buffered': `${session.bufferedProgress * 100}%`,
							}}
						>
							<input
								type="range"
								aria-label={intl.formatMessage({
									id: 'player__progressLabel',
									defaultMessage: 'progress',
									description: 'player progress label',
								})}
								value={session.progress * 100}
								step={0.0001}
								onInput={(e) => {
									const percent =
										parseFloat((e.target as HTMLInputElement).value) / 100;
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
						compact && styles.leftButtonsCompact,
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
							<IconFullscreen color={iconColor} />
						</CircleButton>
					)}
					{browser === 'chrome' && (
						<CircleButton
							onClick={() => session.chromecastTrigger()}
							backgroundColor={backgroundColor}
							aria-label={intl.formatMessage({
								id: 'player__chromeCastLabel',
								defaultMessage: 'chromeCast',
								description: 'player chromeCast button label',
							})}
						>
							<IconChromeCast color={iconColor} />
						</CircleButton>
					)}
					{browser === 'safari' && (
						<CircleButton
							onClick={() => session.airPlayTrigger()}
							backgroundColor={backgroundColor}
							aria-label={intl.formatMessage({
								id: 'player__airPlayLabel',
								defaultMessage: 'airPlay',
								description: 'player airPlay button label',
							})}
						>
							<IconAirPlayAudio color={iconColor} />
						</CircleButton>
					)}

					<ButtonSpeed {...{ recording, backgroundColor }} />

					{!disableDownload && (
						<DownloadButton {...{ recording, backgroundColor }} />
					)}

					<ButtonShareRecording
						{...{
							recording,
							backgroundColor,
							shareVideo: shouldShowVideoControls,
							disableEmbedCode: disableUserFeatures,
						}}
					/>
					{!disableUserFeatures && (
						<ButtonAddToPlaylist
							recordingId={recording.id}
							backgroundColor={backgroundColor}
							iconColor={iconColor}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Player;
