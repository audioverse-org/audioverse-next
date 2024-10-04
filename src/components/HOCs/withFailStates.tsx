import { useRouter } from 'next/router';
import React from 'react';

import LoadingCards from '~components/molecules/loadingCards';
import NotFoundBase from '~components/organisms/notFound';
import { Must } from '~src/types/types';

type WithFailStateOptions<P> = {
	useShould404?: (props: P) => boolean;
	useIsLoading?: (props: P) => boolean;
	Loading?: (props: P) => JSX.Element;
	NotFound?: (props: P) => JSX.Element;
};

const withFailStates = <P,>(
	Component: React.ComponentType<Must<P>>,
	options: WithFailStateOptions<P> = {},
): React.ComponentType<P> => {
	const {
		useShould404 = () => false,
		useIsLoading = () => false,
		Loading = LoadingCards,
		NotFound = NotFoundBase,
	} = options;

	function WithFailStates(props: P) {
		const { isFallback = false } = useRouter() || {};
		const should404 = useShould404(props);
		const isLoading = useIsLoading(props);

		if (!isFallback && should404) {
			return <NotFound {...(props as Must<P>)} />;
		}

		if (isFallback || isLoading) {
			return <Loading {...(props as Must<P>)} />;
		}

		return <Component {...(props as Must<P>)} />;
	}

	return WithFailStates;
};
export default withFailStates;
