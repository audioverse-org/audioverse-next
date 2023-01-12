import throttle from 'lodash/throttle';
import Script from 'next/script';
import React, {
	MutableRefObject,
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useReducer,
	useRef,
	useState,
} from 'react';
import { useMutation, useQueryClient } from 'react-query';
import type { VideoJsPlayer } from 'video.js';
import type * as VideoJs from 'video.js';

import { getSessionToken } from '@lib/cookies';
import {
	AndMiniplayerFragment,
	GetRecordingPlaybackProgressQuery,
	recordingPlaybackProgressSet,
	RecordingPlaybackProgressSetMutationVariables,
	Scalars,
} from '@lib/generated/graphql';
import { initialState, reducer } from './andPlaybackContext.reducer';

// Source:
// https://github.com/vercel/next.js/blob/canary/examples/with-videojs/components/Player.js

// If this solution becomes unviable, for instance, due to needing to
// update more props than just sources, this alternative approach may work:
// https://github.com/videojs/video.js/issues/4970#issuecomment-520591504

interface Playable extends VideoJs.default.Tech.SourceObject {
	duration: number;
	logUrl?: string | null;
}

const getFiles = (
	recording: AndMiniplayerFragment,
	prefersAudio: boolean
):
	| AndMiniplayerFragment['audioFiles']
	| AndMiniplayerFragment['videoFiles']
	| AndMiniplayerFragment['videoStreams'] => {
	if (!recording) return [];

	const { videoStreams = [], videoFiles = [], audioFiles = [] } = recording;

	if (prefersAudio) return audioFiles;
	if (videoStreams.length > 0) return videoStreams;
	if (videoFiles.length > 0) return videoFiles;

	return audioFiles;
};

export const getSources = (
	recording: AndMiniplayerFragment,
	prefersAudio: boolean
): Playable[] => {
	const files = getFiles(recording, prefersAudio) || [];

	return files.map((f) => ({
		src: f.url,
		type: f.mimeType,
		duration: f.duration,
		logUrl: 'logUrl' in f ? f.logUrl : undefined,
	}));
};

export const shouldLoadRecordingPlaybackProgress = (
	recording: AndMiniplayerFragment | null | undefined
) =>
	!!recording?.id &&
	!(recording.id + '').includes('/') && // Bible ids
	!!getSessionToken();

export type PlaybackContextType = {
	player: () => VideoJsPlayer | undefined; // TODO: remove this in favor of single-purpose methods
	play: () => void;
	chromecastTrigger: () => void;
	airPlayTrigger: () => void;
	pause: () => void;
	paused: () => boolean;
	getTime: () => number;
	setTime: (t: number) => void;
	setPrefersAudio: (prefersAudio: boolean) => void;
	getPrefersAudio: () => boolean;
	getProgress: () => number;
	getBufferedProgress: () => number;
	setProgress: (p: number, updatePlayer?: boolean) => void;
	getRecording: () => AndMiniplayerFragment | undefined;
	loadRecording: (
		recordingOrRecordings: AndMiniplayerFragment | AndMiniplayerFragment[],
		options?: {
			onLoad?: (c: PlaybackContextType) => void;
			prefersAudio?: boolean;
		}
	) => void;
	setVideoHandler: (id: Scalars['ID'], handler: (el: Element) => void) => void;
	unsetVideoHandler: (id: Scalars['ID']) => void;
	hasPlayer: () => boolean;
	supportsFullscreen: () => boolean;
	isShowingVideo: () => boolean;
	getVideoLocation: () => 'miniplayer' | 'portal' | undefined;
	getVolume: () => number;
	setVolume: (v: number) => void;
	setSpeed: (s: number) => void;
	getSpeed: () => number;
	getDuration: () => number;
	requestFullscreen: () => void;
	advanceRecording: () => void;
	setIsPaused: (paused: boolean) => void;
	getRefs: () => {
		origin?: MutableRefObject<HTMLDivElement | null>;
		video?: MutableRefObject<HTMLDivElement | null>;
		videoEl?: MutableRefObject<HTMLVideoElement | null>;
	};
	_setRecording: (
		recording: AndMiniplayerFragment,
		prefersAudio?: boolean
	) => void;
};

export const PlaybackContext = React.createContext<PlaybackContextType>({
	player: () => undefined,
	play: () => undefined,
	pause: () => undefined,
	paused: () => true,
	getTime: () => 0,
	setTime: () => undefined,
	setPrefersAudio: () => undefined,
	getPrefersAudio: () => false,
	getProgress: () => 0,
	getBufferedProgress: () => 0,
	setProgress: () => undefined,
	supportsFullscreen: () => false,
	loadRecording: () => undefined,
	setVideoHandler: () => undefined,
	unsetVideoHandler: () => undefined,
	hasPlayer: () => false,
	isShowingVideo: () => false,
	getVideoLocation: () => undefined,
	getRecording: () => undefined,
	getVolume: () => 100,
	setVolume: () => undefined,
	setSpeed: () => undefined,
	getSpeed: () => 1,
	getDuration: () => 0,
	requestFullscreen: () => undefined,
	advanceRecording: () => undefined,
	setIsPaused: () => undefined,
	getRefs: () => ({}),
	_setRecording: () => undefined,
	chromecastTrigger: () => undefined,
	airPlayTrigger: () => undefined,
});

