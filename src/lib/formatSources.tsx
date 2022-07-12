import { AndMiniplayerFragment } from '@lib/generated/graphql';
import * as VideoJs from 'video.js';

export interface Playable extends VideoJs.default.Tech.SourceObject {
	duration: number;
	logUrl?: string | null;
}

type Files =
	| AndMiniplayerFragment['audioFiles']
	| AndMiniplayerFragment['videoFiles']
	| AndMiniplayerFragment['videoStreams'];

const getFiles = (
	recording: AndMiniplayerFragment,
	prefersAudio: boolean
): Files => {
	if (!recording) return [];

	const { videoStreams = [], videoFiles = [], audioFiles = [] } = recording;

	if (prefersAudio) return audioFiles;
	if (videoStreams.length > 0) return videoStreams;
	if (videoFiles.length > 0) return videoFiles;

	return audioFiles;
};

export const formatSources = (
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
