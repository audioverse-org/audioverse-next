import clsx from 'clsx';
import React from 'react';

import Header from '@components/organisms/header';
import Navigation from '@components/organisms/navigation';

import styles from '../templates/andNavigation.module.scss';

export default function Drawer({
	showingMenu,
	onExit,
	onSearchChange,
	searchTerm,
}: {
	showingMenu: boolean;
	onExit: () => void;
	onSearchChange: (term: string) => void;
	searchTerm: string;
}): JSX.Element {
	return (
		<div
			className={clsx(styles.navigation, showingMenu && styles.navigationShown)}
		>
			<div className={styles.header}>
				<Header />
			</div>
			<Navigation
				onExit={onExit}
				searchTerm={searchTerm}
				onSearchChange={onSearchChange}
			/>
		</div>
	);
}
