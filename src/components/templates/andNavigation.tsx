import clsx from 'clsx';
import { Router, useRouter } from 'next/router';
import React, {
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '@components/molecules/button';
import IconButton from '@components/molecules/iconButton';
import LanguageAlternativesAlert from '@components/molecules/languageAlternativesAlert';
import Mininav from '@components/molecules/mininav';
import SearchBar from '@components/molecules/searchBar';
import Header from '@components/organisms/header';
import Navigation from '@components/organisms/navigation';
import { BaseColors } from '@lib/constants';
import isServerSide from '@lib/isServerSide';
import { makeDonateRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';
import { useNavigationItems } from '@lib/useNavigationItems';

import IconListeningAnimated from '../../../public/img/icon-listening-animated.svg';
import IconListening from '../../../public/img/icon-listening.svg';
import MoreIcon from '../../../public/img/icon-more.svg';

import styles from './andNavigation.module.scss';
import { PlaybackContext } from './andPlaybackContext';

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
	const intl = useIntl();
	const {
		push,
		query: { q },
		pathname,
		asPath,
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
	const onPageWithSearchBox =
		pathname.includes('/[language]/discover') ||
		pathname.includes('/[language]/search');

	const headerTitleRef = useRef<HTMLDivElement>(null);
	const subnavRef = useRef<HTMLDivElement>(null);
	const [lastScrollTop, setLastScrollTop] = useState<number>(0);
	const [headerSlideOffset, setHeaderSlideOffset] = useState<number>(0);

	const listener = useCallback(() => {
		if (isServerSide() || !subnavRef.current || !headerTitleRef.current) {
			return;
		}

		const bodyRect = document.body.getBoundingClientRect();
		const scrollTop = Math.min(
			Math.max(-bodyRect.top, 0), // Not less than 0
			bodyRect.height - window.innerHeight // Not beyond the end of the page (rubber-banding case)
		);

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

	const navigationItems = useNavigationItems();
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
						href={makeDonateRoute(languageRoute)}
					/>
					{playbackRecording && (
						<IconButton
							Icon={
								playbackContext.paused() ? IconListening : IconListeningAnimated
							}
							onClick={() => push(playbackRecording.canonicalPath || '')}
							color={BaseColors.RED}
							backgroundColor={BaseColors.CREAM}
							aria-label={intl.formatMessage({
								id: 'andNavigation__playing',
								defaultMessage: 'Playing',
							})}
						/>
					)}
				</div>
				<div className={styles.mobileSubnavWrapper} ref={subnavRef}>
					<div className={styles.mobileSubnav}>
						<Mininav
							items={navigationItems.slice(0, -2).map((item) => ({
								id: item.key,
								label: item.label,
								url: item.href,
								isActive: item.href === asPath,
							}))}
							compact
							className={styles.mobileSubnavItems}
						/>
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
