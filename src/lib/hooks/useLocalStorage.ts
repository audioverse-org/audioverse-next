import { useCallback, useEffect, useState } from 'react';

import isServerSide from '../isServerSide';

function getLocalValue(key: string) {
	if (isServerSide()) return;
	return window.localStorage.getItem(key);
}

export function useLocalStorage<T>(
	key: string,
	defaultValue: T,
): [T, (v: T) => void] {
	const [value, _setValue] = useState<T>(defaultValue);

	const setValue = useCallback(
		(v: T) => {
			localStorage.setItem(key, JSON.stringify(v));
			_setValue(v);
		},
		[key],
	);

	useEffect(() => {
		if (isServerSide()) return;
		const localValue = getLocalValue(key);
		setValue(localValue ? JSON.parse(localValue) : defaultValue);
	}, [key, defaultValue, setValue]);

	return [value, setValue];
}
