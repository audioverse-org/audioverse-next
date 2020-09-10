import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import React from 'react';

const withFailStates = <P extends any>(
	Component: React.ComponentType<P>,
	dependencyKey?: string
): React.ComponentType<P> => {
	function WithFailStates(props) {
		const router = useRouter();

		if (!router.isFallback && !props[dependencyKey]) {
			return <ErrorPage statusCode={404} />;
		}

		if (router.isFallback) {
			return <h1>Loading…</h1>;
		}

		return <Component {...(props as P)} />;
	}
	return WithFailStates;
};
export default withFailStates;
