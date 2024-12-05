import React from 'react';

import Login from '~components/molecules/login';
import { getCurrentRequest } from '~lib/api/storeRequest';
import { getSessionToken } from '~lib/cookies';
import useIsAuthenticated from '~lib/hooks/useIsAuthenticated';

function AndAuthGuard({
	children,
	LoggedOutComponent = Login,
}: {
	children: React.ReactNode;
	LoggedOutComponent?: React.ComponentType;
}) {
	const sessionToken = getSessionToken(getCurrentRequest());
	const { isUserLoggedIn, isFetching } = useIsAuthenticated();

	return (sessionToken && isFetching) || isUserLoggedIn ? (
		children
	) : (
		<LoggedOutComponent />
	);
}

export default AndAuthGuard;
