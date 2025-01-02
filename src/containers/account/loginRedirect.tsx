import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import root from '~lib/routes';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';

export default function LoginRedirect(): JSX.Element {
	const router = useRouter();
	const route = useLanguageRoute();

	useEffect(() => {
		//const backRoute = router.query.back as string;
		router.push(root.lang(route).discover.get());
	}, [router, route]);

	return (
		<FormattedMessage
			id="loginRedirect__message"
			defaultMessage="Redirecting..."
		/>
	);
}
