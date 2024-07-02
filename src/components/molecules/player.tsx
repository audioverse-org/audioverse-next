import clsx from 'clsx';
import Image from 'next/legacy/image';
import React, { useContext, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { useGetWithAuthGuardDataQuery } from '~components/HOCs/__generated__/withAuthGuard';
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
import { getSessionToken } from '~lib/cookies';
import hasVideo from '~lib/media/hasVideo';
import usePlaybackSession from '~lib/media/usePlaybackSession';
import useGlobalSpaceDown from '~lib/useGlobalSpaceDown';
import IconAirPlayAudio from '~public/img/icon-airplay-audio.svg';
import IconChromeCast from '~public/img/icon-chromecast.svg';
import IconFullscreen from '~public/img/icons/icon-fullscreen.svg';
import IconPause from '~public/img/icons/icon-pause-large.svg';
import IconPlay from '~public/img/icons/icon-play-large.svg';
import usePlayerLocation from '~src/lib/media/usePlayerLocation';
import usePrefersAudio from '~src/lib/media/usePrefersAudio';

import { PlaybackContext } from '../templates/andPlaybackContext';
import { PlayerFragment } from './__generated__/player';
import ButtonAddToPlaylist from './buttonAddToPlaylist';
import ButtonDownloadBlank from './buttonDownloadBlank';
import CircleButton from './circleButton';
import styles from './player.module.scss';

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
	compact,
}: PlayerProps): JSX.Element => {
	useContext(PlaybackContext);
	const intl = useIntl();
	const { prefersAudio } = usePrefersAudio();
	const session = usePlaybackSession(recording);
	const shouldShowPoster =
		hasVideo(recording) &&
		!prefersAudio &&
		(!session.isLoaded || session.isPaused);
	const shouldShowAudioControls =
		!hasVideo(recording) || session.isAudioLoaded || prefersAudio;
	const shouldShowVideoControls = !shouldShowAudioControls;
	const [posterHovered, setPosterHovered] = useState(false);
	const [browser, setBrowser] = useState<string | null>(null);
	const { registerPlayerLocation, unregisterPlayerLocation } =
		usePlayerLocation();

	useEffect(() => {
		const el = document.getElementById('location-detail');
		if (!el) return;
		registerPlayerLocation({
			locationId: 'detail',
			locationEl: el as HTMLDivElement,
			recordingId: recording.id,
		});
		return () => {
			unregisterPlayerLocation('detail');
		};
	}, [registerPlayerLocation, recording.id, unregisterPlayerLocation]);

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

	const iconColor = isBackgroundColorDark(backgroundColor)
		? BaseColors.WHITE
		: BaseColors.DARK;

	const sessionToken = getSessionToken(); // i will see if this give any issue
	const authResult = useGetWithAuthGuardDataQuery(
		{},
		{
			enabled: !!sessionToken,
			retry: false,
		}
	);
	const user = authResult.data?.me?.user;

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
								<div
									id="location-detail"
									ref={(el) => {
										if (!el) return;
										registerPlayerLocation({
											locationId: 'detail',
											locationEl: el as HTMLDivElement,
											recordingId: recording.id,
										});
									}}
								/>
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
					{user ? (
						<ButtonDownload {...{ recording, backgroundColor }} />
					) : (
						<ButtonDownloadBlank backgroundColor={backgroundColor} />
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
