import Script from 'next/script';
import React, {
	MutableRefObject,
	ReactNode,
	useEffect,
	useReducer,
	useRef,
} from 'react';
import { useQueryClient } from 'react-query';
import type { VideoJsPlayer } from 'video.js';
import {
	AndMiniplayerFragment,
	GetRecordingPlaybackProgressQuery,
	Scalars,
} from '@lib/generated/graphql';
import { initialState, reducer } from './andPlaybackContext.reducer';
import getSources, { Playable } from '@lib/getSources';

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
		prefersAudio?: boolean,
		onLoad?: (c: PlaybackContextType) => void
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

export default function AndPlaybackContext({
	children,
}: AndMiniplayerProps): JSX.Element {
	const [state, dispatch] = useReducer(reducer, initialState);

	// HTML Refs
	const videoRef = useRef<HTMLDivElement>(null); // 2
	const videoElRef = useRef<HTMLVideoElement>(null); // 2
	const originRef = useRef<HTMLDivElement>(null); // 2

	// Refs
	const onLoadRef = useRef<(c: PlaybackContextType) => void>(); // 4
	const sourcesRef = useRef<Playable[]>([]); // 3

	// Punted Refs
	const videoHandlerIdRef = useRef<Scalars['ID']>(); // 2
	const playerRef = useRef<VideoJsPlayer>(); // 9

	// Computed
	const playerBufferedEnd = playerRef.current?.bufferedEnd();

	const queryClient = useQueryClient();

	useEffect(() => {
		if (!state.recording) return;
		const n = getSources(state.recording, state.prefersAudio);
		sourcesRef.current = n;
	}, [state.recording, state.prefersAudio]);

	useEffect(() => {
		dispatch({
			type: 'SET_BUFFERED_PROGRESS',
			payload: (playerBufferedEnd || 0) / state.duration,
		});
	}, [
		state.bufferedProgress,
		playerBufferedEnd,
		state.progress,
		state.duration,
	]);

	const playback: PlaybackContextType = {
		play: () => {
			playerRef.current?.play();
			dispatch({ type: 'PLAY' });
		},
		getTime: () =>
			(!onLoadRef.current && state.player?.currentTime()) ||
			state.progress * playback.getDuration() ||
			0,
		getDuration: () =>
			state.player?.duration() ||
			sourcesRef.current[0]?.duration ||
			state.recording?.duration ||
			0,
		setProgress: (p: number, updatePlayer = true) => {
			dispatch({ type: 'SET_PROGRESS', payload: p });
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

			if (typeof prefersAudio === 'boolean') {
				dispatch({ type: 'SET_PREFERS_AUDIO', payload: prefersAudio });
			}
			if (state.videoHandlerId && newRecording.id !== state.videoHandlerId) {
				playback.unsetVideoHandler(state.videoHandlerId);
			}

			playback._setRecording(newRecording, prefersAudio, onLoad);
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
		requestFullscreen: () => playerRef.current?.requestFullscreen(),
		advanceRecording: () => {
			if (state.sourceRecordings.length > 1) {
				dispatch({ type: 'ADVANCE' });
				onLoadRef.current = () => playback.play();
				playback._setRecording(
					state.sourceRecordings[1],
					state.prefersAudio,
					() => playback.play()
				);
			}
		},
		getRefs: () => ({
			origin: originRef,
			video: videoRef,
			videoEl: videoElRef,
		}),
		_setRecording: (
			recording: AndMiniplayerFragment,
			prefersAudio: boolean | undefined,
			onLoad?: (playback: PlaybackContextType) => void
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

				onLoad && onLoad(playback);
				onLoadRef.current = undefined;
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
					const p = v.default(currentVideoEl, {
						...state.options,
						sources,
					});
					playerRef.current = p;
					dispatch({ type: 'SET_PLAYER', payload: p });
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
		getSpeed: () => state.speed,
		getBufferedProgress: () => state.bufferedProgress,
		pause: () => dispatch({ type: 'PAUSE' }),
		player: () => state.player,
		hasPlayer: () => !!state.player,
		supportsFullscreen: () => state.player?.supportsFullScreen() || false,
		getVolume: () => (state.player?.volume() ?? 1) * 100,
		setVolume: (volume: number) =>
			dispatch({ type: 'SET_VOLUME', payload: volume }),
		chromecastTrigger: () => dispatch({ type: 'TRIGGER_CHROMECAST' }),
		airPlayTrigger: () => dispatch({ type: 'TRIGGER_AIRPLAY' }),
		setSpeed: (s: number) => dispatch({ type: 'SET_SPEED', payload: s }),
		setTime: (t: number) => dispatch({ type: 'SET_TIME', payload: t }),
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
