import Image from 'next/image';
import React, { CSSProperties } from 'react';
import { useIntl } from 'react-intl';

import ButtonNudge from '@components/molecules/buttonNudge';
import ButtonPlay from '@components/molecules/buttonPlay';
import ButtonSpeed from '@components/molecules/buttonSpeed';
import { PlayerFragment } from '@lib/generated/graphql';
import hasVideo from '@lib/hasVideo';
import usePlaybackSession from '@lib/usePlaybackSession';

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
		<div
			data-testid={recording.id}
			aria-label={intl.formatMessage({
				id: 'player__playerLabel',
				defaultMessage: 'player',
				description: 'player label',
			})}
		>
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
					<ButtonPlay recording={recording} />
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
				<ButtonNudge recording={recording} reverse={true} />
				<ButtonNudge recording={recording} />
				<ButtonSpeed recording={recording} />
			</div>
		</div>
	);
};

export default Player;
