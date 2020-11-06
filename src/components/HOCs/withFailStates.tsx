import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import React from 'react';

const withFailStates = <P extends any>(
	Component: React.ComponentType<P>,
	should404?: (props: P) => boolean
): React.ComponentType<P> => {
	function WithFailStates(props: P) {
		const { isFallback = false } = useRouter() || {};

		if (!isFallback && should404 && should404(props)) {
			return <ErrorPage statusCode={404} />;
		}

		if (isFallback) {
			return <h1>Loading…</h1>;
		}

		return <Component {...(props as any)} />;
	}
	return WithFailStates;
};
export default withFailStates;
