import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useRouterWatch = (): void => {
	const router = useRouter();

	useEffect(() => {
		const reloadPage = () => {
			router.reload(); //This is the only option that works so far.
		};
		router.events.on('routeChangeComplete', reloadPage);

		return () => {
			router.events.off('routeChangeComplete', reloadPage);
		};
	}, [router]);
};

export default useRouterWatch;
