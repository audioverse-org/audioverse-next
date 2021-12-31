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
import { unstable_batchedUpdates } from 'react-dom';
import { useMutation } from 'react-query';
import type { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import type * as VideoJs from 'video.js';

import { getSessionToken } from '@lib/cookies';
import {
	AndMiniplayerFragment,
	recordingPlaybackProgressSet,
	RecordingPlaybackProgressSetMutationVariables,
	Scalars,
	useGetRecordingPlaybackProgressQuery,
} from '@lib/generated/graphql';
import hasVideo from '@lib/hasVideo';

// Source:
// https://github.com/vercel/next.js/blob/canary/examples/with-videojs/components/Player.js

// If this solution becomes unviable, for instance, due to needing to
// update more props than just sources, this alternative approach may work:
// https://github.com/videojs/video.js/issues/4970#issuecomment-520591504

interface Playable {
	url: string;
	mimeType: string;
	duration: number;
}

const getFiles = (
	recording: AndMiniplayerFragment,
	prefersAudio: boolean
): Playable[] => {
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
) => {
	const files = getFiles(recording, prefersAudio) || [];

	return files.map((f) => ({
		src: f.url,
		type: f.mimeType,
		duration: f.duration,
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
	advanceRecording: () => void;
	setIsPaused: (paused: boolean) => void;
	getRefs: () => {
		origin?: MutableRefObject<HTMLDivElement | null>;
		video?: MutableRefObject<HTMLDivElement | null>;
		videoEl?: MutableRefObject<HTMLVideoElement | null>;
	};
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
	requestFullscreen: () => undefined,
	advanceRecording: () => undefined,
	setIsPaused: () => undefined,
	getRefs: () => ({}),
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

	const [videojs, setVideojs] = useState<typeof VideoJs>();
	import('video.js').then((v) => setVideojs(v));
	const [player, setPlayer] = useState<VideoJsPlayer>();
	const [sourceRecordings, setSourceRecordings] =
		useState<AndMiniplayerFragment[]>();
	const [recording, setRecording] = useState<AndMiniplayerFragment>();
	const [progress, _setProgress] = useState<number>(0);
	const [bufferedProgress, setBufferedProgress] = useState<number>(0);
	const [serverProgress, setServerProgress] = useState<number>(0);
	const progressRef = useRef<number>(0);
	const [volume, setVolume] = useState<number>(100);
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const [prefersAudio, setPrefersAudio] = useState(false);
	const [sources, setSources] = useState<
		{ src: string; type: string; duration: number }[]
	>([]);
	const [onLoad, setOnLoad] = useState<(c: PlaybackContextType) => void>();
	const [fingerprint, setFingerprint] = useState<string>();
	const [videoHandler, setVideoHandler] = useState<(el: Element) => void>();
	const [videoHandlerId, setVideoHandlerId] = useState<Scalars['ID']>();
	const videoHandlerIdRef = useRef<Scalars['ID']>();

	const { data, isLoading } = useGetRecordingPlaybackProgressQuery(
		{
			id: recording?.id || 0,
		},
		{
			enabled: shouldLoadRecordingPlaybackProgress(recording),
		}
	);
	useEffect(() => {
		if (data?.recording?.viewerPlaybackSession) {
			const p = data.recording.viewerPlaybackSession.positionPercentage;
			setServerProgress(p);
		} else {
			setServerProgress(0);
		}
	}, [recording?.id, data, isLoading]);

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

	const playerBufferedEnd = player?.bufferedEnd();
	const duration = sources[0]?.duration || recording?.duration || 0;
	useEffect(() => {
		let newBufferedProgress = +Math.max(
			bufferedProgress, // Don't ever reduce the buffered amount
			progress, // We've always buffered as much as we're playing
			(playerBufferedEnd || 0) / duration // Actually compute current buffered progress
		).toFixed(2);
		if (newBufferedProgress >= 0.99) newBufferedProgress = 1;
		setBufferedProgress(newBufferedProgress);
	}, [bufferedProgress, playerBufferedEnd, progress, duration, sources]);

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

	const hasSources = sources && sources.length > 0;
	const isShowingVideo = !!recording && hasVideo(recording) && !prefersAudio;

	const options: VideoJsPlayerOptions = useMemo(
		() => ({
			poster: '/img/poster.jpg',
			controls: false,
			preload: 'auto',
			fluid: true,
			sources,
		}),
		[sources]
	);

	useEffect(() => {
		progressRef.current = progress;
	}, [progress]);

	const playback: PlaybackContextType = {
		play: () => {
			player?.play();
			setIsPaused(false);
		},
		pause: () => {
			player?.pause();
			setIsPaused(true);
		},
		paused: () => {
			return isPaused;
		},
		player: () => player,
		getTime: () => {
			return (
				(!onLoad && player?.currentTime()) ||
				serverProgress * playback.getDuration() ||
				0
			);
		},
		setTime: (t: number) => {
			if (!player) return;
			setProgress(t / player.duration());
			player.currentTime(t);
		},
		setPrefersAudio: (prefersAudio: boolean) => {
			if (!recording) return;
			setPrefersAudio(prefersAudio);
		},
		getPrefersAudio: () => prefersAudio,
		getDuration: () => {
			return (!onLoad && player?.duration()) || duration;
		},
		getProgress: () => {
			return progress;
		},
		getBufferedProgress: () => {
			return bufferedProgress;
		},
		setProgress: (p: number, updatePlayer = true) => {
			setProgress(p);
			const duration = playback.getDuration();
			if (!player || !duration || isNaN(duration) || !updatePlayer) return;
			player.currentTime(p * duration);
		},
		getRecording: () => recording,
		loadRecording: (
			recordingOrRecordings: AndMiniplayerFragment | AndMiniplayerFragment[],
			options = {}
		) => {
			const { onLoad, prefersAudio } = options;
			setOnLoad(() => onLoad);
			const recordingsArray = Array.isArray(recordingOrRecordings)
				? recordingOrRecordings
				: [recordingOrRecordings];
			setSourceRecordings(recordingsArray);
			setRecording(recordingsArray[0]);
			if (typeof prefersAudio === 'boolean') {
				setPrefersAudio(prefersAudio);
			}
			if (videoHandlerId && recordingsArray[0].id !== videoHandlerId) {
				playback.unsetVideoHandler(videoHandlerId);
			}
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
		hasPlayer: () => !!player,
		hasVideo: () => !!recording && hasVideo(recording),
		isShowingVideo: () => isShowingVideo,
		getVideoLocation: () => {
			if (!isShowingVideo) return null;

			if (videoHandler) return 'portal';

			return 'miniplayer';
		},
		supportsFullscreen: () => (player ? player.supportsFullScreen() : false),
		getVolume: () => volume,
		setVolume,
		setSpeed: (s: number) => player?.playbackRate(s),
		getSpeed: () => player?.playbackRate() || 1,
		requestFullscreen: () => {
			player?.requestFullscreen();
		},
		advanceRecording: () => {
			if (sourceRecordings && sourceRecordings.length > 1) {
				setRecording(sourceRecordings[1]);
				setSourceRecordings(sourceRecordings?.slice(1));
				setOnLoad(() => () => playback.play());
			}
		},
		setIsPaused: (paused) => setIsPaused(paused),
		getRefs: () => ({
			origin: originRef,
			video: videoRef,
			videoEl: videoElRef,
		}),
	};

	useEffect(() => {
		if (!recording) return;
		setSources(getSources(recording, prefersAudio));
	}, [recording, prefersAudio]);

	useEffect(() => {
		const loadPlayer = async () => {
			// TODO: return if onLoad
			if (!videoElRef.current) return;
			if (!hasSources) return;

			const p =
				player ||
				(videojs as typeof VideoJs).default(videoElRef.current, options);

			unstable_batchedUpdates(() => {
				if (!player) {
					setPlayer(p);
				} else if (sources) {
					player.src(sources);
				}

				setIsPaused(true);
				const progress = serverProgress || 0;
				_setProgress(progress);

				setBufferedProgress(0);

				p.currentTime(progress * duration);
				setVolume(p.volume() * 100);

				setFingerprint(JSON.stringify(sources));
			});
		};
		loadPlayer();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [options, hasSources, sources, videoElRef.current]);

	useEffect(() => {
		onLoad && onLoad(playback);
		setOnLoad(undefined);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fingerprint]);

	useEffect(() => {
		player?.volume(volume / 100);
	}, [player, volume]);

	useEffect(() => {
		if (onLoad) {
			return;
		}

		const video = videoRef.current;

		if (!video) {
			return;
		}

		if (videoHandler) {
			videoHandler(video);
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
	}, [videoHandlerId, videoHandler, isShowingVideo, onLoad]);

	useEffect(() => {
		if (!player) return;
		player.on('fullscreenchange', () => {
			player.controls(player.isFullscreen());
		});
	}, [player]);

	return (
		<PlaybackContext.Provider value={playback}>
			{children}
		</PlaybackContext.Provider>
	);
}
