import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import React from 'react';

const withFailStates = <P extends any>(
	Component: React.ComponentType<P>,
	should404?: (props) => boolean
): React.ComponentType<P> => {
	function WithFailStates(props) {
		const router = useRouter();

		if (!router.isFallback && should404(props)) {
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
