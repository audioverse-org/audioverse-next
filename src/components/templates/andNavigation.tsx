import clsx from 'clsx';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Heading6 from '@components/atoms/heading6';
import Button from '@components/molecules/button';
import IconButton from '@components/molecules/iconButton';
import LanguageAlternativesAlert from '@components/molecules/languageAlternativesAlert';
import SearchBar from '@components/molecules/searchBar';
import Header from '@components/organisms/header';
import Navigation from '@components/organisms/navigation';
import { BaseColors } from '@lib/constants';
import { getNavigationItems } from '@lib/getNavigationItems';
import useLanguageRoute from '@lib/useLanguageRoute';

import IconListeningAnimated from '../../../public/img/icon-listening-animated.svg';
import IconListening from '../../../public/img/icon-listening.svg';
import MoreIcon from '../../../public/img/icon-more.svg';

import { PlaybackContext } from './andMiniplayer';
import styles from './andNavigation.module.scss';

export default function AndNavigation({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	const router = useRouter();
	const {
		push,
		query: { q },
		pathname,
	} = router;
	const languageRoute = useLanguageRoute();
	const playbackContext = useContext(PlaybackContext);
	const [showingMenu, setShowingMenu] = useState(false);
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => setTerm((q as string) || ''), [pathname]);
	useEffect(() => {
		const body = document.getElementsByTagName('body')[0];
		body.classList.toggle('scrollDisabledMobile', showingMenu);
	}, [showingMenu]);
	const onSearchPage = pathname.includes('/[language]/search');

	const navigationItems = getNavigationItems(router, languageRoute);
	return (
		<div className={styles.overflower}>
			<div className={styles.mobileHeader}>
				<div className={styles.mobileHeaderTitle}>
					<Header />
					<Button
						type="super"
						text={
							<FormattedMessage
								id="andNavigation__donate"
								defaultMessage="Donate"
							/>
						}
					/>
					{playbackContext.getRecording() && (
						<IconButton
							Icon={
								playbackContext.paused() ? IconListening : IconListeningAnimated
							}
							onClick={() =>
								push(playbackContext.getRecording()?.canonicalPath || '')
							}
							color={BaseColors.RED}
							backgroundColor={BaseColors.CREAM}
						/>
					)}
				</div>
				<div className={styles.mobileSubnav}>
					<div className={styles.mobileSubnavItems}>
						{navigationItems.slice(0, -2).map((item) => (
							<Heading6 sans large loose unpadded uppercase key={item.key}>
								<Link href={item.href as string}>
									<a>{item.label}</a>
								</Link>
							</Heading6>
						))}
					</div>
					<a
						className={styles.mobileHeaderMore}
						onClick={(e) => {
							e.preventDefault();
							setShowingMenu(true);
						}}
					>
						<MoreIcon />
					</a>
				</div>
			</div>
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
							onSearchChange={(value) => {
								setTerm(value);
							}}
						/>
					</div>
					<div className={styles.content}>
						<LanguageAlternativesAlert />
						<SearchBar
							term={term}
							onChange={(value) => {
								setTerm(value);
							}}
							className={clsx(
								styles.searchBox,
								onSearchPage && styles.searchShown
							)}
						/>
						<div>{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
