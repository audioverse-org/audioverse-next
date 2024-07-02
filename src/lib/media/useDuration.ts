import { useEffect, useState } from 'react';
import { VideoJsPlayer } from 'video.js';

import { AndMiniplayerFragment } from '~src/components/templates/__generated__/andMiniplayer';

import { findSources } from './findSources';
import usePlayer from './usePlayer';
import usePlayerRecording from './usePlayerRecording';
import usePrefersAudio from './usePrefersAudio';

function getDuration({
	recording,
	loadedRecording,
	player,
	prefersAudio,
}: {
	recording: AndMiniplayerFragment | null | undefined;
	loadedRecording: AndMiniplayerFragment | null;
	prefersAudio: boolean;
	player: VideoJsPlayer | null;
}): number {
	const isLoaded =
		!!recording && !!loadedRecording && loadedRecording.id === recording.id;

	if (player && (!recording || isLoaded)) {
		const pdur = player?.duration();

		return isNaN(pdur) ? 0 : pdur;
	}

	if (!recording) return 0;

	const sources = findSources(recording, prefersAudio);

	return sources[0]?.duration || recording.duration;
}

export default function useDuration(recording?: AndMiniplayerFragment | null) {
	const { recording: loadedRecording } = usePlayerRecording();
	const { prefersAudio } = usePrefersAudio();
	const { player } = usePlayer();
	const [duration, setDuration] = useState<number>(0);

	useEffect(() => {
		setDuration(
			getDuration({
				recording,
				loadedRecording,
				player,
				prefersAudio,
			})
		);
	}, [loadedRecording, player, prefersAudio, recording]);

	return duration;
}
