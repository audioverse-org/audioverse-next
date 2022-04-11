import throttle from 'lodash/throttle';
import React, {
	MutableRefObject,
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
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
import hasVideo from '@lib/hasVideo';

// Source:
// https://github.com/vercel/next.js/blob/canary/examples/with-videojs/components/Player.js

// If this solution becomes unviable, for instance, due to needing to
// update more props than just sources, this alternative approach may work:
// https://github.com/videojs/video.js/issues/4970#issuecomment-520591504

interface Playable extends VideoJs.default.Tech.SourceObject {
	duration: number;
	logUrl?: string | null;
}

interface VideoJsPlayerWithOverlay extends VideoJsPlayer {
	overlay: (options: object) => void;
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
	hasVideo: () => boolean;
	supportsFullscreen: () => boolean;
	isShowingVideo: () => boolean;
	getVideoLocation: () => 'miniplayer' | 'portal' | null;
	getVolume: () => number;
	setVolume: (v: number) => void;
	setSpeed: (s: number) => void;
	getSpeed: () => number;
	getDuration: () => number;
	requestFullscreen: () => void;
	isFullscreen: () => boolean | undefined;
	advanceRecording: () => void;
	setIsPaused: (paused: boolean) => void;
	getRefs: () => {
		origin?: MutableRefObject<HTMLDivElement | null>;
		video?: MutableRefObject<HTMLDivElement | null>;
		videoEl?: MutableRefObject<HTMLVideoElement | null>;
		videoOverlay?: MutableRefObject<HTMLDivElement | null>;
		titleOverlay?: MutableRefObject<HTMLDivElement | null>;
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
	hasVideo: () => false,
	isShowingVideo: () => false,
	getVideoLocation: () => null,
	getRecording: () => undefined,
	getVolume: () => 100,
	setVolume: () => undefined,
	setSpeed: () => undefined,
	getSpeed: () => 1,
	getDuration: () => 0,
	isFullscreen: () => false,
	requestFullscreen: () => undefined,
	advanceRecording: () => undefined,
	setIsPaused: () => undefined,
	getRefs: () => ({}),
	_setRecording: () => undefined,
});

interface AndMiniplayerProps {
	children: ReactNode;
}

const SERVER_UPDATE_WAIT_TIME = 5 * 1000;

export default function AndPlaybackContext({
	children,
}: AndMiniplayerProps): JSX.Element {
	const videoRef = useRef<HTMLDivElement>(null);
	const videoElRef = useRef<HTMLVideoElement>(null);
	const originRef = useRef<HTMLDivElement>(null);
	const videoOverlayRef = useRef<HTMLDivElement>(null);
	const titleOverlayRef = useRef<HTMLDivElement>(null);

	const [videojs, setVideojs] = useState<typeof VideoJs>();
	useEffect(() => {
		import('video.js').then((v) => {
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			require('videojs-overlay');
			setVideojs(v);
		});
	}, []);

	const [sourceRecordings, setSourceRecordings] =
		useState<AndMiniplayerFragment[]>();
	const [recording, setRecording] = useState<AndMiniplayerFragment>();
	const [progress, _setProgress] = useState<number>(0);
	const [bufferedProgress, setBufferedProgress] = useState<number>(0);
	const onLoadRef = useRef<(c: PlaybackContextType) => void>();
	const playerRef = useRef<VideoJsPlayer>();
	const progressRef = useRef<number>(0);
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const [prefersAudio, setPrefersAudio] = useState(false);
	const [videoHandler, setVideoHandler] = useState<(el: Element) => void>();
	const [videoHandlerId, setVideoHandlerId] = useState<Scalars['ID']>();
	const videoHandlerIdRef = useRef<Scalars['ID']>();
	const [, setVolume] = useState<number>(100); // Ensure that volume changes trigger rerenders
	const [_speed, _setSpeed] = useState<number>(1); // Ensure that speed changes trigger rerenders and are preserved across tracks

	const queryClient = useQueryClient();

	const { mutate: updateProgress } = useMutation(
		({
			percentage,
		}: Pick<RecordingPlaybackProgressSetMutationVariables, 'percentage'>) => {
			if (!getSessionToken() || !recording) {
				return Promise.resolve() as Promise<unknown>;
			}
			return recordingPlaybackProgressSet({
				id: recording.id,
				percentage,
			});
		}
	);

	const sourcesRef = useRef<Playable[]>([]);
	useEffect(() => {
		if (!recording) return;
		sourcesRef.current = getSources(recording, prefersAudio);
	}, [recording, prefersAudio]);

	const playerBufferedEnd = playerRef.current?.bufferedEnd();
	const duration = sourcesRef.current[0]?.duration || recording?.duration || 0;
	useEffect(() => {
		let newBufferedProgress = +Math.max(
			bufferedProgress, // Don't ever reduce the buffered amount
			progress, // We've always buffered as much as we're playing
			(playerBufferedEnd || 0) / duration // Actually compute current buffered progress
		).toFixed(2);
		if (newBufferedProgress >= 0.99) newBufferedProgress = 1;
		setBufferedProgress(newBufferedProgress);
	}, [bufferedProgress, playerBufferedEnd, progress, duration]);

	const throttledUpdateProgress = useMemo(
		() => throttle(updateProgress, SERVER_UPDATE_WAIT_TIME, { leading: true }),
		[updateProgress]
	);
	const setProgress = useCallback(
		(p: number) => {
			throttledUpdateProgress({
				percentage: p,
			});
			_setProgress(p);
		},
		[throttledUpdateProgress]
	);

	const isShowingVideo = !!recording && hasVideo(recording) && !prefersAudio;

	useEffect(() => {
		progressRef.current = progress;
	}, [progress]);

	const recordingRef = useRef<AndMiniplayerFragment>();
	const playback: PlaybackContextType = {
		play: () => {
			playerRef.current?.play();
			setIsPaused(false);
		},
		pause: () => {
			playerRef.current?.pause();
			setIsPaused(true);
		},
		paused: () => isPaused,
		player: () => playerRef.current,
		getTime: () =>
			(!onLoadRef.current && playerRef.current?.currentTime()) ||
			progress * playback.getDuration() ||
			0,
		setTime: (t: number) => {
			if (!playerRef.current) return;
			setProgress(t / playerRef.current.duration());
			playerRef.current.currentTime(t);
		},
		setPrefersAudio: (prefersAudio: boolean) => {
			if (!recording) return;
			setPrefersAudio(prefersAudio);
		},
		getPrefersAudio: () => prefersAudio,
		getDuration: () => {
			return (
				(!onLoadRef.current && playerRef.current?.duration()) ||
				sourcesRef.current[0]?.duration ||
				recordingRef.current?.duration ||
				0
			);
		},
		getProgress: () => progress,
		getBufferedProgress: () => bufferedProgress,
		setProgress: (p: number, updatePlayer = true) => {
			setProgress(p);
			const duration = playback.getDuration();
			if (!playerRef.current || !duration || isNaN(duration) || !updatePlayer)
				return;
			playerRef.current.currentTime(p * duration);
		},
		getRecording: () => recording,
		loadRecording: (
			recordingOrRecordings: AndMiniplayerFragment | AndMiniplayerFragment[],
			options = {}
		) => {
			const { onLoad, prefersAudio } = options;
			onLoadRef.current = onLoad;
			const recordingsArray = Array.isArray(recordingOrRecordings)
				? recordingOrRecordings
				: [recordingOrRecordings];
			setSourceRecordings(recordingsArray);
			const newRecording = recordingsArray[0];
			setRecording(newRecording);
			recordingRef.current = newRecording;
			if (typeof prefersAudio === 'boolean') {
				setPrefersAudio(prefersAudio);
			}
			if (videoHandlerId && newRecording.id !== videoHandlerId) {
				playback.unsetVideoHandler(videoHandlerId);
			}

			playback._setRecording(newRecording, prefersAudio);
		},
		setVideoHandler: (id: Scalars['ID'], handler: (el: Element) => void) => {
			setVideoHandlerId(id);
			videoHandlerIdRef.current = id;
			setVideoHandler(() => handler);
		},
		unsetVideoHandler: (id: Scalars['ID']) => {
			if (id !== videoHandlerIdRef.current) return;
			setVideoHandlerId(undefined);
			setVideoHandler(undefined);
		},
		hasPlayer: () => !!playerRef.current,
		hasVideo: () => !!recording && hasVideo(recording),
		isShowingVideo: () => isShowingVideo,
		getVideoLocation: () => {
			if (!isShowingVideo) return null;

			if (videoHandler) return 'portal';

			return 'miniplayer';
		},
		supportsFullscreen: () => playerRef.current?.supportsFullScreen() || false,
		getVolume: () => (playerRef.current?.volume() ?? 1) * 100,
		setVolume: (volume: number) => {
			setVolume(volume);
			playerRef.current?.volume(volume / 100);
		},
		getSpeed: () => _speed,
		setSpeed: (s: number) => {
			playerRef.current?.playbackRate(s);
			playerRef.current?.defaultPlaybackRate(s);
			_setSpeed(s);
		},
		isFullscreen: () => playerRef.current?.isFullscreen(),
		requestFullscreen: () => {
			const overlayPlayer = playerRef.current as VideoJsPlayerWithOverlay;
			overlayPlayer.requestFullscreen();
			overlayPlayer.controlBar.hide();
			overlayPlayer.overlay({
				overlays: [
					{
						content: videoOverlayRef.current,
						start: 0,
						end: overlayPlayer.duration() + 10,
					},
					{
						content: titleOverlayRef.current,
						start: 'pause',
						end: 'playing',
					},
				],
			});
		},
		advanceRecording: () => {
			if (sourceRecordings && sourceRecordings.length > 1) {
				setRecording(sourceRecordings[1]);
				setSourceRecordings(sourceRecordings?.slice(1));
				onLoadRef.current = () => playback.play();
				playback._setRecording(sourceRecordings[1], prefersAudio);
			}
		},
		setIsPaused: (paused) => setIsPaused(paused),
		getRefs: () => ({
			origin: originRef,
			video: videoRef,
			videoEl: videoElRef,
			videoOverlay: videoOverlayRef,
			titleOverlay: titleOverlayRef,
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

				setIsPaused(true);
				const serverProgress =
					queryClient.getQueryData<GetRecordingPlaybackProgressQuery>([
						'getRecordingPlaybackProgress',
						{ id: recording.id },
					]);
				const progress =
					serverProgress?.recording?.viewerPlaybackSession
						?.positionPercentage || 0;
				_setProgress(progress);

				setBufferedProgress(0);

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
			};
			if (playerRef.current) {
				playerRef.current.src(sources);
				resetPlayer();
			} else if (videojs) {
				const p = videojs.default(currentVideoEl, options);
				p.on('fullscreenchange', () => {
					p.controls(p.isFullscreen());
				});
				playerRef.current = p;
				resetPlayer();
			} else {
				import('video.js').then((videoJsImport) => {
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					require('videojs-overlay');
					setVideojs(videoJsImport);
					playerRef.current = videoJsImport.default(currentVideoEl, options);
					resetPlayer();
				});
			}
		},
	};

	useEffect(() => {
		const video = videoRef.current;

		if (!video) {
			return;
		}

		if (videoHandler) {
			setTimeout(() => {
				// Move the video on the next tick to avoid FOPV (flash-of-previous-video ;))
				videoHandler(video);
			}, 0);
			return;
		}

		function findDestination() {
			if (isShowingVideo) {
				// TODO: use ref instead of ID
				return document.getElementById('mini-player');
			}

			return originRef.current;
		}

		const destination = findDestination();

		if (!destination) {
			return;
		}

		if (destination === video.parentElement) {
			return;
		}

		destination.appendChild(video);
	}, [videoHandlerId, videoHandler, isShowingVideo]);

	return (
		<PlaybackContext.Provider value={playback}>
			{children}
		</PlaybackContext.Provider>
	);
}
