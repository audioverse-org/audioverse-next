import { RefObject, useEffect, useMemo, useState } from 'react';

import isServerSide from '../isServerSide';

export default function useElementWidth(ref: RefObject<HTMLElement>): number {
	const [width, setWidth] = useState(0);

	const observer = useMemo(() => {
		if (isServerSide()) return;
		return new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
	}, []);

	useEffect(() => {
		observer?.observe(ref.current as HTMLElement);
		return () => observer?.disconnect();
	}, [ref, observer]);

	return width;
}
