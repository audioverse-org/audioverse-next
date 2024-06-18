import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { BaseColors } from '~lib/constants';
import usePlaybackSession, { PlaySource } from '~lib/usePlaybackSession';
import IconPlay from '~public/img/icons/play-circle.svg';

import PlayProgress from '../atoms/playProgress';
import { AndMiniplayerFragment } from '../templates/__generated__/andMiniplayer';
//import { PlaybackContext } from '../templates/andPlaybackContext';
import { TeaseRecordingFragment } from './__generated__/teaseRecording';
import styles from './buttonPlayCircle.module.scss';
import IconButton from './iconButton';

type PlayButtonProps = {
	recording: TeaseRecordingFragment;
	playlistRecordings?: AndMiniplayerFragment[];
	isDarkTheme: boolean;
	backgroundColor: BaseColors;
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
	const progress =
		isCurrentTrack && (isPlaying || isPaused) && positionPercentage > 0
			? (positionPercentage / duration) * 100
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
	backgroundColor,
}) => {
	const session = usePlaybackSession(recording, { playlistRecordings });
	const [isCurrentTrack, setIsCurrentTrack] = useState(session.isPlaying);
	const intl = useIntl();

	useEffect(() => {
		setIsCurrentTrack(session.isPlaying);
		console.log('session.isPlaying:', session.isPlaying);
	}, [session.isPlaying]);

	const handlePlayClick = () => {
		session.play(PlaySource.Tease);
		setIsCurrentTrack(true);
		console.log('Play button clicked');
	};

	return (
		<div className={styles.play}>
			{isCurrentTrack ? (
				<>
					{console.log('current track')}
					<PlayButtonCurrentLockup
						isPlaying={session.isPlaying}
						isPaused={session.isPaused}
						duration={session.duration}
						positionPercentage={session.progress}
						iconActiveColor={BaseColors.DARK}
						trackColor={BaseColors.RED}
						isCurrentTrack={true}
					/>
				</>
			) : (
				<>
					{console.log('not current track')}
					{session.progress ? (
						<PlayProgress
							isPlaying={true}
							activeColor={BaseColors.DARK}
							inactiveColor={BaseColors.RED}
							progressPercentage={session.progress}
							isCurrentTrack={false}
						/>
					) : (
						<IconButton
							Icon={IconPlay}
							onClick={(e) => {
								e.preventDefault();
								handlePlayClick;
							}}
							color={isDarkTheme ? BaseColors.WHITE : BaseColors.RED}
							backgroundColor={backgroundColor}
							aria-label={intl.formatMessage({
								id: 'playButton__playLabel',
								defaultMessage: 'play',
								description: 'play button play label',
							})}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default PlayButton;
