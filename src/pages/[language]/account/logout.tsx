import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useLogout } from '~lib/api/useLogout';
import root from '~lib/routes';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import { analytics } from '~src/lib/analytics';

export default function Logout(): JSX.Element {
	const router = useRouter();
	const languageRoute = useLanguageRoute();
	const [loggedOut, setLoggedOut] = useState(false);

	useLogout().then(() => setLoggedOut(true));

	useEffect(() => {
		if (loggedOut) {
			analytics.reset();
			router.push(root.lang(languageRoute).discover.get());
		}
	}, [loggedOut, router, languageRoute]);

	return (
		<FormattedMessage id="logout__inProcess" defaultMessage="Logging out..." />
	);
}
