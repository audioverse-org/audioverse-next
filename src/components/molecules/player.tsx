import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Image from 'next/image';
import React, { CSSProperties } from 'react';
import { useIntl } from 'react-intl';

import { PlayerFragment } from '@lib/generated/graphql';
import hasVideo from '@lib/hasVideo';
import usePlaybackSession from '@lib/usePlaybackSession';

import BackIcon from '../../../public/img/icon-nudge-left.svg';
import ForwardIcon from '../../../public/img/icon-nudge-right.svg';

import styles from './player.module.scss';

export interface PlayerProps {
	recording: PlayerFragment;
}

const Player = ({ recording }: PlayerProps): JSX.Element => {
	const intl = useIntl();
	const session = usePlaybackSession(recording);
	const shouldShowPoster = !session.isLoaded && hasVideo(recording);
	const shouldShowAudioControls = !hasVideo(recording) || session.isAudioLoaded;

	return (
		<div data-testid={recording.id}>
			{hasVideo(recording) && (
				<>
					<button onClick={() => session.setPrefersAudio(true)}>Audio</button>
					<button onClick={() => session.setPrefersAudio(false)}>Video</button>
				</>
			)}
			{shouldShowPoster && (
				<button onClick={() => session.play()}>
					<Image
						src="/img/poster.jpg"
						alt={recording.title}
						width={1500}
						height={500}
					/>
				</button>
			)}
			{session.isVideoLoaded && <p>video right below</p>}
			{session.isVideoLoaded && session.video}
			{shouldShowAudioControls && (
				<div className={styles.controls}>
					{session.isPaused ? (
						<button
							aria-label={intl.formatMessage({
								id: 'player__playButtonLabel',
								defaultMessage: 'play',
								description: 'player play button label',
							})}
							onClick={() => session.play()}
						>
							<PlayArrowIcon />
						</button>
					) : (
						<button
							aria-label={intl.formatMessage({
								id: 'player__pauseButtonLabel',
								defaultMessage: 'pause',
								description: 'player pause button label',
							})}
							onClick={() => session.pause()}
						>
							<PauseIcon />
						</button>
					)}
					<div
						className={styles.waves}
						style={
							{ '--progress': `${session.progress * 100}%` } as CSSProperties
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
				</div>
			)}
			<div className={styles.skip}>
				<button
					aria-label={intl.formatMessage({
						id: 'player__nudgeBack',
						defaultMessage: 'back 15 seconds',
						description: 'player nudge-back label',
					})}
					onClick={() => session.shiftTime(-15)}
				>
					<BackIcon />
				</button>
				<button
					aria-label={intl.formatMessage({
						id: 'player__nudgeForward',
						defaultMessage: 'forward 15 seconds',
						description: 'player nudge-forward label',
					})}
					onClick={() => session.shiftTime(15)}
				>
					<ForwardIcon />
				</button>
			</div>
		</div>
	);
};

export default Player;
