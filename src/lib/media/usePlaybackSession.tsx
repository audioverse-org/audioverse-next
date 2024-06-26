import React, { useContext, useEffect, useRef, useState } from 'react';

import {
	AndMiniplayerFragment,
	useGetRecordingPlaybackProgressQuery,
} from '~components/templates/__generated__/andMiniplayer';
import {
	PlaybackContext,
	PlaybackContextType,
} from '~components/templates/andPlaybackContext';
import { shouldLoadRecordingPlaybackProgress } from '~src/lib/media/shouldLoadRecordingPlaybackProgress';

import useIsShowingVideo from './useIsShowingVideo';
import usePlayerSources from './usePlayerSources';

export enum PlaySource {
	Tease = 'Tease',
	Other = 'Other',
}

interface PlaybackSessionInfo {
	shiftTime: (delta: number) => void;
	setProgress: (percent: number) => void;
	pause: () => void;
	play: (source?: PlaySource) => void;
	chromecastTrigger: () => void;
	airPlayTrigger: () => void;
	requestFullscreen: () => void;
	setPrefersAudio: (prefersAudio: boolean) => void;
	setSpeed: (speed: number) => void;
	isLoaded: boolean;
	progress: number;
	bufferedProgress: number;
	prefersAudio: boolean;
	isAudioLoaded: boolean;
	isVideoLoaded: boolean;
	isPaused: boolean;
	isPlaying: boolean;
	speed: number;
	time: number;
	duration: number;
	getVideo: () => JSX.Element;
}

export default function usePlaybackSession(
	recording: AndMiniplayerFragment | null,
	options: {
		playlistRecordings?: AndMiniplayerFragment[];
		prefersAudio?: boolean;
	} = {}
): PlaybackSessionInfo {
	const { playlistRecordings } = options;
	const context = useContext(PlaybackContext);
	const loadedRecording = context.getRecording();
	const isLoaded =
		!!recording && !!loadedRecording && loadedRecording.id === recording.id;
	const prefersAudio = context.getPrefersAudio();
	const isShowingVideo = useIsShowingVideo({
		recording,
		prefersAudio,
	});
	const isAudioLoaded = isLoaded && !isShowingVideo;
	const isVideoLoaded = isLoaded && isShowingVideo;
	const speed = context.getSpeed();

	const { getSources } = usePlayerSources({
		recording,
		prefersAudio,
	});

	const duration = isLoaded
		? context.getDuration()
		: (recording && (getSources()[0]?.duration || recording?.duration)) || 0;
	const [_progress, _setProgress] = useState<number>(0);
	const progress = isLoaded ? context.getProgress() : _progress;
	const bufferedProgress = isLoaded ? context.getBufferedProgress() : 0;
	const time = isLoaded ? context.getTime() : duration * progress;
	const [, setSpeedFingerprint] = useState<number>(speed);
	const isPaused = !isLoaded || context.paused();
	const isPlaying = isLoaded && !context.paused();
	const [isPortalActive, setIsPortalActive] = useState<boolean>(false);
	const portalContainerRef = useRef<HTMLDivElement>(null);
	const [video] = useState<JSX.Element>(
		<div ref={portalContainerRef} data-testid="portal" />
	);

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
			console.log('unset video handler', {
				isPortalActive,
				recording: !!recording,
			});
			context.unsetVideoHandler(recording.id);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	function afterLoad(
		func: (c: PlaybackContextType) => void,
		source?: PlaySource
	) {
		if (!recording) return;

		if (isLoaded) {
			func(context);
			return;
		}

		context.loadRecording(
			playlistRecordings || recording,
			recording.id,
			{
				onLoad: (c: PlaybackContextType) => {
					func(c);
				},
				prefersAudio: options.prefersAudio,
			},
			source
		);
	}

	function shiftTime(delta: number) {
		afterLoad((c) => {
			c.setTime(c.getTime() + delta);
		});
	}

	function setProgress(percentage: number) {
		afterLoad((c) => c.setProgress({ percentage, recordingId: recording?.id }));
	}

	function pause() {
		// TODO: Maybe only if `isLoaded` is true
		// Or perhaps throw an exception, since the user should never be presented
		// with a pause button for a recording that isn't loaded.
		context.pause();
	}

	function play(source?: PlaySource) {
		afterLoad((c) => {
			c.play();
		}, source);
	}

	function setPrefersAudio(prefersAudio: boolean) {
		if (!recording) return;

		if (isLoaded) {
			context.setPrefersAudio(prefersAudio);
		}

		context.loadRecording(recording, recording.id, {
			prefersAudio,
		});
	}

	function setSpeed(speed: number) {
		afterLoad((c) => c.setSpeed(speed));
		setSpeedFingerprint(speed);
	}

	function requestFullscreen() {
		afterLoad((c) => c.requestFullscreen());
	}

	function getVideo() {
		if (!isPortalActive) setIsPortalActive(true);
		return video;
	}

	function chromecastTrigger() {
		afterLoad((c) => c.player()?.trigger('chromecastRequested'));
	}

	function airPlayTrigger() {
		afterLoad((c) => c.player()?.trigger('airPlayRequested'));
	}

	return {
		shiftTime,
		setProgress,
		pause,
		play,
		setPrefersAudio,
		setSpeed,
		requestFullscreen,
		chromecastTrigger,
		airPlayTrigger,
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
		speed,
	};
}
