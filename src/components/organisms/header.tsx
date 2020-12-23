import React from 'react';

import LoadingIndicator from '@components/molecules/loadingIndicator';

import styles from './header.module.scss';

const Header = (): JSX.Element => (
	<header className={styles.header}>
		<h1>AudioVerse</h1>
		<input placeholder={'Search'} />
		<LoadingIndicator />
	</header>
);

export default Header;
