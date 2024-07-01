import { useCallback, useEffect, useState } from 'react';

import { AndMiniplayerFragment } from '~components/templates/__generated__/andMiniplayer';
import { Playable } from '~src/components/templates/andPlaybackContext';

import { getFiles } from './getFiles';
import useOnPlayerLoad from './useOnPlayerLoad';
import usePlayerRecording from './usePlayerRecording';
import usePrefersAudio from './usePrefersAudio';

const findSources = (
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

export default function usePlayerSources() {
	const { recording } = usePlayerRecording();
	const { prefersAudio } = usePrefersAudio();
	const [sources, _setSources] = useState<Playable[]>(
		findSources(recording, prefersAudio)
	);
	const onLoad = useOnPlayerLoad();

	useEffect(() => {
		_setSources(findSources(recording, prefersAudio));
	}, [recording, prefersAudio]);

	const setSources = useCallback(
		({
			recording,
			prefersAudio,
		}: {
			recording: AndMiniplayerFragment;
			prefersAudio: boolean;
		}) => {
			onLoad((player) => {
				const newSources = findSources(recording, prefersAudio);
				_setSources(newSources);
				player.src(newSources);
				const logUrl = newSources.find((s) => s.logUrl)?.logUrl;
				console.log({ logUrl });
				if (logUrl) {
					fetch(logUrl, {
						method: 'HEAD',
						mode: 'no-cors',
					}).catch(() => {
						// We don't want Promise rejections here to clutter the console
					});
				}
			});
		},
		[onLoad]
	);

	return {
		sources,
		setSources,
	};
}
