import React from 'react';
import { useIsFetching } from 'react-query';
import TopBarProgress from 'react-topbar-progress-indicator';

import useRouterLoading from '@lib/useRouterLoading';

TopBarProgress.config({
	barColors: {
		'0': '#ff6e6e',
		'1.0': '#ff224a',
	},
	barThickness: 7,
});

const LoadingIndicator = (): JSX.Element | null => {
	const isFetching = useIsFetching();
	const isLoading = useRouterLoading();

	if (isFetching || isLoading) {
		return <TopBarProgress />;
	}

	return null;
};

export default LoadingIndicator;
