import { useCallback, useEffect, useState } from 'react';

import isServerSide from '../isServerSide';

export default function useScrollTop(
	scrollRef: React.RefObject<HTMLDivElement>
) {
	const [scrollTop, setScrollTop] = useState<number>(0);

	const listener = useCallback(() => {
		if (isServerSide() || !scrollRef.current) return;
		setScrollTop(scrollRef.current.scrollTop);
	}, [scrollRef]);

	useEffect(() => {
		if (isServerSide() || !scrollRef.current) return;
		const el = scrollRef.current;
		el.addEventListener('scroll', listener);
		return () => el.removeEventListener('scroll', listener);
	}, [listener, scrollRef]);

	return scrollTop;
}
