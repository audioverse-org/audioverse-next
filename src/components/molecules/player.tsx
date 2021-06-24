import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Image from 'next/image';
import React, { CSSProperties, useContext } from 'react';
import { useIntl } from 'react-intl';

import {
	PlaybackContext,
	PlaybackContextType,
} from '@components/templates/andMiniplayer';
import { PlayerFragment } from '@lib/generated/graphql';
import hasVideo from '@lib/hasVideo';

import BackIcon from '../../../public/img/icon-nudge-left.svg';
import ForwardIcon from '../../../public/img/icon-nudge-right.svg';

import styles from './player.module.scss';

export interface PlayerProps {
	recording: PlayerFragment;
}

const Player = ({ recording }: PlayerProps): JSX.Element => {
	const intl = useIntl();
	const playback = useContext(PlaybackContext);
	const progress = playback.getProgress();
	const loadedRecording = playback.getRecording();
	const isLoaded = loadedRecording && loadedRecording.id === recording.id;
	const shouldShowPoster =
		(!isLoaded && hasVideo(recording)) || playback.isShowingVideo();

	// TODO: Figure out how to make T properly pass `...vars` types through
	function andLoad<T extends Array<any>>(
		func: (c: PlaybackContextType, ...vars: T) => void
	) {
		return (...vars: T) => {
			// TODO: handle recording mismatch
			if (playback.getRecording()) {
				func(playback, ...vars);
				return;
			}

			playback.load(recording, (c: PlaybackContextType) => {
				func(c, ...vars);
			});
		};
	}

	return (
		<div className={playback.isShowingVideo() ? styles.video : styles.audio}>
			{hasVideo(recording) && (
				<>
					<button onClick={andLoad((c) => c.setPrefersAudio(true))}>
						Audio
					</button>
					<button onClick={andLoad((c) => c.setPrefersAudio(false))}>
						Video
					</button>
				</>
			)}
			{shouldShowPoster ? (
				<button onClick={andLoad((c) => c.play())}>
					<Image
						src="/img/poster.jpg"
						alt={recording.title}
						width={1500}
						height={500}
					/>
				</button>
			) : (
				<div className={styles.controls}>
					{playback.paused() ? (
						<button
							aria-label={intl.formatMessage({
								id: 'player__playButtonLabel',
								defaultMessage: 'play',
								description: 'player play button label',
							})}
							onClick={andLoad((c) => c.play())}
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
							onClick={() => playback.pause()}
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
							aria-label={intl.formatMessage({
								id: 'player__progressLabel',
								defaultMessage: 'progress',
								description: 'player progress label',
							})}
							value={progress * 100}
							onChange={(e) => {
								const val = e.target.value;
								andLoad((c) => {
									const percent = parseInt(val) / 100;
									c.setProgress(percent);
								})();
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
					onClick={andLoad((c) => {
						c.setTime(c.getTime() - 15);
					})}
				>
					<BackIcon />
				</button>
				<button
					aria-label={intl.formatMessage({
						id: 'player__nudgeForward',
						defaultMessage: 'forward 15 seconds',
						description: 'player nudge-forward label',
					})}
					onClick={andLoad((c) => {
						c.setTime(c.getTime() + 15);
					})}
				>
					<ForwardIcon />
				</button>
			</div>
		</div>
	);
};

export default Player;
