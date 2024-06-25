import { useRef, useState } from 'react';

export default function useIsPaused() {
	const isPausedRef = useRef<boolean>(true);
	const [isPaused, setIsPaused] = useState<boolean>(true);

	return {
		isPausedRef,
		isPaused: isPausedRef.current ?? isPaused,
		setIsPaused: (paused: boolean) => {
			isPausedRef.current = paused;
			setIsPaused(paused);
		},
	};
}
