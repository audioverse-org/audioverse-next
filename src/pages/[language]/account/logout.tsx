import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useLogout } from '~lib/api/useLogout';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';
import { analytics } from '~src/components/atoms/analytics';

export default function Logout(): JSX.Element {
	const router = useRouter();
	const languageRoute = useLanguageRoute();
	const [loggedOut, setLoggedOut] = useState(false);

	useLogout().then(() => setLoggedOut(true));

	useEffect(() => {
		if (loggedOut) {
			analytics.track('User logged out', {
				accountType: 'User',
			});
			analytics.reset(); //This may need to be romeved in production
			router.push(root.lang(languageRoute).discover.get());
		}
	}, [loggedOut, router, languageRoute]);

	return (
		<FormattedMessage id="logout__inProcess" defaultMessage="Logging out..." />
	);
}
