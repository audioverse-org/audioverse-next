import { useCallback, useEffect, useState } from 'react';
import useWithVjs from '@lib/hooks/useWithVjs';
import { VjsContextType } from '@components/templates/andVjs';

type UseVjsValueOptions<T> = {
	e: VideoJsEvent | VideoJsEvent[];
	set?: (c: VjsContextType, v: T) => unknown;
	get?: (c: VjsContextType) => T;
	defaultValue?: T;
};

function useVjsValue<T>(
	options: UseVjsValueOptions<T>
): [T | undefined, (v: T) => void] {
	const { e, set, get, defaultValue } = options;
	const [value, _set] = useState<T | undefined>(defaultValue);
	const withVjs = useWithVjs();

	const fn = useCallback(() => {
		withVjs((c) => get && _set(get(c)));
	}, [withVjs, get]);
	const on = useCallback(() => {
		withVjs((c) => c.vjs.on(e, fn));
	}, [withVjs, e, fn]);
	const off = useCallback(() => {
		withVjs((c) => c.vjs.off(e, fn));
	}, [withVjs, e, fn]);

	useEffect(() => {
		fn();
		on();
		return off;
	}, [fn, on, off]);

	const setValue = useCallback(
		(v: T) => {
			withVjs((c) => {
				if (!set) throw new Error('No setter provided');
				off();
				c.vjs.one(e, on);
				set(c, v);
				_set(v);
			});
		},
		[off, on, e, withVjs, set]
	);

	return [value, setValue];
}

export default useVjsValue;
