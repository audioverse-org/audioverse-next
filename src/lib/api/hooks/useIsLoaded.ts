import { useContext } from 'react';
import { PlaybackContext } from '@components/templates/andPlaybackContext';
import { AndMiniplayerFragment } from '@components/templates/__generated__/andMiniplayer';

export default function useIsLoaded(recording: AndMiniplayerFragment | null) {
	const context = useContext(PlaybackContext);

	const loadedRecording = context.getRecording();

	if (!recording) return false;

	if (!loadedRecording) return false;

	return loadedRecording.id === recording.id;
}
