import { useRouter } from 'next/router';
import React from 'react';

import LoadingCards from '@components/molecules/loadingCards';
import NotFoundBase from '@components/organisms/notFound';

type WithFailStateOptions<P> = {
	useShould404?: (props: P) => boolean;
	useIsLoading?: (props: P) => boolean;
	Loading?: () => JSX.Element;
	NotFound?: () => JSX.Element;
};

const withFailStates = <P,>(
	Component: React.ComponentType<Must<P>>,
	options: WithFailStateOptions<P> = {}
): ((props: P) => JSX.Element) => {
	const {
		useShould404 = () => false,
		useIsLoading = () => false,
		Loading = LoadingCards,
		NotFound = NotFoundBase,
	} = options;

	function WithFailStates(props: P): JSX.Element {
		const { isFallback = false } = useRouter() || {};
		const should404 = useShould404(props);
		const isLoading = useIsLoading(props);

		if (!isFallback && should404) {
			return <NotFound />;
		}

		if (isFallback || isLoading) {
			return <Loading />;
		}

		return <Component {...(props as never)} />;
	}

	return WithFailStates;
};
export default withFailStates;
