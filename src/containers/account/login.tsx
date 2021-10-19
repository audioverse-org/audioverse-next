import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import withAuthGuard from '@components/HOCs/withAuthGuard';
import { makeDiscoverRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

function Login(): JSX.Element {
	const router = useRouter();
	const route = useLanguageRoute();

	useEffect(() => {
		router.push(makeDiscoverRoute(route));
	}, [router, route]);

	return <>redirecting...</>;
}

export default withAuthGuard(Login);
