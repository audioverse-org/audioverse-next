import React, { useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BaseColors } from '~lib/constants';
import SuccessIcon from '~public/img/icons/icon-success-light.svg';
import IconPlay from '~public/img/icons/play-circle.svg';
import usePlaybackSession, {
	PlaySource,
} from '~src/lib/hooks/usePlaybackSession';
import { useFormattedDuration } from '~src/lib/time';

import Heading6 from '../atoms/heading6';
import PlayProgress from '../atoms/playProgress';
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
	const successColor = isDarkTheme ? BaseColors.WHITE : BaseColors.DARK;
	const formattedDuration = useFormattedDuration(session.duration);
	const remainingDuration = useFormattedDuration(
		session.duration * (1 - session.progress),
	);
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
				{session.progress ? (
					<PlayProgress
						isPlaying={session.isPlaying}
						inactiveColor={iconColor}
						progressPercentage={session.progress}
						bufferedProgress={session.bufferedProgress}
						isCurrentTrack={isCurrentTrack}
					/>
				) : (
					<IconPlay color={iconColor} />
				)}
			</button>

			<Heading6 large className={styles.duration}>
				{session.progress > 0 && session.progress < 1 ? (
					<FormattedMessage
						id="timeLeft"
						defaultMessage="{time} left"
						values={{ time: remainingDuration }}
					/>
				) : (
					formattedDuration
				)}
			</Heading6>
			{session.progress >= 1 && (
				<SuccessIcon
					className={styles.successIcon}
					style={{ color: successColor }}
				/>
			)}
		</div>
	);
};

export default PlayButton;
