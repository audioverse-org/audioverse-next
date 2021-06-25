import { useContext } from 'react';

import {
	PlaybackContext,
	PlaybackContextType,
} from '@components/templates/andMiniplayer';
import { AndMiniplayerFragment } from '@lib/generated/graphql';

interface PlaybackSessionInfo {
	shiftTime: (delta: number) => void;
	setProgress: (percent: number) => void;
	pause: () => void;
	play: () => void;
	setPrefersAudio: (prefersAudio: boolean) => void;
	isLoaded: boolean;
	progress: number;
	isAudioLoaded: boolean;
	isPaused: boolean;
}

export default function usePlaybackSession(
	recording: AndMiniplayerFragment
): PlaybackSessionInfo {
	const context = useContext(PlaybackContext);
	const loadedRecording = context.getRecording();
	const isLoaded = !!loadedRecording && loadedRecording.id === recording.id;
	const progress = isLoaded ? context.getProgress() : 0;
	const isAudioLoaded = isLoaded && !context.isShowingVideo();
	const isPaused = !isLoaded || context.paused();

	// TODO: What should function be named? `withContext`?
	function act(func: (c: PlaybackContextType) => void) {
		if (isLoaded) {
			func(context);
			return;
		}

		context.load(recording, (c: PlaybackContextType) => {
			func(c);
		});
	}

	function shiftTime(delta: number) {
		act((c) => {
			c.setTime(c.getTime() + delta);
		});
	}

	function setProgress(percent: number) {
		act((c) => c.setProgress(percent));
	}

	function pause() {
		// TODO: Maybe only if `isLoaded` is true
		context.pause();
	}

	function play() {
		act((c) => c.play());
	}

	function setPrefersAudio(prefersAudio: boolean) {
		act((c) => c.setPrefersAudio(prefersAudio));
	}

	// TODO: Consider not returning isLoaded
	return {
		shiftTime,
		setProgress,
		pause,
		play,
		setPrefersAudio,
		isLoaded,
		progress,
		isAudioLoaded,
		isPaused,
	};
}
