import React, { ReactNode, useEffect, useState } from 'react';
import videojs, { VideoJsPlayer } from 'video.js';

import { AndMiniplayerFragment } from '@lib/generated/graphql';

export type PlaybackContextType = {
	play: () => void;
	load: (recording: AndMiniplayerFragment) => void;
	hasPlayer: () => boolean;
};

export const PlaybackContext = React.createContext<PlaybackContextType>({
	play: () => undefined,
	load: () => undefined,
	hasPlayer: () => false,
});

interface AndMiniplayerProps {
	children: ReactNode;
}

export default function AndMiniplayer({
	children,
}: AndMiniplayerProps): JSX.Element {
	const [player, setPlayer] = useState<VideoJsPlayer>();
	const [videoEl] = useState(); // setVideoEl
	const [recording, setRecording] = useState<AndMiniplayerFragment>();

	const options = {};

	useEffect(() => {
		setPlayer(videojs(videoEl, options));
	}, [videoEl, options]);

	const playbackContext = {
		play: () => player?.play(),
		load: setRecording,
		hasPlayer: () => !!player,
	};

	return (
		<>
			<PlaybackContext.Provider value={playbackContext}>
				{children}
			</PlaybackContext.Provider>
			<div>{recording?.title}</div>
		</>
	);
}
