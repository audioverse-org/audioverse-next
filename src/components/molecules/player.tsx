import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React, { CSSProperties, useContext, useEffect } from 'react';
import { useIntl } from 'react-intl';

import { PlaybackContext } from '@components/templates/andMiniplayer';
import { PlayerFragment } from '@lib/generated/graphql';

import BackIcon from '../../../public/img/icon-nudge-left.svg';
import ForwardIcon from '../../../public/img/icon-nudge-right.svg';

import styles from './player.module.scss';

// Source:
// https://github.com/vercel/next.js/blob/canary/examples/with-videojs/components/Player.js

// If this solution becomes unviable, for instance, due to needing to
// update more props than just sources, this alternative approach may work:
// https://github.com/videojs/video.js/issues/4970#issuecomment-520591504

export interface PlayerProps {
	recording: PlayerFragment;
}

const Player = ({ recording }: PlayerProps): JSX.Element => {
	const playback = useContext(PlaybackContext);
	const progress = playback.getProgress();

	useEffect(() => {
		playback.load(recording);
	}, [recording]);

	return (
		<div className={playback.isShowingVideo() ? styles.video : styles.audio}>
			{playback.hasVideo() && (
				<>
					<button onClick={() => playback.setPrefersAudio(true)}>Audio</button>
					<button onClick={() => playback.setPrefersAudio(false)}>Video</button>
				</>
			)}
			{!playback.isShowingVideo() && (
				<div className={styles.controls}>
					{playback.paused() ? (
						<button
							aria-label={useIntl().formatMessage({
								id: 'player__playButtonLabel',
								defaultMessage: 'play',
								description: 'player play button label',
							})}
							onClick={() => {
								playback.play();
							}}
						>
							<PlayArrowIcon />
						</button>
					) : (
						<button
							aria-label={useIntl().formatMessage({
								id: 'player__pauseButtonLabel',
								defaultMessage: 'pause',
								description: 'player pause button label',
							})}
							onClick={() => {
								playback.pause();
							}}
						>
							<PauseIcon />
						</button>
					)}
					<div
						className={styles.waves}
						style={{ '--progress': `${progress * 100}%` } as CSSProperties}
					>
						<input
							type="range"
							aria-label={useIntl().formatMessage({
								id: 'player__progressLabel',
								defaultMessage: 'progress',
								description: 'player progress label',
							})}
							value={progress * 100}
							onChange={(e) => {
								const percent = parseInt(e.target.value) / 100;
								playback.setProgress(percent);
							}}
						/>
					</div>
				</div>
			)}
			<div className={styles.skip}>
				<button
					aria-label={useIntl().formatMessage({
						id: 'player__nudgeBack',
						defaultMessage: 'back 15 seconds',
						description: 'player nudge-back label',
					})}
					onClick={() => {
						const time = playback.getTime();
						playback.setTime(time - 15);
					}}
				>
					<BackIcon />
				</button>
				<button
					aria-label={useIntl().formatMessage({
						id: 'player__nudgeForward',
						defaultMessage: 'forward 15 seconds',
						description: 'player nudge-forward label',
					})}
					onClick={() => {
						const time = playback.getTime();
						playback.setTime(time + 15);
					}}
				>
					<ForwardIcon />
				</button>
			</div>
		</div>
	);
};

export default Player;
