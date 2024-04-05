import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { useGetProfileDataQuery } from '~containers/account/__generated__/profile';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';
import { analytics } from '~src/lib/analytics';

export default function LoginRedirect(): JSX.Element {
	const router = useRouter();
	const route = useLanguageRoute();
	const { data } = useGetProfileDataQuery() || {};

	useEffect(() => {
		const d = data?.me?.user;
		if (d) {
			analytics.identify('user_' + d?.id, {
				id: d?.id,
				firstName: d?.givenName,
				lastName: d?.surname,
				email: d?.email,
			});
			analytics.track('Login');
			//const backRoute = router.query.back as string;
			router.push(root.lang(route).discover.get());
		}
	}, [router, route, data]);

	return (
		<FormattedMessage
			id="loginRedirect__message"
			defaultMessage="Redirecting..."
		/>
	);
}
