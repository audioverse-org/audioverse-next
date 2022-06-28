import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FormattedMessage } from 'react-intl';

import { RecordingFragment, SequenceContentType } from '@lib/generated/graphql';
import { getSequenceTypeTheme } from '@lib/getSequenceType';
import React, { PropsWithChildren, useContext, useEffect } from 'react';

import styles from './andMiniplayer.module.scss';
import { PlaybackContext } from './andPlaybackContext';

const LazyMiniplayer = dynamic(() => import('../organisms/miniplayer'));
const LazyMiniplayerOverlay = dynamic(
	() => import('../organisms/miniplayerOverlay')
);
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
		videoOverlay: videoOverlayRef,
		titleOverlay: titleOverlayRef,
	} = playbackContext.getRefs();

	const recording = playbackContext.getRecording();
	const teaseRecording = recording as RecordingFragment;

	let sequenceLine = null;
	if (teaseRecording?.sequence) {
		const { Icon } = getSequenceTypeTheme(teaseRecording.sequence.contentType);
		sequenceLine = (
			<div className={styles.series} aria-label="series">
				<Icon width={13} height={13} />
				{teaseRecording.sequence.contentType === SequenceContentType.BibleBook
					? teaseRecording.collection?.title
					: teaseRecording.sequence.title}
			</div>
		);
	}

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
			<div ref={titleOverlayRef}>
				{player?.isFullscreen() && (
					<div className={styles.titleOverlayBox}>
						<div className={styles.titleOverlayContent}>
							<div className={styles.sequenceType}>{sequenceLine}</div>
							<div className={styles.partInfo}>
								<FormattedMessage
									id="andMiniplayer__partOfPart"
									defaultMessage="Part {index} of {total}"
									values={{
										index: teaseRecording?.sequenceIndex,
										total: teaseRecording?.sequence?.recordings?.nodes?.length,
									}}
								/>
							</div>
							<div className={styles.titleText}>{teaseRecording?.title}</div>
							<div className={styles.authorBox}>
								<div className={styles.authorAvatar}>
									<Image
										src={teaseRecording?.speakers[0]?.imageWithFallback?.url}
										alt="speaker-avatar"
										width={30}
										height={30}
									/>
								</div>
								<div className={styles.authorText}>
									{teaseRecording?.speakers[0]?.name}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			<div ref={videoOverlayRef}>
				{player?.isFullscreen() && <LazyMiniplayerOverlay />}
			</div>
			<LazyMiniplayer />
		</>
	);
}
