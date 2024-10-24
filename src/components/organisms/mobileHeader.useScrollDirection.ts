import { useEffect, useState } from 'react';

import useScrollTop from '~src/lib/hooks/useScrollTop';

export const SCROLL_DIRECTIONS = {
	UP: 'up',
	DOWN: 'down',
};

export default function useScrollDirection(
	scrollRef: React.RefObject<HTMLDivElement>,
) {
	const scrollTop = useScrollTop(scrollRef);
	const [lastScrollTop, setLastScrollTop] = useState<number>(0);
	const [direction, setDirection] = useState<string>(SCROLL_DIRECTIONS.UP);

	useEffect(() => {
		setLastScrollTop(Math.max(scrollTop, 0));
	}, [scrollTop]);

	useEffect(() => {
		const scrollHeight = scrollRef.current?.scrollHeight || 0;
		const clientHeight = scrollRef.current?.clientHeight || 0;
		const clientTop = scrollHeight - scrollTop;
		const buffer = clientTop - clientHeight;
		const maxHeaderHeight = 101;
		if (buffer < maxHeaderHeight) return;
		if (scrollTop > lastScrollTop) {
			setDirection(SCROLL_DIRECTIONS.DOWN);
		}
		if (scrollTop < lastScrollTop) {
			setDirection(SCROLL_DIRECTIONS.UP);
		}
	}, [scrollTop, lastScrollTop, scrollRef]);

	return direction;
}
