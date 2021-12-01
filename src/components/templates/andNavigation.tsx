import clsx from 'clsx';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import React, {
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
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

const SUBNAV_HEIGHT = 32;
const HEADER_TITLE_PADDING_TOP_DIFFERENCE = 8;
const HEADER_TITLE_PADDING_BOTTOM_DIFFERENCE = 6;
const COLLAPSING_HEIGHT =
	SUBNAV_HEIGHT +
	HEADER_TITLE_PADDING_TOP_DIFFERENCE +
	HEADER_TITLE_PADDING_BOTTOM_DIFFERENCE;

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
		const onRouteChange = () => setShowingMenu(false);
		Router.events.on('routeChangeStart', onRouteChange);
		return () => {
			Router.events.off('routeChangeStart', onRouteChange);
		};
	}, []);
	useEffect(() => setTerm((q as string) || ''), [q, pathname]);
	useEffect(() => {
		const body = document.getElementsByTagName('body')[0];
		body.classList.toggle('scrollDisabledMobile', showingMenu);
	}, [showingMenu]);
	const onSearchPage = pathname.includes('/[language]/search');

	const headerTitleRef = useRef<HTMLDivElement>(null);
	const subnavRef = useRef<HTMLDivElement>(null);
	const [lastScrollTop, setLastScrollTop] = useState<number>(0);
	const [headerSlideOffset, setHeaderSlideOffset] = useState<number>(0);

	const listener = useCallback(() => {
		const isServerSide = typeof window === 'undefined';
		if (isServerSide || !subnavRef.current || !headerTitleRef.current) {
			return;
		}

		const scrollTop = Math.max(-document.body.getBoundingClientRect().top, 0);

		const scrollingUp = scrollTop < lastScrollTop;
		if (scrollingUp && headerSlideOffset + COLLAPSING_HEIGHT < scrollTop) {
			setHeaderSlideOffset(Math.max(lastScrollTop - COLLAPSING_HEIGHT, 0));
		} else if (!scrollingUp && headerSlideOffset > scrollTop) {
			setHeaderSlideOffset(scrollTop);
		}

		const transitionProgress =
			Math.max(Math.min(scrollTop - headerSlideOffset, COLLAPSING_HEIGHT), 0) /
			COLLAPSING_HEIGHT;

		headerTitleRef.current.style.paddingTop = `${
			24 - transitionProgress * HEADER_TITLE_PADDING_TOP_DIFFERENCE
		}px`;
		headerTitleRef.current.style.paddingBottom = `${
			22 - transitionProgress * HEADER_TITLE_PADDING_BOTTOM_DIFFERENCE
		}px`;
		subnavRef.current.style.top = `calc(100% - ${
			transitionProgress * SUBNAV_HEIGHT
		}px)`;

		setLastScrollTop(scrollTop);
	}, [headerSlideOffset, lastScrollTop]);
	useEffect(() => {
		window.addEventListener('scroll', listener);
		return () => {
			window.removeEventListener('scroll', listener);
		};
	}, [listener]);

	const navigationItems = getNavigationItems(router, languageRoute);
	const playbackRecording = playbackContext.getRecording();
	return (
		<div className={styles.positioner}>
			<div className={styles.mobileHeader}>
				<div className={styles.mobileHeaderTitle} ref={headerTitleRef}>
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
					{playbackRecording && (
						<IconButton
							Icon={
								playbackContext.paused() ? IconListening : IconListeningAnimated
							}
							onClick={() => push(playbackRecording.canonicalPath || '')}
							color={BaseColors.RED}
							backgroundColor={BaseColors.CREAM}
						/>
					)}
				</div>
				<div className={styles.mobileSubnavWrapper} ref={subnavRef}>
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
