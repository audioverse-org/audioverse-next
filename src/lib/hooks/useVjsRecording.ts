import useVjsValue from '@lib/hooks/useVjsValue';
import videojs from 'video.js';
import SourceObject = videojs.Tech.SourceObject;
import { AndMiniplayerFragment } from '@components/templates/__generated__/andMiniplayer';
import { useCallback, useState } from 'react';

export default function useVjsRecording() {
	const [, setSrc] = useVjsValue<SourceObject[]>({
		e: 'loadeddata',
		set: (vjs, v) => vjs.src(v),
	});

	const [rec, setRec] = useState<AndMiniplayerFragment>();

	const setRecording = useCallback(
		(recording: AndMiniplayerFragment | null) => {
			if (!recording) return;
			setRec(recording);
			setSrc(getSources(recording, false));
		},
		[setRec, setSrc]
	);

	return [rec, setRecording];
}
