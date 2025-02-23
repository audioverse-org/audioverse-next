import { useRouter } from 'next/router';
import React from 'react';

import LoadingCards from '~components/molecules/loadingCards';
import NotFoundBase from '~components/organisms/notFound';
import { Must } from '~src/types/types';

type WithFailStateOptions<P> = {
	should404?: (props: P) => boolean;
	isLoading?: (props: P) => boolean;
	Loading?: (props: P) => JSX.Element;
	NotFound?: (props: P) => JSX.Element;
};

const AndFailStates = <P,>({
	Component,
	componentProps,
	options = {},
}: {
	Component: React.FunctionComponent<Must<P>>;
	componentProps: P;
	options?: WithFailStateOptions<P>;
}): JSX.Element => {
	const {
		should404: _should404 = () => false,
		isLoading: _isLoading = () => false,
		Loading = LoadingCards,
		NotFound = NotFoundBase,
	} = options;

	const { isFallback = false } = useRouter() || {};
	const should404 = _should404(componentProps);
	const isLoading = _isLoading(componentProps);

	if (!isFallback && should404) {
		return <NotFound {...(componentProps as Must<P>)} />;
	}

	if (isFallback || isLoading) {
		return <Loading {...(componentProps as Must<P>)} />;
	}

	return <Component {...(componentProps as Must<P>)} />;
};
export default AndFailStates;
