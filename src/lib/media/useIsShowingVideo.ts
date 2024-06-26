import { useRef } from 'react';

import { AndMiniplayerFragment } from '~src/components/templates/__generated__/andMiniplayer';

import hasVideo from './hasVideo';

export default function useIsShowingVideo({
	recording,
	prefersAudio,
}: {
	recording?: AndMiniplayerFragment | null;
	prefersAudio: boolean;
}) {
	const isShowingVideoRef = useRef(false);
	isShowingVideoRef.current =
		!!recording && hasVideo(recording) && !prefersAudio;

	return isShowingVideoRef.current;
}
