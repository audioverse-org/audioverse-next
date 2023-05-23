import { useEffect, useMemo, useState } from 'react';

import isServerSide from '../isServerSide';

export default function useElementWidth(el: HTMLElement | null): number {
	const [width, setWidth] = useState(0);

	const observer = useMemo(() => {
		if (isServerSide()) return;
		return new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
	}, []);

	useEffect(() => {
		if (!el || !observer) return;
		observer.observe(el);
		return () => observer.disconnect();
	}, [el, observer]);

	return width;
}
