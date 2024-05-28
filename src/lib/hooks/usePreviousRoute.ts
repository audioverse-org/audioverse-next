import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

const usePreviousRoute = () => {
	const router = useRouter();
	const previousRouteRef = useRef(null);

	useEffect(() => {
		const handleRouteChange = (url: null) => {
			previousRouteRef.current = url;
		};

		router.events.on('routeChangeStart', handleRouteChange);

		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
		};
	}, [router]);

	return previousRouteRef.current;
};

export default usePreviousRoute;
