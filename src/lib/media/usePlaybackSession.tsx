import { useContext, useEffect, useState } from 'react';

import {
	AndMiniplayerFragment,
	useGetRecordingPlaybackProgressQuery,
} from '~components/templates/__generated__/andMiniplayer';
import {
	PlaybackContext,
	PlaybackContextType,
} from '~components/templates/andPlaybackContext';
import { shouldLoadRecordingPlaybackProgress } from '~src/lib/media/shouldLoadRecordingPlaybackProgress';

import useIsPaused from './useIsPaused';
import useIsShowingVideo from './useIsShowingVideo';
import usePlayerRecording from './usePlayerRecording';
import usePlayerSources from './usePlayerSources';
import usePrefersAudio from './usePrefersAudio';

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
	const { recording: loadedRecording } = usePlayerRecording();
	const isLoaded =
		!!recording && !!loadedRecording && loadedRecording.id === recording.id;
	const { prefersAudio, setPrefersAudio: _setPrefersAudio } = usePrefersAudio();
	const isShowingVideo = useIsShowingVideo({
		recording,
		prefersAudio,
	});
	const isAudioLoaded = isLoaded && !isShowingVideo;
	const isVideoLoaded = isLoaded && isShowingVideo;

	const { sources } = usePlayerSources();

	const duration = isLoaded
		? context.getDuration()
		: (recording && (sources[0]?.duration || recording?.duration)) || 0;
	const [_progress, _setProgress] = useState<number>(0);
	const progress = isLoaded ? context.getProgress() : _progress;
	const bufferedProgress = isLoaded ? context.getBufferedProgress() : 0;
	const time = isLoaded ? context.getTime() : duration * progress;
	const { isPaused: _isPaused, setIsPaused } = useIsPaused();
	const isPaused = !isLoaded || _isPaused;
	const isPlaying = isLoaded && !_isPaused;

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
				prefersAudio,
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
		setIsPaused(true);
	}

	function play(source?: PlaySource) {
		afterLoad(() => {
			setIsPaused(false);
		}, source);
	}

	function setPrefersAudio(prefersAudio: boolean) {
		if (!recording) return;

		if (isLoaded) {
			_setPrefersAudio(prefersAudio);
		}

		context.loadRecording(recording, recording.id, {
			prefersAudio,
		});
	}

	function requestFullscreen() {
		afterLoad((c) => c.player()?.requestFullscreen());
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
	};
}
