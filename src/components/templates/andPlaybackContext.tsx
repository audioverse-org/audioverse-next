import { useQueryClient } from '@tanstack/react-query';
import Script from 'next/script';
import React, {
	MutableRefObject,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from 'react';
import type * as VideoJs from 'video.js';

import hasVideo from '~lib/media/hasVideo';
import { Scalars } from '~src/__generated__/graphql';
import getVideoJs from '~src/lib/media/getVideoJs';
import moveVideo from '~src/lib/media/moveVideo';
import useBuffered from '~src/lib/media/useBuffered';
import useIsPaused from '~src/lib/media/useIsPaused';
import { PlaySource } from '~src/lib/media/usePlaybackSession';
import useProgress from '~src/lib/media/useProgress';
import useVolume from '~src/lib/media/useVolume';

import { analytics } from '../../lib/analytics';
import { getSources } from '../../lib/media/getSources';
import {
	AndMiniplayerFragment,
	GetRecordingExtraDataQuery,
} from './__generated__/andMiniplayer';

// Source:
// https://github.com/vercel/next.js/blob/canary/examples/with-videojs/components/Player.js

// If this solution becomes unviable, for instance, due to needing to
// update more props than just sources, this alternative approach may work:
// https://github.com/videojs/video.js/issues/4970#issuecomment-520591504

export interface Playable extends VideoJs.default.Tech.SourceObject {
	duration: number;
	logUrl?: string | null;
}

export type PlaybackContextType = {
	player: () => VideoJs.VideoJsPlayer | undefined; // TODO: remove this in favor of single-purpose methods
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
	setProgress: (options: {
		percentage: number;
		recordingId?: number | string | undefined;
		updatePlayer?: boolean;
	}) => void;
	getRecording: () => AndMiniplayerFragment | undefined;
	loadRecording: (
		recordingOrRecordings: AndMiniplayerFragment | AndMiniplayerFragment[],
		recordingId: string | number,
		options?: {
			onLoad?: (c: PlaybackContextType) => void;
			prefersAudio?: boolean;
		},
		source?: PlaySource
	) => void;
	setVideoHandler: (
		id: Scalars['ID']['output'],
		handler: (el: Element) => void
	) => void;
	unsetVideoHandler: (id: Scalars['ID']['output']) => void;
	getVideoHandler: () => ((el: Element) => void) | undefined;
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
		source?: PlaySource
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
	getVideoHandler: () => undefined,
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

type VideoJsType = typeof VideoJs;

export default function AndPlaybackContext({
	children,
}: AndMiniplayerProps): JSX.Element {
	// DONE:
	const { isPausedRef, setIsPaused } = useIsPaused();

	// IN PROGRESS:
	const recordingRef = useRef<AndMiniplayerFragment>();
	const { progress, setProgress } = useProgress(recordingRef.current?.id);

	const playerRef = useRef<VideoJs.VideoJsPlayer>();
	const { getVolume, setVolume } = useVolume(playerRef.current);

	const sourcesRef = useRef<Playable[]>([]);
	const [recording, setRecording] = useState<AndMiniplayerFragment>();
	const duration = sourcesRef.current[0]?.duration || recording?.duration || 0;
	const { bufferedProgress, setBufferedProgress } = useBuffered({
		recordingId: recordingRef.current?.id,
		player: playerRef.current,
		duration,
	});

	// TODO:
	const videoRef = useRef<HTMLDivElement>(null);
	const videoElRef = useRef<HTMLVideoElement>(null);
	const originRef = useRef<HTMLDivElement>(null);

	const [videojs] = useState<Promise<VideoJsType>>(
		() => getVideoJs() as Promise<VideoJsType>
	);

	const [sourceRecordings, setSourceRecordings] =
		useState<AndMiniplayerFragment[]>();

	const onLoadRef = useRef<(c: PlaybackContextType) => void>();

	const [prefersAudio, setPrefersAudio] = useState(false);
	const [videoHandler, setVideoHandler] = useState<(el: Element) => void>();
	const [videoHandlerId, setVideoHandlerId] =
		useState<Scalars['ID']['output']>();
	const videoHandlerIdRef = useRef<Scalars['ID']['output']>();

	const [_speed, _setSpeed] = useState<number>(1); // Ensure that speed changes trigger rerenders and are preserved across tracks

	const queryClient = useQueryClient();

	useEffect(() => {
		if (!recording) return;
		sourcesRef.current = getSources(recording, prefersAudio);
	}, [recording, prefersAudio]);

	const isShowingVideoRef = useRef(false);
	isShowingVideoRef.current =
		!!recording && hasVideo(recording) && !prefersAudio;

	const playback: PlaybackContextType = {
		play: () => {
			playerRef.current?.play();
			setIsPaused(false);
		},
		chromecastTrigger: () => playerRef.current?.trigger('chromecastRequested'),
		airPlayTrigger: () => playerRef.current?.trigger('airPlayRequested'),
		pause: () => {
			try {
				playerRef.current?.pause();
			} catch (e) {
				console.warn(e);
			}
			setIsPaused(true);
		},
		paused: () => isPausedRef.current,
		player: () => playerRef.current,
		getTime: () =>
			(!onLoadRef.current && playerRef.current?.currentTime()) ||
			progress * playback.getDuration() ||
			0,
		setTime: (t: number) => {
			if (!playerRef.current) return;
			setProgress({ percentage: t / playerRef.current.duration() });
			playerRef.current.currentTime(t);
		},
		setPrefersAudio: (prefersAudio: boolean) => {
			if (!recording) return;
			setPrefersAudio(prefersAudio);
			moveVideo({
				isShowingVideo: !!recording && hasVideo(recording) && !prefersAudio,
				isPaused: isPausedRef.current,
				pause: playback.pause,
				play: playback.play,
				video: videoElRef.current,
				origin: originRef.current,
				videoHandler,
			});
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
		setProgress: ({ percentage, recordingId, updatePlayer = true }) => {
			setProgress({ percentage, recordingId });
			const duration = playback.getDuration();
			if (!playerRef.current || !duration || isNaN(duration) || !updatePlayer) {
				console.log('Not updating player', {
					playerRef: !!playerRef.current,
					duration,
					isNaN: isNaN(duration),
					updatePlayer,
				});
				return;
			}
			playerRef.current.currentTime(percentage * duration);
			playerRef.current.play();
		},
		getRecording: () => {
			moveVideo({
				isShowingVideo: isShowingVideoRef.current,
				isPaused: isPausedRef.current,
				pause: playback.pause,
				play: playback.play,
				video: videoElRef.current,
				origin: originRef.current,
				videoHandler,
			});
			return recording;
		},
		loadRecording: (
			recordingOrRecordings: AndMiniplayerFragment | AndMiniplayerFragment[],
			recordingId: string | number,
			options = {},
			source?: PlaySource
		) => {
			console.log('loadRecording');
			const { onLoad, prefersAudio } = options;
			onLoadRef.current = onLoad;
			const recordingsArray = Array.isArray(recordingOrRecordings)
				? recordingOrRecordings
				: [recordingOrRecordings];
			setSourceRecordings(recordingsArray);

			const currentIndex = !Array.isArray(recordingOrRecordings)
				? 0
				: recordingsArray.findIndex((item) => item.id === recordingId);

			const newRecording = recordingsArray[currentIndex];
			setRecording(newRecording);
			console.log('setting recording ref');
			recordingRef.current = newRecording;
			if (typeof prefersAudio === 'boolean') {
				setPrefersAudio(prefersAudio);
			}
			if (videoHandlerId && newRecording.id !== videoHandlerId) {
				playback.unsetVideoHandler(videoHandlerId);
			}

			playback._setRecording(newRecording, prefersAudio, source);
		},
		setVideoHandler: (
			id: Scalars['ID']['output'],
			handler: (el: Element) => void
		) => {
			setVideoHandlerId(id);
			videoHandlerIdRef.current = id;
			setVideoHandler(() => handler);
			moveVideo({
				isShowingVideo: isShowingVideoRef.current,
				isPaused: isPausedRef.current,
				pause: playback.pause,
				play: playback.play,
				video: videoElRef.current,
				origin: originRef.current,
				videoHandler: handler,
			});
		},
		unsetVideoHandler: (id: Scalars['ID']['output']) => {
			if (id !== videoHandlerIdRef.current) return;
			setVideoHandlerId(undefined);
			setVideoHandler(undefined);
			console.log('Unsetting video handler', {
				isShowingVideo: isShowingVideoRef.current,
				recording: !!recording,
				hasVideo: !!recording && hasVideo(recording),
				prefersAudio,
			});
			moveVideo({
				isShowingVideo: isShowingVideoRef.current,
				isPaused: isPausedRef.current,
				pause: playback.pause,
				play: playback.play,
				video: videoElRef.current,
				origin: originRef.current,
				videoHandler: undefined,
			});
		},
		getVideoHandler: () => {
			return videoHandler;
		},
		hasPlayer: () => !!playerRef.current,
		hasVideo: () => !!recording && hasVideo(recording),
		isShowingVideo: () => isShowingVideoRef.current,
		getVideoLocation: () => {
			if (!isShowingVideoRef.current) return null;

			if (videoHandler) return 'portal';

			return 'miniplayer';
		},
		supportsFullscreen: () => playerRef.current?.supportsFullScreen() || false,
		getVolume,
		setVolume,
		getSpeed: () => _speed,
		setSpeed: (s: number) => {
			playerRef.current?.playbackRate(s);
			playerRef.current?.defaultPlaybackRate(s);
			playerRef.current?.play();
			_setSpeed(s);
		},
		requestFullscreen: () => playerRef.current?.requestFullscreen(),
		advanceRecording: () => {
			console.log('advanceRecording');
			if (!sourceRecordings) {
				return;
			}
			const currentIndex = sourceRecordings.findIndex(
				(item) => item.id === recording?.id
			);
			if (currentIndex !== -1 && currentIndex + 1 < sourceRecordings.length) {
				setRecording(sourceRecordings[currentIndex + 1]);
				onLoadRef.current = () => playback.play();
				playback._setRecording(
					sourceRecordings[currentIndex + 1],
					prefersAudio
				);
			}
		},
		setIsPaused,
		getRefs: () => ({
			origin: originRef,
			video: videoRef,
			videoEl: videoElRef,
		}),
		_setRecording: (
			recording: AndMiniplayerFragment,
			prefersAudio: boolean | undefined,
			source: PlaySource | undefined
		) => {
			const currentVideoEl = videoElRef.current;
			if (!currentVideoEl) {
				console.log('No video element found');
				return;
			}

			const sources = getSources(recording, prefersAudio || false);
			sourcesRef.current = sources;

			const resetPlayer = () => {
				console.log('resetting player');

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
				setBufferedProgress(0);

				playerRef.current?.currentTime(progress * playback.getDuration());

				onLoadRef.current && onLoadRef.current(playback);
				onLoadRef.current = undefined;

				const recordingExtraData =
					queryClient.getQueryData<GetRecordingExtraDataQuery>([
						'getRecordingExtraData',
						{ id: recording.id },
					]);

				const speakersNames = recordingExtraData?.recording?.speakers.map(
					(speaker) => speaker.name
				);
				analytics.track('Play', {
					id: recording.id,
					title: recording.title,
					isAudio: !(!!recording && hasVideo(recording) && !prefersAudio),
					contentType: recordingExtraData?.recording?.contentType,
					speakers: speakersNames,
					sponsor: recordingExtraData?.recording?.sponsor?.title,
					series: recording.sequence?.title,
					conference: recording.collection?.title,
					source: source ?? PlaySource.Other,
				});
			};

			const options: VideoJs.VideoJsPlayerOptions = {
				poster: '/img/poster.jpg',
				controls: false,
				preload: 'auto',
				defaultVolume: 1,
				sources,
				techOrder: [
					// 'chromecast',
					'html5',
				],
				plugins: {
					// chromecast: {
					// 	addButtonToControlBar: true, // Use custom designed button
					// },
					// airPlay: {
					// 	addButtonToControlBar: true, // Use custom designed button
					// },
				},
			};

			if (playerRef.current) {
				console.log('resetting existing player');
				playerRef.current.src(sources);
				resetPlayer();
			} else {
				console.log('resetting new player');
				videojs.then(async (v) => {
					const p = v.default(currentVideoEl, options);
					p.on('fullscreenchange', () => {
						p.controls(p.isFullscreen());
					});
					playerRef.current = p;
					resetPlayer();
				});
			}

			moveVideo({
				isShowingVideo: hasVideo(recording) && !prefersAudio,
				isPaused: true,
				pause: playback.pause,
				play: playback.play,
				video: videoElRef.current,
				origin: originRef.current,
				videoHandler: undefined,
			});
		},
	};

	return (
		<>
			<Script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
			<PlaybackContext.Provider value={playback}>
				{children}
			</PlaybackContext.Provider>
		</>
	);
}
