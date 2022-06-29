import clsx from 'clsx';
import React from 'react';

import styles from './loadingIndicator.module.scss';
import { useIntl } from 'react-intl';
import useIsLoading from '@lib/useIsLoading';

const LoadingIndicator: React.VoidFunctionComponent = () => {
	const intl = useIntl();
	const isLoading = useIsLoading();

	return (
		<div
			className={clsx(styles.bar, isLoading && styles.loading)}
			data-testid="loading-indicator"
			aria-label={
				isLoading
					? intl.formatMessage({
							id: 'loadingIndicator.loading',
							defaultMessage: 'Loading...',
					  })
					: ''
			}
		>
			<div />
		</div>
	);
};

export default LoadingIndicator;
