import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import LanguageAlternativesAlert from '@components/molecules/languageAlternativesAlert';
import SearchBar from '@components/molecules/searchBar';
import styles from './andNavigation.module.scss';
import MobileHeader from '@components/organisms/mobileHeader';
import Drawer from '@components/organisms/drawer';
import SearchResults from '@containers/search';
import Footer from '@components/organisms/footer';
import {
	EntityFilterId,
	useContextualFilterId,
} from '@components/organisms/searchResults.filters';
import clsx from 'clsx';

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
	const contextualFilterId = useContextualFilterId();
	const [term, setTerm] = useState<string | undefined>(param);
	const [entityType, setEntityType] =
		useState<EntityFilterId>(contextualFilterId);
	const [showingMenu, setShowingMenu] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => setTerm(param), [param, pathname]);

	// TODO: Persist scroll position on a per-tab basis to
	// prevent losing the user's place when switching tabs.
	useEffect(() => {
		if (scrollRef.current) scrollRef.current.scrollTop = 0;
	}, [term, entityType]);

	useEffect(() => setEntityType(contextualFilterId), [contextualFilterId]);

	const hideMobileSearch =
		contextualFilterId === 'all' &&
		!['/[language]/discover', '/[language]'].includes(pathname);

	return (
		<div className={styles.base}>
			<MobileHeader
				scrollRef={scrollRef}
				setShowingMenu={setShowingMenu}
				term={term}
				onTermChange={(t) => setTerm(t)}
				entityType={entityType}
				onEntityTypeChange={setEntityType}
			/>
			<Drawer
				showingMenu={showingMenu}
				onExit={() => setShowingMenu(false)}
				onSearchChange={(v) => setTerm(v)}
				searchTerm={term}
			/>
			<div ref={scrollRef} className={styles.content}>
				<LanguageAlternativesAlert />
				<SearchBar
					className={clsx(
						styles.search,
						term !== undefined && styles.searchActive,
						hideMobileSearch && styles.hideMobileSearch
					)}
					term={term}
					onTermChange={(v) => setTerm(v)}
					entityType={entityType}
					onEntityTypeChange={setEntityType}
				/>
				{term === undefined ? (
					children
				) : (
					<SearchResults
						term={term}
						entityType={entityType}
						onEntityTypeChange={setEntityType}
					/>
				)}
				<Footer scrollRef={scrollRef} />
			</div>
		</div>
	);
}
