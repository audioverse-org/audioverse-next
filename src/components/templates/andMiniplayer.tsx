import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React, { PropsWithChildren, useContext, useEffect } from 'react';

import useOnPlayerLoad from '~src/lib/media/useOnPlayerLoad';

import styles from './andMiniplayer.module.scss';
import { PlaybackContext } from './andPlaybackContext';

const LazyMiniplayer = dynamic(() => import('../organisms/miniplayer'));
const LazyHelpWidget = dynamic(() => import('../molecules/helpWidget'));

export default function AndMiniplayer({
	children,
}: PropsWithChildren<unknown>): JSX.Element {
	const playbackContext = useContext(PlaybackContext);
	const onLoad = useOnPlayerLoad();
	const recording = playbackContext.getRecording();

	useEffect(() => {
		document.body.classList.toggle('body--with-miniplayer', !!recording);
	}, [recording]);

	useEffect(() => {
		onLoad((player) => {
			player.on('timeupdate', () => {
				const t = player.currentTime();
				const d = player.duration();
				const p = d ? t / d : 0;
				playbackContext.setProgress({
					percentage: p,
					recordingId: recording?.id,
					updatePlayer: false,
				});
			});
			player.on('pause', () => playbackContext.setIsPaused(true));
			player.on('play', () => playbackContext.setIsPaused(false));
			player.on('ended', () => playbackContext.advanceRecording());
		});
	}, [onLoad, playbackContext, recording]);

	return (
		<>
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
