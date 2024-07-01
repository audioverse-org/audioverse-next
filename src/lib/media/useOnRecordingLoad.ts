import { useCallback, useContext } from 'react';

import { AndMiniplayerFragment } from '~src/components/templates/__generated__/andMiniplayer';
import { PlaybackContext } from '~src/components/templates/andPlaybackContext';

import useOnPlayerLoad from './useOnPlayerLoad';
import usePlayerRecording from './usePlayerRecording';

export default function useOnRecordingLoad() {
	const onPlayerLoad = useOnPlayerLoad();
	const { recording: loadedRecording } = usePlayerRecording();
	const context = useContext(PlaybackContext);

	const onLoad = useCallback(
		({
			recording,
			prefersAudio,
			fn,
		}: {
			recording?: AndMiniplayerFragment | null;
			prefersAudio?: boolean;
			fn: () => void;
		}) => {
			onPlayerLoad(() => {
				const _prefersAudio = context.getPrefersAudio();
				const shouldLoadRecording =
					recording &&
					(loadedRecording?.id !== recording.id ||
						prefersAudio !== _prefersAudio);

				if (shouldLoadRecording) {
					console.log('loading recording with onLoad: fn');
					context.loadRecording(recording, recording.id, {
						onLoad: fn,
						prefersAudio,
					});
					return;
				}

				const shouldRunImmediately =
					!recording || loadedRecording?.id === recording.id;

				if (shouldRunImmediately) {
					console.log('running fn immediately');
					fn();
				}
			});
		},
		[context, loadedRecording, onPlayerLoad]
	);

	return onLoad;
}
