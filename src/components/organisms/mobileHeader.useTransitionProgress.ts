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
	transitionLength: number
) {
	const [lastScrollTop, setLastScrollTop] = useState<number>(0);
	const [startPosition, setStartPosition] = useState<number>(0);
	const [progress, setProgress] = useState<number>(0);
	const scrollTop = useScrollTop(scrollRef);

	useEffect(() => {
		if (isServerSide()) return;

		const isScrollingUp = scrollTop < lastScrollTop;

		if (isScrollingUp && startPosition + transitionLength < scrollTop) {
			setStartPosition(Math.max(lastScrollTop - transitionLength, 0));
		} else if (!isScrollingUp && startPosition > scrollTop) {
			setStartPosition(scrollTop);
		}

		const distanceScrolled = scrollTop - startPosition;
		const clampedDistance = Math.max(
			Math.min(distanceScrolled, transitionLength),
			0
		);
		const progress = clampedDistance / transitionLength;

		setProgress(progress);
		setLastScrollTop(scrollTop);
	}, [lastScrollTop, scrollTop, startPosition, transitionLength]);

	return progress;
}
