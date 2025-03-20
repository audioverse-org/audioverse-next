import Router, { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

import LanguageAlternativesAlert from '~components/molecules/languageAlternativesAlert';
import SearchBar from '~components/molecules/searchBar';
import Drawer from '~components/organisms/drawer';
import Footer from '~components/organisms/footer';
import MobileHeader from '~components/organisms/mobileHeader';
import {
	EntityFilterId,
	useContextualFilterId,
} from '~components/organisms/searchResults.filters';
import SearchResults from '~containers/search';

import styles from './andNavigation.module.scss';

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

	useEffect(() => {
		const fn = () => {
			if (term) setTerm(undefined);
			if (scrollRef.current) scrollRef.current.scrollTop = 0;
		};

		Router.events.on('routeChangeComplete', fn);

		return () => {
			Router.events.off('routeChangeComplete', fn);
		};
	}, [term]);

	return (
		<div className={styles.base}>
			<MobileHeader scrollRef={scrollRef} setShowingMenu={setShowingMenu} />
			<Drawer showingMenu={showingMenu} onExit={() => setShowingMenu(false)} />
			<div ref={scrollRef} className={styles.content}>
				<LanguageAlternativesAlert />
				<SearchBar
					className={styles.search}
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
