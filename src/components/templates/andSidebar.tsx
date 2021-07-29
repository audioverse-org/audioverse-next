import React, { ReactNode } from 'react';

import Header from '@components/organisms/header';

import styles from './andSidebar.module.scss';
import SearchBar from '@components/molecules/searchBar';

export default function AndSidebar({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	return (
		<div className={styles.base}>
			<div className={styles.header}>
				<Header />
			</div>
			<div className={styles.content}>
				<SearchBar />
				{children}
			</div>
		</div>
	);
}
