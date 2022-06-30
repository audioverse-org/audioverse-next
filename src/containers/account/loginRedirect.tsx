import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import useLanguageRoute from '@lib/useLanguageRoute';
import { makeDiscoverRoute } from '@lib/routes/makeDiscoverRoute';
import { isRedirectRouteAllowed } from '@lib/isRedirectRouteAllowed';

export default function LoginRedirect(): JSX.Element {
	const router = useRouter();
	const route = useLanguageRoute();

	useEffect(() => {
		const backRoute = router.query.back as string;
		router.push(
			backRoute && isRedirectRouteAllowed(backRoute)
				? backRoute
				: makeDiscoverRoute(route)
		);
	}, [router, route]);

	return (
		<FormattedMessage
			id="loginRedirect__message"
			defaultMessage="Redirecting..."
		/>
	);
}
