import { AndMiniplayerFragment } from '@components/templates/__generated__/andMiniplayer';
import { useContext, useEffect, useState } from 'react';
import { VjsContext } from '@components/templates/andVjs';
import useIsLoaded from '@lib/hooks/useIsLoaded';

export default function useDuration(
	recording: AndMiniplayerFragment | null
): number {
	const context = useContext(VjsContext);
	const isLoaded = useIsLoaded(recording);
	const [duration, setDuration] = useState<number>(0);

	useEffect(() => {
		if (!recording) return;
		if (!isLoaded) setDuration(recording.duration);
		setDuration(context?.getDuration() || 0);
	}, [context, recording, isLoaded]);

	return duration;
}
