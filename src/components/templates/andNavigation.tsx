import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import LanguageAlternativesAlert from '@components/molecules/languageAlternativesAlert';
import SearchBar from '@components/molecules/searchBar';
import styles from './andNavigation.module.scss';
import MobileHeader from '@components/organisms/mobileHeader';
import Drawer from '@components/organisms/drawer';
import Footer from '@components/organisms/footer';

export default function AndNavigation({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	const {
		query: { q },
		pathname,
	} = useRouter();
	const param = q?.toString() || '';
	const [term, setTerm] = useState<string>(param);
	const [showingMenu, setShowingMenu] = useState(false);
	const shouldShowSearch =
		pathname.includes('/[language]/discover') ||
		pathname.includes('/[language]/search');
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => setTerm(param), [param, pathname]);

	return (
		<div className={styles.positioner}>
			<MobileHeader scrollRef={scrollRef} setShowingMenu={setShowingMenu} />
			<div className={styles.wrapper}>
				<div className={styles.base}>
					<Drawer
						showingMenu={showingMenu}
						onExit={() => setShowingMenu(false)}
						onSearchChange={(v) => setTerm(v)}
						searchTerm={term}
					/>
					<div ref={scrollRef} className={styles.content}>
						<LanguageAlternativesAlert />
						<SearchBar
							term={term}
							onChange={(v) => setTerm(v)}
							className={clsx(
								styles.searchBox,
								shouldShowSearch && styles.searchShown
							)}
						/>
						<div>{children}</div>
						<Footer scrollRef={scrollRef} />
					</div>
				</div>
			</div>
		</div>
	);
}
