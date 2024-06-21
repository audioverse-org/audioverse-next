import React from 'react';

import { BaseColors } from '~lib/constants';

import PlayProgress from '../atoms/playProgress';

type PlayButtonCurrentProps = {
  isPlaying: boolean;
  isLoading: boolean;
  isCurrentTrack: boolean;
  position: number;
  iconActiveColor: BaseColors;
  trackColor: BaseColors;
};

const PlayButtonCurrentLockup: React.FC<PlayButtonCurrentProps> = ({
  isPlaying,
  isLoading,
  isCurrentTrack,
  position,
  iconActiveColor,
  trackColor,
}) => {

  return (
    <PlayProgress
      isPlaying={isPlaying && isCurrentTrack}
      progressPercentage={position}
      activeColor={trackColor}
      inactiveColor={iconActiveColor}
      isCurrentTrack={isCurrentTrack}
      isLoading={isLoading}
    />
  );
};

export default PlayButtonCurrentLockup;
