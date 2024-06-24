import React, { useContext } from 'react';
import { useIntl } from 'react-intl';

import { BaseColors } from '~lib/constants';
import usePlaybackSession, { PlaySource } from '~lib/usePlaybackSession';
import IconPlay from '~public/img/icons/play-circle.svg';

import PlayButtonCurrentLockup from '../atoms/playButtonCurrentLockup';
import PlayProgress from '../atoms/playProgress';
import PlayTime from '../atoms/playTime';
import { AndMiniplayerFragment } from '../templates/__generated__/andMiniplayer';
import { PlaybackContext } from '../templates/andPlaybackContext';
import { TeaseRecordingFragment } from './__generated__/teaseRecording';
import styles from './buttonPlayCircle.module.scss';

type PlayButtonProps = {
	recording: TeaseRecordingFragment;
	playlistRecordings?: AndMiniplayerFragment[];
	isDarkTheme: boolean;
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
	const iconColor = isDarkTheme ? BaseColors.SALMON : BaseColors.RED;
	const timeColor = isDarkTheme ? BaseColors.WHITE : BaseColors.DARK;
	const intl = useIntl();

	const handlePlayClick = () => {
		session.isPlaying ? session.pause() : session.play(PlaySource.Tease);
	};

	return (
		<div className={styles.rowUnpadded}>
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
						<PlayButtonCurrentLockup
							isPlaying={session.isPlaying}
							position={session.progress}
							iconActiveColor={iconColor}
							trackColor={BaseColors.WHITE}
							isCurrentTrack={true}
							bufferedProgress={session.bufferedProgress}
						/>
					</>
				) : (
					<>
						{session.progress ? (
							<PlayProgress
								isPlaying={false}
								activeColor={BaseColors.WHITE}
								inactiveColor={iconColor}
								progressPercentage={session.progress}
								isCurrentTrack={false}
							/>
						) : (
							<IconPlay color={iconColor} />
						)}
					</>
				)}
			</button>
			<PlayTime
				progress={session.progress}
				duration={session.duration}
				iconSecondaryColor={timeColor}
				textSecondaryColor={timeColor}
			/>
		</div>
	);
};

export default PlayButton;
