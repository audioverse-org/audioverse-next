import { useCallback, useEffect, useMemo, useState } from 'react';

import { AndMiniplayerFragment } from '~src/components/templates/__generated__/andMiniplayer';

import useOnRecordingLoad from './useOnRecordingLoad';
import usePlayer from './usePlayer';
import usePlayerRecording from './usePlayerRecording';

export default function useIsPaused(recording?: AndMiniplayerFragment | null) {
	const { player } = usePlayer();
	const { recording: loadedRecording } = usePlayerRecording();
	const [_isPaused, _setIsPaused] = useState(player?.paused() ?? true);
	const onLoad = useOnRecordingLoad();

	useEffect(() => {
		const onPause = () => {
			_setIsPaused(true);
		};
		const onPlay = () => {
			_setIsPaused(false);
		};

		player?.on('pause', onPause);
		player?.on('play', onPlay);

		return () => {
			player?.off('pause', onPause);
			player?.off('play', onPlay);
		};
	}, [player]);

	const isPaused = useMemo(() => {
		if (!loadedRecording) {
			return true;
		}

		if (!recording || recording.id === loadedRecording?.id) {
			return _isPaused;
		}

		return true;
	}, [_isPaused, loadedRecording, recording]);

	const setIsPaused = useCallback(
		(paused: boolean): void => {
			onLoad({
				recording,
				fn: () => {
					if (paused) {
						player?.pause();
					} else {
						player?.play();
					}
				},
			});
		},
		[onLoad, player, recording]
	);

	return useMemo(
		() => ({
			isPaused,
			setIsPaused,
		}),
		[isPaused, setIsPaused]
	);
}
