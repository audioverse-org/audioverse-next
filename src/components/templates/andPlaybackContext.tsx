import { useQueryClient } from '@tanstack/react-query';
import Script from 'next/script';
import React, {
	MutableRefObject,
	ReactNode,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import type * as VideoJs from 'video.js';

import hasVideo from '~lib/media/hasVideo';
import useBuffered from '~src/lib/media/useBuffered';
import useIsPaused from '~src/lib/media/useIsPaused';
import useOnPlayerLoad from '~src/lib/media/useOnPlayerLoad';
import { PlaySource } from '~src/lib/media/usePlaybackSession';
import usePlayer from '~src/lib/media/usePlayer';
import usePlayerLocation from '~src/lib/media/usePlayerLocation';
import usePlayerRecording from '~src/lib/media/usePlayerRecording';
import usePlayerSources from '~src/lib/media/usePlayerSources';
import usePrefersAudio from '~src/lib/media/usePrefersAudio';
import useProgress from '~src/lib/media/useProgress';

import { analytics } from '../../lib/analytics';
import {
	AndMiniplayerFragment,
	GetRecordingExtraDataQuery,
} from './__generated__/andMiniplayer';
import AndMediaContext from './andMediaContext';

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
	player: () => VideoJs.VideoJsPlayer | undefined | null;
	play: () => void;
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
	getRecording: () => AndMiniplayerFragment | null;
	loadRecording: (
		recordingOrRecordings: AndMiniplayerFragment | AndMiniplayerFragment[],
		recordingId: string | number,
		options?: {
			onLoad?: (c: PlaybackContextType) => void;
			prefersAudio?: boolean;
		},
		source?: PlaySource
	) => void;
	getDuration: () => number;
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
	loadRecording: () => undefined,
	getRecording: () => null,
	getDuration: () => 0,
	advanceRecording: () => undefined,
	setIsPaused: () => undefined,
	getRefs: () => ({}),
	_setRecording: () => undefined,
});

interface AndMiniplayerProps {
	children: ReactNode;
}

function AndPlaybackContext({ children }: AndMiniplayerProps): JSX.Element {
	// DONE:
	const { player } = usePlayer();
	const { isPausedRef, setIsPaused } = useIsPaused();
	const onLoad = useOnPlayerLoad();
	const { playerLocation } = usePlayerLocation();

	// IN PROGRESS:
	const { recording, setRecording } = usePlayerRecording();
	const { progress, setProgress } = useProgress(recording?.id);

	const playerRef = useRef<VideoJs.VideoJsPlayer | null>(player);
	useEffect(() => {
		playerRef.current = player;
	}, [player]);

	const { prefersAudio, setPrefersAudio } = usePrefersAudio();
	const { getSources, setSources } = usePlayerSources({
		recording,
		prefersAudio,
	});
	const duration = getSources()[0]?.duration || recording?.duration || 0;
	const { bufferedProgress, setBufferedProgress } = useBuffered({
		recordingId: recording?.id,
		player: playerRef.current,
		duration,
	});

	// TODO:
	const videoRef = useRef<HTMLDivElement>(null);
	const videoElRef = useRef<HTMLVideoElement>(null);
	const originRef = useRef<HTMLDivElement>(null);

	const [sourceRecordings, setSourceRecordings] =
		useState<AndMiniplayerFragment[]>();

	const onLoadRef = useRef<(c: PlaybackContextType) => void>();

	const queryClient = useQueryClient();

	const playback: PlaybackContextType = useMemo(
		() => ({
			play: () => {
				console.log('play');
				setIsPaused(false);
				onLoad((p) => p.play());
			},
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
			},
			getPrefersAudio: () => prefersAudio,
			getDuration: () => {
				return (
					playerRef.current?.duration() ||
					getSources()[0]?.duration ||
					recording?.duration ||
					0
				);
			},
			getProgress: () => progress,
			getBufferedProgress: () => bufferedProgress,
			setProgress: ({ percentage, recordingId, updatePlayer = true }) => {
				setProgress({ percentage, recordingId });
				const duration = playback.getDuration();
				if (
					!playerRef.current ||
					!duration ||
					isNaN(duration) ||
					!updatePlayer
				) {
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
			getRecording: () => recording,
			loadRecording: (
				recordingOrRecordings: AndMiniplayerFragment | AndMiniplayerFragment[],
				recordingId: string | number,
				options = {},
				source?: PlaySource
			) => {
				onLoad(() => {
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
					if (typeof prefersAudio === 'boolean') {
						setPrefersAudio(prefersAudio);
					}

					playback._setRecording(newRecording, prefersAudio, source);
				});
			},
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
				setSources({ recording, prefersAudio: prefersAudio || false });

				const resetPlayer = () => {
					console.log('resetting player');

					const logUrl = getSources().find((s) => s.logUrl)?.logUrl;
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

				onLoad((p) => {
					console.log('setting sources for recording', recording.id);
					p.src(getSources());

					resetPlayer();
				});
			},
		}),
		[
			bufferedProgress,
			getSources,
			isPausedRef,
			onLoad,
			prefersAudio,
			progress,
			queryClient,
			recording,
			setBufferedProgress,
			setIsPaused,
			setPrefersAudio,
			setProgress,
			setRecording,
			setSources,
			sourceRecordings,
		]
	);

	return (
		<>
			<Script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
			<PlaybackContext.Provider value={playback}>
				{children}
			</PlaybackContext.Provider>
		</>
	);
}

export default function WithMediaContext({ children }: AndMiniplayerProps) {
	return (
		<AndMediaContext>
			<AndPlaybackContext>{children}</AndPlaybackContext>
		</AndMediaContext>
	);
}
