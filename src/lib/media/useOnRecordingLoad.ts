import { useCallback, useContext } from 'react';

import { AndMiniplayerFragment } from '~src/components/templates/__generated__/andMiniplayer';
import { MediaContext } from '~src/components/templates/andMediaContext';
import { PlaybackContext } from '~src/components/templates/andPlaybackContext';

import useOnPlayerLoad from './useOnPlayerLoad';
import { PlaySource } from './usePlaybackSession';
import usePlayerRecording from './usePlayerRecording';

export default function useOnRecordingLoad() {
	const onPlayerLoad = useOnPlayerLoad();
	const { recording: loadedRecording } = usePlayerRecording();
	const context = useContext(PlaybackContext);
	const { prefersAudio: _prefersAudio } = useContext(MediaContext);

	const onLoad = useCallback(
		({
			recording,
			prefersAudio,
			fn,
			source,
		}: {
			recording?: AndMiniplayerFragment | null;
			prefersAudio?: boolean;
			fn: () => void;
			source?: PlaySource;
		}) => {
			onPlayerLoad(() => {
				const shouldLoadRecording =
					recording &&
					(loadedRecording?.id !== recording.id ||
						prefersAudio !== _prefersAudio);

				if (shouldLoadRecording) {
					context.loadRecording(
						recording,
						recording.id,
						{
							onLoad: fn,
							prefersAudio,
						},
						source
					);
					return;
				}

				const shouldRunImmediately =
					!recording || loadedRecording?.id === recording.id;

				if (shouldRunImmediately) {
					fn();
				}
			});
		},
		[_prefersAudio, context, loadedRecording?.id, onPlayerLoad]
	);

	return onLoad;
}
