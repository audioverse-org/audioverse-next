import React from 'react';

import Login from '~components/molecules/login';
import { getCurrentRequest } from '~lib/api/storeRequest';
import { getSessionToken } from '~lib/cookies';

import { useGetWithAuthGuardDataQuery } from './__generated__/withAuthGuard';

function withAuthGuard<P extends React.JSX.IntrinsicAttributes>(
	Component: React.ComponentType<P>,
	LoggedOutComponent: React.ComponentType = Login
): React.ComponentType<P> {
	function WithAuthGuard(props: P) {
		const sessionToken = getSessionToken(getCurrentRequest());
		const { data, isLoading } = useGetWithAuthGuardDataQuery(
			{},
			{ retry: false }
		);
		const isUserLoggedIn = !!data?.me?.user.email;

		return (sessionToken && isLoading) || isUserLoggedIn ? (
			<Component {...props} />
		) : (
			<LoggedOutComponent />
		);
	}
	return WithAuthGuard;
}

export default withAuthGuard;
