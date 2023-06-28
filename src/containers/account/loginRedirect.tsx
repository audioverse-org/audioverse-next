import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import root, { isRedirectRouteAllowed } from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';

export default function LoginRedirect(): JSX.Element {
	const router = useRouter();
	const route = useLanguageRoute();

	useEffect(() => {
		const backRoute = router.query.back as string;
		router.push(
			backRoute && isRedirectRouteAllowed(backRoute)
				? backRoute
				: root.lang(route).discover.get()
		);
	}, [router, route]);

	return (
		<FormattedMessage
			id="loginRedirect__message"
			defaultMessage="Redirecting..."
		/>
	);
}
