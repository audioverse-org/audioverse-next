import React from 'react';

import Login from '@components/molecules/login';
import { useGetWithAuthGuardDataQuery } from '@lib/generated/graphql';

function withAuthGuard<P>(
	Component: React.ComponentType<P>,
	LoggedOutComponent: React.ComponentType = Login
): React.ComponentType<P> {
	return (props: P) => {
		const { data } = useGetWithAuthGuardDataQuery({}, { retry: false });
		const isUserLoggedIn = !!data?.me?.user.email;

		// TODO: Fix login flash while data is loading when user actually is
		//  already logged in. Perhaps wait to display anything until query
		//  has returned something.
		return isUserLoggedIn ? <Component {...props} /> : <LoggedOutComponent />;
	};
}

export default withAuthGuard;
