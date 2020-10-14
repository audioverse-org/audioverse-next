import React from 'react';

import styles from './header.module.scss';

const Header = () => (
	<header className={styles.header}>
		<h1>AudioVerse</h1>
		<input placeholder={'Search'} />
	</header>
);

export default Header;
