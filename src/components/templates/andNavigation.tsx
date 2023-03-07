import clsx from 'clsx';
import { Router, useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';

import LanguageAlternativesAlert from '@components/molecules/languageAlternativesAlert';
import SearchBar from '@components/molecules/searchBar';
import Header from '@components/organisms/header';
import Navigation from '@components/organisms/navigation';

import styles from './andNavigation.module.scss';
import MobileHeader from '@components/organisms/mobileHeader';

export default function AndNavigation({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	const router = useRouter();
	const {
		query: { q },
		pathname,
	} = router;
	const [term, setTerm] = useState((q as string) || '');
	const [showingMenu, setShowingMenu] = useState(false);
	const onPageWithSearchBox =
		pathname.includes('/[language]/discover') ||
		pathname.includes('/[language]/search');

	useEffect(() => setTerm((q as string) || ''), [q, pathname]);

	useEffect(() => {
		const fn = () => setShowingMenu(false);
		Router.events.on('routeChangeStart', fn);
		return () => Router.events.off('routeChangeStart', fn);
	}, []);

	useEffect(() => {
		const body = document.getElementsByTagName('body')[0];
		body.classList.toggle('scrollDisabledMobile', showingMenu);
	}, [showingMenu]);

	return (
		<div className={styles.positioner}>
			<MobileHeader setShowingMenu={setShowingMenu} />
			<div className={styles.wrapper}>
				<div className={styles.base}>
					<div
						className={clsx(
							styles.navigation,
							showingMenu && styles.navigationShown
						)}
					>
						<div className={styles.header}>
							<Header />
						</div>
						<Navigation
							onExit={() => setShowingMenu(false)}
							searchTerm={term}
							onSearchChange={(v) => setTerm(v)}
						/>
					</div>
					<div className={styles.content}>
						<LanguageAlternativesAlert />
						<SearchBar
							term={term}
							onChange={(v) => setTerm(v)}
							className={clsx(
								styles.searchBox,
								onPageWithSearchBox && styles.searchShown
							)}
						/>
						<div>{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
