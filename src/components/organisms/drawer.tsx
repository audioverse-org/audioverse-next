import clsx from 'clsx';
import { Router } from 'next/router';
import React, { useEffect } from 'react';

import Header from '~components/organisms/header';
import Navigation from '~components/organisms/navigation';

import styles from './drawer.module.scss';

export default function Drawer({
	showingMenu,
	onExit,
	onSearchChange,
	searchTerm,
}: {
	showingMenu: boolean;
	onExit: () => void;
	onSearchChange: (term: string | undefined) => void;
	searchTerm?: string;
}): JSX.Element {
	useEffect(() => {
		Router.events.on('routeChangeStart', onExit);
		return () => Router.events.off('routeChangeStart', onExit);
	}, [onExit]);

	useEffect(() => {
		const body = document.getElementsByTagName('body')[0];
		body.classList.toggle('scrollDisabledMobile', showingMenu);
	}, [showingMenu]);

	return (
		<div className={clsx(styles.drawer, showingMenu && styles.open)}>
			<div className={styles.header}>
				<Header />
			</div>
			<div className={styles.navigation}>
				<Navigation
					onExit={onExit}
					searchTerm={searchTerm}
					onSearchChange={onSearchChange}
				/>
			</div>
		</div>
	);
}
