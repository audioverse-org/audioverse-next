import { useQueryClient } from '@tanstack/react-query';
import Script from 'next/script';
import React, { ReactNode, useMemo, useRef, useState } from 'react';
import type * as VideoJs from 'video.js';

import hasVideo from '~lib/media/hasVideo';
import useBuffered from '~src/lib/media/useBuffered';
import useIsPaused from '~src/lib/media/useIsPaused';
import useOnPlayerLoad from '~src/lib/media/useOnPlayerLoad';
import { PlaySource } from '~src/lib/media/usePlaybackSession';
import usePlayer from '~src/lib/media/usePlayer';
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
	paused: () => boolean;
	getTime: () => number;
	setTime: (t: number) => void;
	getProgress: () => number;
	getBufferedProgress: () => number;
	setProgress: (options: {
		percentage: number;
		recordingId?: number | string | undefined;
		updatePlayer?: boolean;
	}) => void;
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
	_setRecording: (
		recording: AndMiniplayerFragment,
		prefersAudio?: boolean,
		source?: PlaySource
	) => void;
};

export const PlaybackContext = React.createContext<PlaybackContextType>({
	player: () => undefined,
	play: () => undefined,
	paused: () => true,
	getTime: () => 0,
	setTime: () => undefined,
	getProgress: () => 0,
	getBufferedProgress: () => 0,
	setProgress: () => undefined,
	loadRecording: () => undefined,
	getDuration: () => 0,
	advanceRecording: () => undefined,
	_setRecording: () => undefined,
});

interface AndMiniplayerProps {
	children: ReactNode;
}

function AndPlaybackContext({ children }: AndMiniplayerProps): JSX.Element {
	// DONE:
	const { player } = usePlayer();
	const { isPaused, setIsPaused } = useIsPaused();
	const onLoad = useOnPlayerLoad();

	// IN PROGRESS:
	const { recording, setRecording } = usePlayerRecording();
	const { progress, setProgress } = useProgress(recording?.id);

	const { prefersAudio, setPrefersAudio } = usePrefersAudio();
	const { sources, setSources } = usePlayerSources();
	const duration = sources[0]?.duration || recording?.duration || 0;
	const { bufferedProgress, setBufferedProgress } = useBuffered({
		recordingId: recording?.id,
		duration,
	});

	// TODO:
	const [sourceRecordings, setSourceRecordings] =
		useState<AndMiniplayerFragment[]>();

	const onLoadRef = useRef<(c: PlaybackContextType) => void>();

	const queryClient = useQueryClient();

	const playback: PlaybackContextType = useMemo(
		() => ({
			play: () => {
				setIsPaused(false);
			},
			paused: () => isPaused,
			player: () => player,
			getTime: () =>
				(!onLoadRef.current && player?.currentTime()) ||
				progress * playback.getDuration() ||
				0,
			setTime: (t: number) => {
				if (!player) return;
				setProgress({ percentage: t / player.duration() });
				player.currentTime(t);
			},
			getDuration: () => {
				return (
					player?.duration() || sources[0]?.duration || recording?.duration || 0
				);
			},
			getProgress: () => progress,
			getBufferedProgress: () => bufferedProgress,
			setProgress: ({ percentage, recordingId, updatePlayer = true }) => {
				setProgress({ percentage, recordingId });
				const duration = playback.getDuration();
				if (!player || !duration || isNaN(duration) || !updatePlayer) {
					return;
				}
				player.currentTime(percentage * duration);
				player.play();
			},
			loadRecording: (
				recordingOrRecordings: AndMiniplayerFragment | AndMiniplayerFragment[],
				recordingId: string | number,
				options = {},
				source?: PlaySource
			) => {
				onLoad(() => {
					const { onLoad, prefersAudio: _prefersAudio } = options;
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

					playback._setRecording(
						newRecording,
						_prefersAudio ?? prefersAudio,
						source
					);
				});
			},
			advanceRecording: () => {
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
			_setRecording: (
				recording: AndMiniplayerFragment,
				prefersAudio: boolean | undefined,
				source: PlaySource | undefined
			) => {
				setSources({ recording, prefersAudio: prefersAudio || false });

				const resetPlayer = () => {
					setIsPaused(true);
					setBufferedProgress(0);

					player?.currentTime(progress * playback.getDuration());

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

				onLoad(resetPlayer);
			},
		}),
		[
			bufferedProgress,
			isPaused,
			onLoad,
			player,
			prefersAudio,
			progress,
			queryClient,
			recording?.duration,
			recording?.id,
			setBufferedProgress,
			setIsPaused,
			setPrefersAudio,
			setProgress,
			setRecording,
			setSources,
			sourceRecordings,
			sources,
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
