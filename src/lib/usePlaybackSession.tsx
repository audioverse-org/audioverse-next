import React, { useContext, useEffect, useRef, useState } from 'react';

import { getSources, VjsContext } from '@components/templates/andVjs';
import { AndMiniplayerFragment } from '@components/templates/__generated__/andMiniplayer';
import useWithRecording from '@lib/hooks/useWithRecording';

interface PlaybackSessionInfo {
	shiftTime: (delta: number) => void;
	requestFullscreen: () => void;
	setPrefersAudio: (prefersAudio: boolean) => void;
	isLoaded: boolean;
	bufferedProgress: number;
	prefersAudio: boolean;
	isAudioLoaded: boolean;
	isVideoLoaded: boolean;
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
	const context = useContext(VjsContext);
	const loadedRecording = context?.getRecording();
	const isLoaded =
		!!recording && !!loadedRecording && loadedRecording.id === recording.id;
	const isAudioLoaded = isLoaded && !context?.isShowingVideo();
	const isVideoLoaded = isLoaded && !!context?.isShowingVideo();
	const prefersAudio = !!context?.getPrefersAudio();
	const supportsFullscreen = !!context?.supportsFullscreen();
	const duration = isLoaded
		? context?.getDuration() || 0
		: (recording &&
				(getSources(recording, false)[0]?.duration || recording?.duration)) ||
		  0;

	const bufferedProgress = isLoaded ? context?.getBufferedProgress() || 0 : 0;
	const time = isLoaded
		? context?.getTime() || 0
		: (duration || 0) * (context?.getProgress() || 0);
	const [isPortalActive, setIsPortalActive] = useState<boolean>(false);
	const portalContainerRef = useRef<HTMLDivElement>(null);
	const [video] = useState<JSX.Element>(
		<div ref={portalContainerRef} data-testid="portal" />
	);

	const withRecording = useWithRecording(recording, options);

	useEffect(() => {
		if (!recording || !isLoaded || !isPortalActive) return;

		context?.setVideoHandler(recording.id, (el) => {
			if (!el) return;
			portalContainerRef.current?.appendChild(el);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recording, isLoaded, isPortalActive]);

	useEffect(
		() => () => {
			if (!isPortalActive || !recording) return;
			// TODO: provide recording ID when unloading?
			context?.unsetVideoHandler(recording.id);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	function shiftTime(delta: number) {
		withRecording((c) => {
			c.setTime(c.getTime() + delta);
		});
	}

	function setPrefersAudio(prefersAudio: boolean) {
		if (!recording) return;

		if (isLoaded) {
			context?.setPrefersAudio(prefersAudio);
		}

		context?.loadRecording(recording, {
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
		setPrefersAudio,
		requestFullscreen,
		isLoaded,
		bufferedProgress,
		time,
		duration,
		isAudioLoaded,
		isVideoLoaded,
		prefersAudio,
		getVideo,
		supportsFullscreen,
	};
}
