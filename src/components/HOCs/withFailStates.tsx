import { useRouter } from 'next/router';
import React from 'react';

import LoadingCards from '@components/molecules/loadingCards';
import NotFound from '@components/organisms/notFound';

const withFailStates = <P,>(
	Component: React.ComponentType<Must<P>>,
	should404?: (props: P) => boolean
): React.ComponentType<P> => {
	function WithFailStates(props: P) {
		const { isFallback = false } = useRouter() || {};

		if (!isFallback && should404 && should404(props)) {
			return <NotFound />;
		}

		if (isFallback) {
			return <LoadingCards />;
		}

		return <Component {...(props as Must<P>)} />;
	}
	return WithFailStates;
};
export default withFailStates;
