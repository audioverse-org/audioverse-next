import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { makeDiscoverRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

export default function LoginRedirect(): JSX.Element {
	const router = useRouter();
	const route = useLanguageRoute();

	useEffect(() => {
		router.push(makeDiscoverRoute(route));
	}, [router, route]);

	return (
		<FormattedMessage
			id="loginRedirect__message"
			defaultMessage="Redirecting..."
		/>
	);
}
