import {
	PlaybackContext,
	PlaybackContextType,
} from '@components/templates/andPlaybackContext';
import { AndMiniplayerFragment } from '@components/templates/__generated__/andMiniplayer';
import { useContext } from 'react';
import useIsLoaded from '@lib/hooks/useIsLoaded';

type Action = (c: PlaybackContextType) => void;

export default function useWithRecording(
	recording: AndMiniplayerFragment | null,
	options: {
		playlistRecordings?: AndMiniplayerFragment[];
		prefersAudio?: boolean;
	} = {}
): (fn: Action) => void {
	const context = useContext(PlaybackContext);
	const isLoaded = useIsLoaded(recording);

	return (fn: Action) => {
		if (!recording) return;

		if (isLoaded) {
			fn(context);
			return;
		}

		const toLoad = options.playlistRecordings || recording;

		context.loadRecording(toLoad, {
			onLoad: fn,
			prefersAudio: options.prefersAudio,
		});
	};
}
