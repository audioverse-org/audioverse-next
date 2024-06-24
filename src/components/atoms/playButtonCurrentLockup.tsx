import React from 'react';

import { BaseColors } from '~lib/constants';

import PlayProgress from '../atoms/playProgress';

type PlayButtonCurrentProps = {
	isPlaying: boolean;
	isCurrentTrack: boolean;
	position: number;
	iconActiveColor: BaseColors;
	trackColor: BaseColors;
	bufferedProgress: number;
};

const PlayButtonCurrentLockup: React.FC<PlayButtonCurrentProps> = ({
	isPlaying,
	isCurrentTrack,
	position,
	iconActiveColor,
	trackColor,
	bufferedProgress,
}) => {
	return (
		<PlayProgress
			isPlaying={isPlaying && isCurrentTrack}
			progressPercentage={position}
			activeColor={trackColor}
			inactiveColor={iconActiveColor}
			isCurrentTrack={isCurrentTrack}
			bufferedProgress={bufferedProgress}
		/>
	);
};

export default PlayButtonCurrentLockup;
