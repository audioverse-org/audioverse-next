import React from 'react';
import { useIsFetching } from 'react-query';
import TopBarProgress from 'react-topbar-progress-indicator';

TopBarProgress.config({
	barColors: {
		'0': '#760279',
		'1.0': '#ff001e',
	},
	barThickness: 7,
});

const LoadingIndicator = (): JSX.Element | null => {
	const isFetching = useIsFetching();

	if (isFetching) {
		console.log('fetching...');
		return <TopBarProgress />;
	}

	return null;
};

export default LoadingIndicator;
