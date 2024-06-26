import { useEffect, useRef } from 'react';

import { AndMiniplayerFragment } from '~components/templates/__generated__/andMiniplayer';
import { Playable } from '~src/components/templates/andPlaybackContext';

import { getFiles } from './getFiles';

const findSources = (
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

export default function usePlayerSources({
	recording,
	prefersAudio,
}: {
	recording?: AndMiniplayerFragment | null;
	prefersAudio: boolean;
}) {
	const sourcesRef = useRef<Playable[]>([]);

	useEffect(() => {
		if (!recording) return;
		sourcesRef.current = findSources(recording, prefersAudio);
	}, [recording, prefersAudio]);

	return {
		getSources: () => sourcesRef.current,
		setSources: ({
			recording,
			prefersAudio,
		}: {
			recording: AndMiniplayerFragment;
			prefersAudio: boolean;
		}) => {
			sourcesRef.current = findSources(recording, prefersAudio);
		},
	};
}
