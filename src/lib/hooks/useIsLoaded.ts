import { useContext } from 'react';
import { VjsContext } from '@components/templates/andVjs';
import { AndMiniplayerFragment } from '@components/templates/__generated__/andMiniplayer';
import useVjsValue from '@lib/hooks/useVjsValue';
import videojs from 'video.js';
import ReadyState = videojs.ReadyState;

export default function useIsLoaded(recording: AndMiniplayerFragment | null) {
	const c = useContext(VjsContext);
	const [readyState] = useVjsValue<ReadyState>({
		e: ['canplay'],
		get: (c) => c.vjs.readyState(),
		defaultValue: ReadyState.HaveNothing,
	});

	if (!c) return false;
	if (!recording) return false;
	if (readyState === ReadyState.HaveNothing) return false;

	return recording?.id === c?.recording?.id;
}
