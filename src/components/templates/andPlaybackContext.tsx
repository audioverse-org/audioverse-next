import throttle from 'lodash/throttle';
import Script from 'next/script';
import React, {
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useMutation, useQueryClient } from 'react-query';
import type * as VideoJs from 'video.js';
import type { VideoJsPlayer } from 'video.js';

import { getSessionToken } from '@lib/cookies';
import { Maybe, Scalars } from '@src/__generated__/graphql';
import hasVideo from '@lib/hasVideo';
import styles from '@components/templates/andMiniplayer.module.scss';
import dynamic from 'next/dynamic';
import {
	AndMiniplayerFragment,
	GetRecordingPlaybackProgressQuery,
	recordingPlaybackProgressSet,
	RecordingPlaybackProgressSetMutationVariables,
} from '@components/templates/__generated__/andMiniplayer';

// Source:
// https://github.com/vercel/next.js/blob/canary/examples/with-videojs/components/Player.js

// If this solution becomes impractical, for instance, due to needing to
// update more props than just sources, this alternative approach may work:
// https://github.com/videojs/video.js/issues/4970#issuecomment-520591504

// import LazyVideoPlayer from '@components/molecules/videoPlayer';

const LazyVideoPlayer = dynamic(
	() => import('@components/molecules/videoPlayer'),
	// WORKAROUND: https://stackoverflow.com/a/72334062/937377
	{ ssr: false }
);

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
	on: (event: VideoJsEvent, callback: (...args: unknown[]) => void) => void;
	off: (event: VideoJsEvent, callback: (...args: unknown[]) => void) => void;
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
	hasVideo: () => boolean;
	supportsFullscreen: () => boolean;
	isShowingVideo: () => boolean;
	getVideoLocation: () => 'miniplayer' | 'portal' | null;
	getVolume: () => Percent;
	setVolume: (v: Percent) => void;
	setSpeed: (s: number) => void;
	getSpeed: () => number;
	getMiniplayerRef: () => Maybe<React.RefObject<HTMLDivElement>>;
	getDuration: () => number;
	requestFullscreen: () => void;
	advanceRecording: () => void;
	setIsPaused: (paused: boolean) => void;
	_setRecording: (
		recording: AndMiniplayerFragment,
		prefersAudio?: boolean
	) => void;
};

export const PlaybackContext = React.createContext<PlaybackContextType>({
	on: () => undefined,
	off: () => undefined,
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
	getMiniplayerRef: () => null,
	getVolume: () => 100,
	setVolume: () => undefined,
	setSpeed: () => undefined,
	getSpeed: () => 1,
	getDuration: () => 0,
	requestFullscreen: () => undefined,
	advanceRecording: () => undefined,
	setIsPaused: () => undefined,
	_setRecording: () => undefined,
	chromecastTrigger: () => undefined,
	airPlayTrigger: () => undefined,
});

interface AndMiniplayerProps {
	children: ReactNode;
}

const SERVER_UPDATE_WAIT_TIME = 5 * 1000;

type VideoJsType = typeof VideoJs;
type Airplay = { default: (vjs: unknown) => unknown };
type Chromecast = {
	default: (vjs: unknown, options: Record<string, unknown>) => unknown;
};

export default function AndPlaybackContext({
	children,
}: AndMiniplayerProps): JSX.Element {
	const videoRef = useRef<HTMLDivElement>(null);
	const videoElRef = useRef<HTMLVideoElement>(null);
	const originRef = useRef<HTMLDivElement>(null);
	const miniplayerRef = useRef<HTMLDivElement>(null);

	const [videojs] = useState<Promise<VideoJsType>>(() => import('video.js'));
	const [airplay] = useState<Promise<Airplay>>(
		() => import('@silvermine/videojs-airplay')
	);
	const [chromecast] = useState<Promise<Chromecast>>(
		() => import('@silvermine/videojs-chromecast')
	);

	const [sourceRecordings, setSourceRecordings] =
		useState<AndMiniplayerFragment[]>();
	const [recording, setRecording] = useState<AndMiniplayerFragment>();
	const [progress, _setProgress] = useState<number>(0);
	const [bufferedProgress, setBufferedProgress] = useState<number>(0);
	const onLoadRef = useRef<(c: PlaybackContextType) => void>();
	const playerRef = useRef<VideoJsPlayer>();
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const [prefersAudio, setPrefersAudio] = useState(false);
	const [videoHandler, setVideoHandler] = useState<(el: Element) => void>();
	const [videoHandlerId, setVideoHandlerId] = useState<Scalars['ID']>();
	const videoHandlerIdRef = useRef<Scalars['ID']>();

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

	const recordingRef = useRef<AndMiniplayerFragment>();
	const playback: PlaybackContextType = {
		on: (event, handler) => {
			if (!playerRef.current) return;
			playerRef.current.on(event, handler);
		},
		off: (event, handler) => {
			if (!playerRef.current) return;
			playerRef.current.off(event, handler);
		},
		play: () => {
			playerRef.current?.play();
			setIsPaused(false);
		},
		chromecastTrigger: () => playerRef.current?.trigger('chromecastRequested'),
		airPlayTrigger: () => playerRef.current?.trigger('airPlayRequested'),
		pause: () => {
			playerRef.current?.pause();
			setIsPaused(true);
		},
		getMiniplayerRef: () => miniplayerRef,
		paused: () => isPaused,
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
				playerRef.current?.duration() ||
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
		getVolume: (): Percent => {
			const v = Math.round((playerRef.current?.volume() ?? 1) * 100);
			return v as Percent;
		},
		setVolume: (v: Percent) => playerRef.current?.volume(v / 100),
		getSpeed: () => playerRef.current?.playbackRate() ?? 1,
		setSpeed: (s: number) => {
			playerRef.current?.playbackRate(s);
			playerRef.current?.defaultPlaybackRate(s);
		},
		requestFullscreen: () => playerRef.current?.requestFullscreen(),
		advanceRecording: () => {
			if (sourceRecordings && sourceRecordings.length > 1) {
				setRecording(sourceRecordings[1]);
				setSourceRecordings(sourceRecordings?.slice(1));
				onLoadRef.current = () => playback.play();
				playback._setRecording(sourceRecordings[1], prefersAudio);
			}
		},
		setIsPaused,
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
				videojs.then(async (v) => {
					(await airplay).default(v.default);
					(await chromecast).default(v.default, {
						preloadWebComponents: true,
					});
					const p = v.default(currentVideoEl, options);
					p.on('fullscreenchange', () => {
						p.controls(p.isFullscreen());
					});
					p.on('timeupdate', () => {
						if (!playerRef.current) return;
						const t = playerRef.current.currentTime();
						const d = playerRef.current.duration();
						const p = d ? t / d : 0;
						playback.setProgress(p, false);
					});
					p.on('pause', () => {
						playback.setIsPaused(true);
					});
					p.on('play', () => {
						playback.setIsPaused(false);
					});
					p.on('ended', () => {
						playback.advanceRecording();
					});
					playerRef.current = p;
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
			const ref = isShowingVideo ? miniplayerRef : originRef;
			return ref.current;
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
		<>
			<Script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
			<PlaybackContext.Provider value={playback}>
				<div ref={originRef} className={styles.videoOrigin}>
					<LazyVideoPlayer
						className={styles.playerElement}
						videoRef={videoRef}
						videoElRef={videoElRef}
					/>
				</div>
				{children}
			</PlaybackContext.Provider>
		</>
	);
}
