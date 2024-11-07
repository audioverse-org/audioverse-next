import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React, { PropsWithChildren, useContext, useEffect } from 'react';

import styles from './andMiniplayer.module.scss';
import { PlaybackContext } from './andPlaybackContext';

const LazyMiniplayer = dynamic(() => import('../organisms/miniplayer'));
const LazyHelpWidget = dynamic(() => import('../molecules/helpWidget'));

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

	useEffect(() => {
		document.body.classList.toggle('body--with-miniplayer', !!recording);
	}, [recording]);

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
							data-type={playbackContext.isShowingVideo() ? 'video' : 'audio'}
							data-id={recording?.id}
							data-title={recording?.title}
							onTimeUpdate={() => {
								if (!player) return;
								const t = player.currentTime();
								if (t === undefined) return;
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
				className={clsx({
					[styles.contentWithPlayer]: !!recording,
					'andMiniplayer--withPlayer': !!recording,
				})}
			>
				{children}
				<div className={styles.helpButton}>
					<LazyHelpWidget />
				</div>
			</div>
			<LazyMiniplayer />
		</>
	);
}
