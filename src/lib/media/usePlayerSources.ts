import { useCallback, useEffect, useState } from 'react';

import { AndMiniplayerFragment } from '~components/templates/__generated__/andMiniplayer';
import { Playable } from '~src/components/templates/andPlaybackContext';

import { findSources } from './findSources';
import useOnPlayerLoad from './useOnPlayerLoad';
import usePlayerRecording from './usePlayerRecording';
import usePrefersAudio from './usePrefersAudio';

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
