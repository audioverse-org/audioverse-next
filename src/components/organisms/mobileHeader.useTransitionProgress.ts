import React, { useCallback, useEffect, useState } from 'react';
import isServerSide from '@lib/isServerSide';

function useScrollTop(scrollRef: React.RefObject<HTMLDivElement>) {
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

export function useTransitionProgress(
	scrollRef: React.RefObject<HTMLDivElement>,
	threshold: number
) {
	const [lastScrollTop, setLastScrollTop] = useState<number>(0);
	const [startPosition, setStartPosition] = useState<number>(0);
	const [progress, setProgress] = useState<number>(0);
	const scrollTop = useScrollTop(scrollRef);

	useEffect(() => {
		if (isServerSide()) return;

		const isScrollingUp = scrollTop < lastScrollTop;
		const isProgressing =
			isScrollingUp && startPosition + threshold < scrollTop;
		const isRegressing = !isScrollingUp && startPosition > scrollTop;

		if (isProgressing) {
			setStartPosition(Math.max(lastScrollTop - threshold, 0));
		} else if (isRegressing) {
			setStartPosition(scrollTop);
		}

		const distanceScrolled = scrollTop - startPosition;
		const clampedDistance = Math.max(Math.min(distanceScrolled, threshold), 0);
		const progress = clampedDistance / threshold;

		setProgress(progress);
		setLastScrollTop(scrollTop);
	}, [lastScrollTop, scrollTop, startPosition, threshold]);

	return progress;
}
