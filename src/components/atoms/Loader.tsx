import clsx from 'clsx';
import React from 'react';

import styles from './loader.module.scss';

const Loader: React.FC = () => {
	return (
		<div className={clsx(styles.loader_wrapper)}>
			<div className={clsx(styles.placeholder, styles.placeholder_text)} />
			<div className={clsx(styles.placeholder, styles.placeholder_text)} />
		</div>
	);
};

export default Loader;
