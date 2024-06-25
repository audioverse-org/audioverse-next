import { getFiles } from './getFiles';
import { AndMiniplayerFragment } from '../../components/templates/__generated__/andMiniplayer';
import { Playable } from '../../components/templates/andPlaybackContext';

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
