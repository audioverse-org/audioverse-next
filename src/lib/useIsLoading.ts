import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useIsFetching } from 'react-query';

// https://stackoverflow.com/a/63755519/937377
const useIsLoading = (): boolean => {
	const [loading, setLoading] = useState(false);
	const isFetching = useIsFetching();
	// TODO: Also check useIsMutating()
	useEffect(() => {
		const start = () => {
			setLoading(true);
		};
		const end = () => {
			setLoading(false);
		};
		Router.events.on('routeChangeStart', start);
		Router.events.on('routeChangeComplete', end);
		Router.events.on('routeChangeError', end);
		return () => {
			Router.events.off('routeChangeStart', start);
			Router.events.off('routeChangeComplete', end);
			Router.events.off('routeChangeError', end);
		};
	}, []);
	return loading || isFetching > 0;
};

export default useIsLoading;
