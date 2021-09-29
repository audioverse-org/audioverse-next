import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import React from 'react';

import LoadingCards from '@components/molecules/loadingCards';

const withFailStates = <P extends any>(
	Component: React.ComponentType<Must<P>>,
	should404?: (props: P) => boolean
): React.ComponentType<P> => {
	function WithFailStates(props: P) {
		const { isFallback = false } = useRouter() || {};

		if (!isFallback && should404 && should404(props)) {
			return <ErrorPage statusCode={404} />;
		}

		if (isFallback) {
			return <LoadingCards />;
		}

		return <Component {...(props as any)} />;
	}
	return WithFailStates;
};
export default withFailStates;
