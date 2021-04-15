import React from 'react';

import Login from '@components/molecules/login';
import { useGetWithAuthGuardDataQuery } from '@lib/generated/graphql';

function withAuthGuard<P>(
	Component: React.ComponentType<P>
): React.ComponentType<P> {
	return (props: P) => {
		const { data } = useGetWithAuthGuardDataQuery({}, { retry: false });
		const isUserLoggedIn = !!data?.me?.user.email;

		return isUserLoggedIn ? <Component {...props} /> : <Login />;
	};
}

export default withAuthGuard;
