import { AndMiniplayerFragment } from '~components/templates/__generated__/andMiniplayer';
import { Playable } from '~src/components/templates/andPlaybackContext';
import { getFiles } from './getFiles';

export const findSources = (
	recording: AndMiniplayerFragment | null,
	prefersAudio: boolean
): Playable[] => {
	if (!recording) {
		return [];
	}

	const files = getFiles(recording, prefersAudio) || [];

	return files.map((f) => ({
		src: f.url,
		type: f.mimeType,
		duration: f.duration,
		logUrl: 'logUrl' in f ? f.logUrl : undefined,
	}));
};
