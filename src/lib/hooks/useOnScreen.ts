import { RefObject, useEffect, useMemo, useState } from 'react';

import isServerSide from '~lib/isServerSide';

export default function useOnScreen(ref: RefObject<HTMLElement>): boolean {
	const [isIntersecting, setIntersecting] = useState(false);

	const observer = useMemo(
		() =>
			!isServerSide() &&
			new IntersectionObserver(([entry]) =>
				setIntersecting(entry.isIntersecting)
			),
		[]
	);

	useEffect(() => {
		observer && observer.observe(ref.current as HTMLElement);
		return () => {
			observer && observer.disconnect();
		};
	}, [ref, observer]);

	return isIntersecting;
}
