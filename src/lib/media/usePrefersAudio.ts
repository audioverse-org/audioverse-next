import { useCallback, useContext, useMemo } from 'react';

import { MediaContext } from '~src/components/templates/andMediaContext';

import useIsPaused from './useIsPaused';

export default function usePrefersAudio(): {
	prefersAudio: boolean;
	setPrefersAudio: (prefersAudio: boolean) => void;
} {
	const context = useContext(MediaContext);
	const { setIsPaused } = useIsPaused();

	const setPrefersAudio = useCallback(
		(prefersAudio: boolean): void => {
			console.log('setPrefersAudio', prefersAudio);
			context.setPrefersAudio(prefersAudio);
			setIsPaused(true);
		},
		[context, setIsPaused]
	);

	return useMemo(
		() => ({
			prefersAudio: context.prefersAudio,
			setPrefersAudio,
		}),
		[context.prefersAudio, setPrefersAudio]
	);
}
