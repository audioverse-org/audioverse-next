import React, { useContext, useEffect, useRef, useState } from 'react';

import {
	AndMiniplayerFragment,
	useGetRecordingExtraDataQuery,
	useGetRecordingPlaybackProgressQuery,
} from '~components/templates/__generated__/andMiniplayer';
import {
	getSources,
	PlaybackContext,
	PlaybackContextType,
	shouldLoadRecordingPlaybackProgress,
} from '~components/templates/andPlaybackContext';
import { analytics } from '~src/components/atoms/analytics';

import { useFormattedTime } from './time';

interface PlaybackSessionInfo {
	shiftTime: (delta: number) => void;
	setProgress: (percent: number) => void;
	pause: () => void;
	play: (playType?: string) => void;
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
	supportsFullscreen: boolean;
	trackPlay: () => void;
	trackPause: () => void;
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
	const isAudioLoaded = isLoaded && !context.isShowingVideo();
	const isVideoLoaded = isLoaded && context.isShowingVideo();
	const prefersAudio = context.getPrefersAudio();
	const supportsFullscreen = context.supportsFullscreen();
	const speed = context.getSpeed();
	const duration = isLoaded
		? context.getDuration()
		: (recording &&
				(getSources(recording, false)[0]?.duration || recording?.duration)) ||
		  0;
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

	const trackData = useGetRecordingExtraDataQuery({
		id: recording?.id || 0,
	});

	//here we have the play and paused tracking
	const thisTime = useFormattedTime(time);

	const trackPlay = (playType?: string) => {
		analytics.track('Play', {
			Id: recording?.id,
			title: recording?.title,
			Played_at: thisTime,
			Play_type: playType ? playType : 'Regular',
			media_type: {
				Audio: !context.isShowingVideo(),
				Video: context.isShowingVideo(),
			},
			sponsor_title: trackData.data?.recording?.sponsor?.title,
			series_title: recording?.sequence?.title,
			conference_title: recording?.collection?.title,
			Speakers: trackData.data?.recording?.speakers,
			publish_date: trackData.data?.recording?.publishDate,
			content_type: trackData.data?.recording?.contentType,
		});
	};

	const trackPause = () => {
		analytics.track('Pause', {
			Id: recording?.id,
			Recording: recording?.title,
			Paused_at: thisTime,
			media_type: {
				Audio: isAudioLoaded,
				Video: isVideoLoaded,
			},
		});
	};

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

	function afterLoad(func: (c: PlaybackContextType) => void) {
		if (!recording) return;

		if (isLoaded) {
			func(context);
			return;
		}

		context.loadRecording(playlistRecordings || recording, {
			onLoad: (c: PlaybackContextType) => {
				func(c);
			},
			prefersAudio: options.prefersAudio,
		});
	}

	function shiftTime(delta: number) {
		afterLoad((c) => {
			c.setTime(c.getTime() + delta);
		});
	}

	function setProgress(percent: number) {
		afterLoad((c) => c.setProgress(percent));
	}

	function pause() {
		// TODO: Maybe only if `isLoaded` is true
		// Or perhaps throw an exception, since the user should never be presented
		// with a pause button for a recording that isn't loaded.
		trackPause();
		context.pause();
	}

	function play(playType?: string) {
		afterLoad((c) => {
			c.play(), trackPlay(playType);
		});
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
		afterLoad((c) => c.chromecastTrigger());
	}

	function airPlayTrigger() {
		afterLoad((c) => c.airPlayTrigger());
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
		supportsFullscreen,
		trackPlay,
		trackPause,
	};
}
