import React, { useContext, useEffect, useRef, useState } from 'react';

import {
	getSources,
	PlaybackContext,
	shouldLoadRecordingPlaybackProgress,
} from '@components/templates/andPlaybackContext';
import {
	AndMiniplayerFragment,
	useGetRecordingPlaybackProgressQuery,
} from '@components/templates/__generated__/andMiniplayer';
import useWithRecording from '@lib/api/hooks/useWithRecording';

interface PlaybackSessionInfo {
	shiftTime: (delta: number) => void;
	setProgress: (percent: number) => void;
	pause: () => void;
	play: () => void;
	requestFullscreen: () => void;
	setPrefersAudio: (prefersAudio: boolean) => void;
	isLoaded: boolean;
	progress: number;
	bufferedProgress: number;
	prefersAudio: boolean;
	isAudioLoaded: boolean;
	isVideoLoaded: boolean;
	isPaused: boolean;
	isPlaying: boolean;
	time: number;
	duration: number;
	getVideo: () => JSX.Element;
	supportsFullscreen: boolean;
}

export default function usePlaybackSession(
	recording: AndMiniplayerFragment | null,
	options: {
		playlistRecordings?: AndMiniplayerFragment[];
		prefersAudio?: boolean;
	} = {}
): PlaybackSessionInfo {
	const context = useContext(PlaybackContext);
	const loadedRecording = context.getRecording();
	const isLoaded =
		!!recording && !!loadedRecording && loadedRecording.id === recording.id;
	const isAudioLoaded = isLoaded && !context.isShowingVideo();
	const isVideoLoaded = isLoaded && context.isShowingVideo();
	const prefersAudio = context.getPrefersAudio();
	const supportsFullscreen = context.supportsFullscreen();
	const duration = isLoaded
		? context.getDuration()
		: (recording &&
				(getSources(recording, false)[0]?.duration || recording?.duration)) ||
		  0;
	const [_progress, _setProgress] = useState<number>(0);
	const progress = isLoaded ? context.getProgress() : _progress;
	const bufferedProgress = isLoaded ? context.getBufferedProgress() : 0;
	const time = isLoaded ? context.getTime() : duration * progress;
	const isPaused = !isLoaded || context.paused();
	const isPlaying = isLoaded && !context.paused();
	const [isPortalActive, setIsPortalActive] = useState<boolean>(false);
	const portalContainerRef = useRef<HTMLDivElement>(null);
	const [video] = useState<JSX.Element>(
		<div ref={portalContainerRef} data-testid="portal" />
	);

	const withRecording = useWithRecording(recording, options);

	const shouldLoadPlaybackProgress =
		shouldLoadRecordingPlaybackProgress(recording);
	const { data, isLoading, refetch } = useGetRecordingPlaybackProgressQuery(
		{
			id: recording?.id || 0,
		},
		{
			enabled: shouldLoadPlaybackProgress,
		}
	);
	useEffect(() => {
		if (data?.recording?.viewerPlaybackSession) {
			_setProgress(data?.recording?.viewerPlaybackSession.positionPercentage);
		}
	}, [data, isLoading]);
	useEffect(() => {
		if (!isLoaded && shouldLoadPlaybackProgress) {
			refetch();
		}
	}, [isLoaded, shouldLoadPlaybackProgress, refetch]);

	useEffect(() => {
		if (!recording || !isLoaded || !isPortalActive) return;

		context.setVideoHandler(recording.id, (el) => {
			if (!el) return;
			portalContainerRef.current?.appendChild(el);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recording, isLoaded, isPortalActive]);

	useEffect(
		() => () => {
			if (!isPortalActive || !recording) return;
			// TODO: provide recording ID when unloading?
			context.unsetVideoHandler(recording.id);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	function shiftTime(delta: number) {
		withRecording((c) => {
			c.setTime(c.getTime() + delta);
		});
	}

	function setProgress(percent: number) {
		withRecording((c) => c.setProgress(percent));
	}

	function pause() {
		// TODO: Maybe only if `isLoaded` is true
		// Or perhaps throw an exception, since the user should never be presented
		// with a pause button for a recording that isn't loaded.
		context.pause();
	}

	function play() {
		withRecording((c) => c.play());
	}

	function setPrefersAudio(prefersAudio: boolean) {
		if (!recording) return;

		if (isLoaded) {
			context.setPrefersAudio(prefersAudio);
		}

		context.loadRecording(recording, {
			prefersAudio,
		});
	}

	function requestFullscreen() {
		withRecording((c) => c.requestFullscreen());
	}

	function getVideo() {
		if (!isPortalActive) setIsPortalActive(true);
		return video;
	}

	return {
		shiftTime,
		setProgress,
		pause,
		play,
		setPrefersAudio,
		requestFullscreen,
		isLoaded,
		progress,
		bufferedProgress,
		time,
		duration,
		isAudioLoaded,
		isVideoLoaded,
		isPaused,
		isPlaying,
		prefersAudio,
		getVideo,
		supportsFullscreen,
	};
}
