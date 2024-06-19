import React, { useContext } from 'react';
import { useIntl } from 'react-intl';

import { BaseColors } from '~lib/constants';
import usePlaybackSession, { PlaySource } from '~lib/usePlaybackSession';
import IconPlay from '~public/img/icons/play-circle.svg';

import PlayProgress from '../atoms/playProgress';
import { AndMiniplayerFragment } from '../templates/__generated__/andMiniplayer';
import { PlaybackContext } from '../templates/andPlaybackContext';
import { TeaseRecordingFragment } from './__generated__/teaseRecording';
import styles from './buttonPlayCircle.module.scss';

type PlayButtonProps = {
	recording: TeaseRecordingFragment;
	playlistRecordings?: AndMiniplayerFragment[];
	isDarkTheme: boolean;
	//backgroundColor: BaseColors;
};

type PlayButtonCurrentProps = {
	isPlaying: boolean;
	isPaused: boolean;
	isCurrentTrack: boolean;
	duration: number;
	positionPercentage: number;
	iconActiveColor: BaseColors;
	trackColor: BaseColors;
};

const PlayButtonCurrentLockup: React.FC<PlayButtonCurrentProps> = ({
	isPlaying,
	isPaused,
	isCurrentTrack,
	duration,
	positionPercentage,
	iconActiveColor,
	trackColor,
}) => {
	//const context = useContext(PlaybackContext);
	//const trackProgress = context.getProgress();
	const progress =
		isCurrentTrack && (isPlaying || isPaused) && positionPercentage > 0
			? (positionPercentage * 900) / duration
			: positionPercentage;

	return (
		<PlayProgress
			isPlaying={isPlaying && isCurrentTrack}
			progressPercentage={progress}
			activeColor={trackColor}
			inactiveColor={iconActiveColor}
			isCurrentTrack={isCurrentTrack}
		/>
	);
};

const PlayButton: React.FC<PlayButtonProps> = ({
	recording,
	playlistRecordings,
	isDarkTheme,
}) => {
	const session = usePlaybackSession(recording, { playlistRecordings });
	const context = useContext(PlaybackContext);
	const currentTrack = context.getRecording();
	const isCurrentTrack = currentTrack?.id === recording.id;
	const intl = useIntl();

	const handlePlayClick = () => {
		session.isPlaying ? session.pause() : session.play(PlaySource.Tease);
	};

	return (
		<button
			onClick={(e) => {
				e.preventDefault();
				handlePlayClick();
			}}
			className={styles.play}
			aria-label={intl.formatMessage({
				id: 'playButton__playLabel',
				defaultMessage: 'play',
				description: 'play button play label',
			})}
		>
			{isCurrentTrack ? (
				<>
					{console.log('current track')}
					<PlayButtonCurrentLockup
						isPlaying={session.isPlaying}
						isPaused={session.isPaused}
						duration={session.duration}
						positionPercentage={session.progress}
						iconActiveColor={BaseColors.RED}
						trackColor={BaseColors.WHITE}
						isCurrentTrack={true}
					/>
				</>
			) : (
				<>
					{console.log('not current track')}
					{session.progress && isCurrentTrack ? (
						<PlayProgress
							isPlaying={true}
							activeColor={BaseColors.DARK}
							inactiveColor={BaseColors.RED}
							progressPercentage={session.progress}
							isCurrentTrack={false}
						/>
					) : (
						<IconPlay color={isDarkTheme ? BaseColors.WHITE : BaseColors.RED} />
					)}
				</>
			)}
		</button>
	);
};

export default PlayButton;
