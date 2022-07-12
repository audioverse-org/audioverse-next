// import throttle from 'lodash/throttle';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
// import { useMutation, useQueryClient } from 'react-query';
// import type * as VideoJs from 'video.js';
import type { VideoJsPlayer } from 'video.js';

// import { getSessionToken } from '@lib/cookies';
// import { Maybe, Scalars } from '@src/__generated__/graphql';
// import hasVideo from '@lib/hasVideo';
// import styles from '@components/templates/andMiniplayer.module.scss';
import dynamic from 'next/dynamic';
import { AndMiniplayerFragment } from '@components/templates/__generated__/andMiniplayer';
import videojs from 'video.js';
import SourceObject = videojs.Tech.SourceObject;
// import {
// 	AndMiniplayerFragment,
// 	GetRecordingPlaybackProgressQuery,
// 	recordingPlaybackProgressSet,
// 	RecordingPlaybackProgressSetMutationVariables,
// } from '@components/templates/__generated__/andMiniplayer';

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

// export const shouldLoadRecordingPlaybackProgress = (
// 	recording: AndMiniplayerFragment | null | undefined
// ) =>
// 	!!recording?.id &&
// 	!(recording.id + '').includes('/') && // Bible ids
// 	!!getSessionToken();
// t;
// type SetEventHandler = (
// 	event: VideoJsEvent | VideoJsEvent[],
// 	callback: (...args: unknown[]) => void
// ) => void;

export type VjsContextType = {
	vjs: VideoJsPlayer;
	recording?: AndMiniplayerFragment;
	setRecording: (recording: AndMiniplayerFragment) => void;
};

export const VjsContext = React.createContext<VjsContextType | undefined>(
	undefined
);

interface AndVjsProps {
	children: ReactNode;
}

// const SERVER_UPDATE_WAIT_TIME = 5 * 1000;

interface Playable extends SourceObject {
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

export default function AndVjs({ children }: AndVjsProps): JSX.Element {
	const [vjs, setVjs] = useState<VideoJsPlayer>();
	const recording = useRef<AndMiniplayerFragment>();

	const context = useMemo(() => {
		if (!vjs) return;
		return {
			vjs,
			recording: recording.current,
			setRecording: (rec: AndMiniplayerFragment) => {
				if (recording.current === rec) return;
				vjs.src(getSources(rec, false));
				recording.current = rec;
			},
		};
	}, [vjs, recording]);

	return (
		<VjsContext.Provider value={context}>
			<LazyVideoPlayer onLoad={setVjs} />
			{children}
		</VjsContext.Provider>
	);
}
