import clsx from 'clsx';
import { Router, useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';

import SearchBar from '@components/molecules/searchBar';
import Header from '@components/organisms/header';
import Navigation from '@components/organisms/navigation';

import MenuIcon from '../../../public/img/icon-menu.svg';
import SearchIcon from '../../../public/img/icon-search.svg';

import styles from './andNavigation.module.scss';

export default function AndNavigation({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	const {
		query: { q },
	} = useRouter();
	const [showingMenu, setShowingMenu] = useState(false);
	const [showingSearch, setShowingSearch] = useState(false);
	const [term, setTerm] = useState((q as string) || '');
	useEffect(() => {
		if (q) {
			setTerm(q as string);
		}
	}, [q]);
	useEffect(() => {
		const onRouteChange = () => setShowingMenu(false);
		Router.events.on('routeChangeStart', onRouteChange);
		return () => {
			Router.events.off('routeChangeStart', onRouteChange);
		};
	}, []);
	return (
		<>
			{!showingSearch && (
				<div className={styles.mobileHeader}>
					<a
						onClick={(e) => {
							e.preventDefault();
							setShowingMenu(true);
						}}
					>
						<MenuIcon />
					</a>
					<Header />
					<a
						onClick={(e) => {
							e.preventDefault();
							setShowingSearch(true);
						}}
					>
						<SearchIcon />
					</a>
				</div>
			)}
			<div className={styles.base}>
				<div
					className={clsx(
						styles.navigation,
						showingMenu ? styles.navigationShown : styles.navigationHidden
					)}
				>
					<div className={styles.header}>
						<Header />
					</div>
					<Navigation onExit={() => setShowingMenu(false)} />
				</div>
				<div className={styles.content}>
					<SearchBar
						term={term}
						onChange={(value) => {
							setTerm(value);
						}}
						onExit={() => {
							setShowingSearch(false);
							setTerm('');
						}}
						className={showingSearch ? '' : styles.searchHidden}
					/>
					<div>{children}</div>
				</div>
			</div>
		</>
	);
}
