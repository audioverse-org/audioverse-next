import { useCallback, useEffect, useRef, useState } from 'react';
import { clearTimeout } from 'timers';
import Timeout = NodeJS.Timeout;

export function useExponentialBackoff<T>(
	get: () => T
): [T | undefined, () => void] {
	const [value, setValue] = useState<T>();
	const ms = useRef(250);
	const timeout = useRef<Timeout>();

	const fn = useCallback(() => {
		timeout.current && clearTimeout(timeout.current);
		const v = get();
		setValue(v);
		console.log('useExponentialBackoff', v);
		if (v) return;
		ms.current *= 2;
		timeout.current = setTimeout(fn, ms.current);
	}, [get]);

	useEffect(() => {
		fn();
		return () => timeout.current && clearTimeout(timeout.current);
	}, [fn]);

	return [value, () => (ms.current = 250)];
}
