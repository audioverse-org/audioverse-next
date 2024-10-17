import { useIsFetching } from '@tanstack/react-query';
import clsx from 'clsx';
import React, { useEffect } from 'react';

import useRouterLoading from '~lib/useRouterLoading';

import styles from './loadingIndicator.module.scss';

const HIDE_DELAY = 1000; //ms

const LoadingIndicator: React.VoidFunctionComponent = () => {
	const isFetching = useIsFetching();
	const isLoading = useRouterLoading();
	const isAnyLoading = !!(isFetching || isLoading);
	const [visible, setVisible] = React.useState(false);

	useEffect(() => {
		if (isAnyLoading) {
			setVisible(true);
		} else {
			const timer = setTimeout(() => setVisible(false), HIDE_DELAY);
			return () => clearTimeout(timer);
		}
	}, [isAnyLoading]);

	return (
		<div
			className={clsx(
				styles.bar,
				visible && styles.visible,
				isAnyLoading && styles.loading,
			)}
			data-testid="loading-indicator"
		>
			<div />
		</div>
	);
};

export default LoadingIndicator;