interface AndMiniplayerProps {
	children: ReactNode;
}

const SERVER_UPDATE_WAIT_TIME = 5 * 1000;

export default function AndPlaybackContext({
	children,
}: AndMiniplayerProps): JSX.Element {
	const [state, dispatch] = useReducer(reducer, initialState);

	// Refs
	const videoRef = useRef<HTMLDivElement>(null);
	const videoElRef = useRef<HTMLVideoElement>(null);
	const originRef = useRef<HTMLDivElement>(null);
	const onLoadRef = useRef<(c: PlaybackContextType) => void>();
	const progressRef = useRef<number>(0);
	const videoHandlerIdRef = useRef<Scalars['ID']>();
	const sourcesRef = useRef<Playable[]>([]);
	const recordingRef = useRef<AndMiniplayerFragment>();

	// Punted Refs
	const playerRef = useRef<VideoJsPlayer>();

	// Computed
	const playerBufferedEnd = playerRef.current?.bufferedEnd();
	const duration =
		sourcesRef.current[0]?.duration || state.recording?.duration || 0;

	const queryClient = useQueryClient();

	const { mutate: updateProgress } = useMutation(
		({
			percentage,
		}: Pick<RecordingPlaybackProgressSetMutationVariables, 'percentage'>) => {
			if (!getSessionToken() || !state.recording) {
				return Promise.resolve() as Promise<unknown>;
			}
			return recordingPlaybackProgressSet({
				id: state.recording.id,
				percentage,
			});
		}
	);

	useEffect(() => {
		if (!state.recording) return;
		sourcesRef.current = getSources(state.recording, state.prefersAudio);
	}, [state.recording, state.prefersAudio]);

	useEffect(() => {
		let newBufferedProgress = +Math.max(
			state.bufferedProgress, // Don't ever reduce the buffered amount
			state.progress, // We've always buffered as much as we're playing
			(playerBufferedEnd || 0) / duration // Actually compute current buffered progress
		).toFixed(2);
		if (newBufferedProgress >= 0.99) newBufferedProgress = 1;
		dispatch({ type: 'SET_BUFFERED_PROGRESS', payload: newBufferedProgress });
	}, [state.bufferedProgress, playerBufferedEnd, state.progress, duration]);

	const throttledUpdateProgress = useMemo(
		() => throttle(updateProgress, SERVER_UPDATE_WAIT_TIME, { leading: true }),
		[updateProgress]
	);
	const setProgress = useCallback(
		(p: number) => {
			throttledUpdateProgress({
				percentage: p,
			});
			dispatch({ type: 'SET_PROGRESS', payload: p });
		},
		[throttledUpdateProgress]
	);

	useEffect(() => {
		progressRef.current = state.progress;
	}, [state.progress]);

	const playback: PlaybackContextType = {
		play: () => {
			playerRef.current?.play();
			dispatch({ type: 'PLAY' });
		},
		chromecastTrigger: () => playerRef.current?.trigger('chromecastRequested'),
		airPlayTrigger: () => playerRef.current?.trigger('airPlayRequested'),
		pause: () => {
			playerRef.current?.pause();
			dispatch({ type: 'PAUSE' });
		},
		player: () => playerRef.current,
		getTime: () =>
			(!onLoadRef.current && playerRef.current?.currentTime()) ||
			state.progress * playback.getDuration() ||
			0,
		setTime: (t: number) => {
			if (!playerRef.current) return;
			setProgress(t / playerRef.current.duration());
			playerRef.current.currentTime(t);
		},
		getDuration: () => {
			return (
				playerRef.current?.duration() ||
				sourcesRef.current[0]?.duration ||
				recordingRef.current?.duration ||
				0
			);
		},
		getBufferedProgress: () => state.bufferedProgress,
		setProgress: (p: number, updatePlayer = true) => {
			setProgress(p);
			const duration = playback.getDuration();
			if (!playerRef.current || !duration || isNaN(duration) || !updatePlayer)
				return;
			playerRef.current.currentTime(p * duration);
		},
		loadRecording: (
			recordingOrRecordings: AndMiniplayerFragment | AndMiniplayerFragment[],
			options = {}
		) => {
			const { onLoad, prefersAudio } = options;
			onLoadRef.current = onLoad;

			const recordingsArray = Array.isArray(recordingOrRecordings)
				? recordingOrRecordings
				: [recordingOrRecordings];
			dispatch({ type: 'SET_RECORDINGS', payload: recordingsArray });
			const newRecording = recordingsArray[0];

			recordingRef.current = newRecording;
			if (typeof prefersAudio === 'boolean') {
				dispatch({ type: 'SET_PREFERS_AUDIO', payload: prefersAudio });
			}
			if (state.videoHandlerId && newRecording.id !== state.videoHandlerId) {
				playback.unsetVideoHandler(state.videoHandlerId);
			}

			playback._setRecording(newRecording, prefersAudio);
		},
		setVideoHandler: (id: Scalars['ID'], handler: (el: Element) => void) => {
			videoHandlerIdRef.current = id;
			dispatch({
				type: 'SET_VIDEO_HANDLER',
				payload: {
					id,
					handler,
				},
			});
		},
		unsetVideoHandler: (id: Scalars['ID']) => {
			if (id !== videoHandlerIdRef.current) return;
			dispatch({ type: 'SET_VIDEO_HANDLER', payload: undefined });
		},
		hasPlayer: () => !!playerRef.current,
		supportsFullscreen: () => playerRef.current?.supportsFullScreen() || false,
		getVolume: () => (playerRef.current?.volume() ?? 1) * 100,
		setVolume: (volume: number) => {
			dispatch({ type: 'SET_VOLUME', payload: volume });
			playerRef.current?.volume(volume / 100);
		},
		getSpeed: () => state.speed,
		setSpeed: (s: number) => {
			playerRef.current?.playbackRate(s);
			playerRef.current?.defaultPlaybackRate(s);
			dispatch({ type: 'SET_SPEED', payload: s });
		},
		requestFullscreen: () => playerRef.current?.requestFullscreen(),
		advanceRecording: () => {
			if (state.sourceRecordings.length > 1) {
				dispatch({ type: 'ADVANCE' });
				onLoadRef.current = () => playback.play();
				playback._setRecording(state.sourceRecordings[1], state.prefersAudio);
			}
		},
		getRefs: () => ({
			origin: originRef,
			video: videoRef,
			videoEl: videoElRef,
		}),
		_setRecording: (
			recording: AndMiniplayerFragment,
			prefersAudio: boolean | undefined
		) => {
			const currentVideoEl = videoElRef.current;
			if (!currentVideoEl) return;

			const sources = getSources(recording, prefersAudio || false);
			sourcesRef.current = sources;

			const resetPlayer = () => {
				const logUrl = sources.find((s) => s.logUrl)?.logUrl;
				if (logUrl) {
					fetch(logUrl, {
						method: 'HEAD',
						mode: 'no-cors',
					}).catch(() => {
						// We don't want Promise rejections here to clutter the console
					});
				}

				dispatch({ type: 'PAUSE' });

				const serverProgress =
					queryClient.getQueryData<GetRecordingPlaybackProgressQuery>([
						'getRecordingPlaybackProgress',
						{ id: recording.id },
					]);

				const progress =
					serverProgress?.recording?.viewerPlaybackSession
						?.positionPercentage || 0;

				dispatch({ type: 'SET_PROGRESS', payload: progress });
				dispatch({ type: 'SET_BUFFERED_PROGRESS', payload: 0 });

				playerRef.current?.currentTime(progress * playback.getDuration());

				onLoadRef.current && onLoadRef.current(playback);
				onLoadRef.current = undefined;
			};

			const options: VideoJs.VideoJsPlayerOptions = {
				poster: '/img/poster.jpg',
				controls: false,
				preload: 'auto',
				defaultVolume: 1,
				sources,
				techOrder: ['chromecast', 'html5'],
				plugins: {
					chromecast: {
						addButtonToControlBar: true, // Use custom designed button
					},
					airPlay: {
						addButtonToControlBar: true, // Use custom designed button
					},
				},
			};

			if (playerRef.current) {
				playerRef.current.src(sources);
				resetPlayer();
			} else {
				state.videojs.then(async (v) => {
					(await state.airplay).default(v.default);
					(await state.chromecast).default(v.default, {
						preloadWebComponents: true,
					});
					const p = v.default(currentVideoEl, options);
					p.on('fullscreenchange', () => {
						p.controls(p.isFullscreen());
					});
					playerRef.current = p;
					resetPlayer();
				});
			}
		},

		// DONE
		isShowingVideo: () => state.isShowingVideo,
		getVideoLocation: () => state.videoLocation,
		setIsPaused: (paused) => dispatch({ type: paused ? 'PAUSE' : 'PLAY' }),
		getRecording: () => state.recording,
		setPrefersAudio: (prefersAudio: boolean) =>
			dispatch({ type: 'SET_PREFERS_AUDIO', payload: prefersAudio }),
		getPrefersAudio: () => state.prefersAudio,
		paused: () => state.paused,
		getProgress: () => state.progress,
	};

	useEffect(() => {
		const video = videoRef.current;

		if (!video) return;

		if (state.videoHandler) {
			// Move the video on the next tick to avoid FOPV (flash-of-previous-video ;))
			setTimeout(() => state.videoHandler?.(video), 0);
			return;
		}

		const destination = state.isShowingVideo
			? document.getElementById('mini-player')
			: originRef.current;

		if (destination && destination !== video.parentElement) {
			destination.appendChild(video);
		}
	}, [state.videoHandlerId, state.videoHandler, state.isShowingVideo]);

	return (
		<>
			<Script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
			<PlaybackContext.Provider value={playback}>
				{children}
			</PlaybackContext.Provider>
		</>
	);
}
