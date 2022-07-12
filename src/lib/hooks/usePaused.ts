import useVjsValue from '@lib/hooks/useVjsValue';
import { VjsContext } from '@components/templates/andVjs';
import { useCallback, useContext } from 'react';
import { AndMiniplayerFragment } from '@components/templates/__generated__/andMiniplayer';
import useWithRecording from '@lib/hooks/useWithRecording';

export default function usePaused(
	recording: AndMiniplayerFragment | null,
	options: {
		playlistRecordings?: AndMiniplayerFragment[];
		prefersAudio?: boolean;
	} = {}
): [boolean, (isPaused: boolean) => void] {
	const c = useContext(VjsContext);
	const withRecording = useWithRecording(recording, options);
	const [paused, _setPaused] = useVjsValue({
		e: ['play', 'pause'],
		get: c?.paused,
		set: c?.setIsPaused,
		defaultValue: true,
	});

	const setPaused = useCallback(
		(v) => {
			console.log('setPaused', v);
			withRecording(() => {
				console.log('setPaused >> withRecording', v);
				_setPaused(v);
			});
		},
		[withRecording, _setPaused]
	);

	console.log('usePaused', paused);

	return [paused, setPaused];
}
