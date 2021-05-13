import React from 'react';

import Login from '@components/molecules/login';
import { useGetWithAuthGuardDataQuery } from '@lib/generated/graphql';

function withAuthGuard<P>(
	Component: React.ComponentType<P>
): React.ComponentType<P> {
	return (props: P) => {
		const { data } = useGetWithAuthGuardDataQuery({}, { retry: false });
		const isUserLoggedIn = !!data?.me?.user.email;

		// TODO: Fix login flash while data is loading when user actually is already logged in
		return isUserLoggedIn ? <Component {...props} /> : <Login />;
	};
}

export default withAuthGuard;
