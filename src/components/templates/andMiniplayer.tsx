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
	const recording = playbackContext.getRecording();

	useEffect(() => {
		document.body.classList.toggle('body--with-miniplayer', !!recording);
	}, [recording]);

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
