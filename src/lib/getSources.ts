import { AndMiniplayerFragment } from './generated/graphql';
import type * as VideoJs from 'video.js';

export interface Playable extends VideoJs.default.Tech.SourceObject {
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

export default function getSources(
	recording: AndMiniplayerFragment,
	prefersAudio: boolean
): Playable[] {
	const files = getFiles(recording, prefersAudio) || [];

	return files.map((f) => ({
		src: f.url,
		type: f.mimeType,
		duration: f.duration,
		logUrl: 'logUrl' in f ? f.logUrl : undefined,
	}));
}
