import React, { ReactNode } from 'react';

import Header from '@components/organisms/header';

import styles from './andSidebar.module.scss';

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
				<p>Search</p>
				{children}
			</div>
		</div>
	);
}
