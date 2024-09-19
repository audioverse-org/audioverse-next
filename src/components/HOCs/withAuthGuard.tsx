import React from 'react';

import Login from '~components/molecules/login';
import { getCurrentRequest } from '~lib/api/storeRequest';
import { getSessionToken } from '~lib/cookies';
import useIsAuthenticated from '~lib/hooks/useIsAuthenticated';

function withAuthGuard<P extends React.JSX.IntrinsicAttributes>(
	Component: React.ComponentType<P>,
	LoggedOutComponent: React.ComponentType = Login
): React.ComponentType<P> {
	function WithAuthGuard(props: P) {
		const sessionToken = getSessionToken(getCurrentRequest());
		const { isUserLoggedIn, isLoading } = useIsAuthenticated();

		return (sessionToken && isLoading) || isUserLoggedIn ? (
			<Component {...props} />
		) : (
			<LoggedOutComponent />
		);
	}
	return WithAuthGuard;
}

export default withAuthGuard;
