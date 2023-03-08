import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import LanguageAlternativesAlert from '@components/molecules/languageAlternativesAlert';
import SearchBar from '@components/molecules/searchBar';
import styles from './andNavigation.module.scss';
import MobileHeader from '@components/organisms/mobileHeader';
import Drawer from '@components/organisms/drawer';
import SearchResults from '@containers/search';
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
	const param = q?.toString();
	const [term, setTerm] = useState<string | undefined>(param);
	const [showingMenu, setShowingMenu] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => setTerm(param), [param, pathname]);

	return (
		<>
			<MobileHeader scrollRef={scrollRef} setShowingMenu={setShowingMenu} />

			<div className={styles.base}>
				<Drawer
					showingMenu={showingMenu}
					onExit={() => setShowingMenu(false)}
					onSearchChange={(v) => setTerm(v)}
					searchTerm={term}
				/>
				<div ref={scrollRef} className={styles.content}>
					<LanguageAlternativesAlert />
					<SearchBar term={term} onChange={(v) => setTerm(v)} />
					{term === undefined ? children : <SearchResults term={term} />}
					<Footer scrollRef={scrollRef} />
				</div>
			</div>
		</>
	);
}
