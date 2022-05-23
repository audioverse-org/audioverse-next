import clsx from 'clsx';
// import dynamic from 'next/dynamic';
import React, { PropsWithChildren, useContext } from 'react';

import Miniplayer from '@components/organisms/miniplayer';

import styles from './andMiniplayer.module.scss';
import { PlaybackContext } from './andPlaybackContext';

// const LazyMiniplayer = dynamic(() => import('../organisms/miniplayer'));

export default function AndMiniplayer({
	children,
}: PropsWithChildren<unknown>): JSX.Element {
	const playbackContext = useContext(PlaybackContext);
	const player = playbackContext.player();

	const {
		origin: originRef,
		video: videoRef,
		videoEl: videoElRef,
	} = playbackContext.getRefs();

	const recording = playbackContext.getRecording();
	return (
		<>
			<div ref={originRef} className={styles.videoOrigin}>
				<div ref={videoRef} className={styles.playerElement}>
					<div data-vjs-player={true}>
						<video
							ref={videoElRef}
							className="video-js"
							playsInline
							data-testid="video-element"
							onTimeUpdate={() => {
								if (!player) return;
								const t = player.currentTime();
								const d = player.duration();
								const p = d ? t / d : 0;
								playbackContext.setProgress(p, false);
							}}
							onPause={() => playbackContext.setIsPaused(true)}
							onPlay={() => playbackContext.setIsPaused(false)}
							onEnded={() => playbackContext.advanceRecording()}
						/>
					</div>
				</div>
			</div>

			<div
				className={
					recording &&
					clsx(styles.contentWithPlayer, 'andMiniplayer--withPlayer')
				}
			>
				{children}
			</div>
			<Miniplayer />
		</>
	);
}
