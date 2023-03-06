import { useRouter } from 'next/router';
import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@components/molecules/button';
import Mininav from '@components/molecules/mininav';
import Header from '@components/organisms/header';
import isServerSide from '@lib/isServerSide';
import { makeDonateRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';
import { useNavigationItems } from '@lib/useNavigationItems';
import MoreIcon from '../../../public/img/icons/icon-more.svg';
import ButtonPlayback from '@components/molecules/buttonPlayback';
import { PlaybackContext } from '@components/templates/andPlaybackContext';

// TODO: Extract relevant styles to a separate module.
import styles from '../templates/andNavigation.module.scss';

const SUBNAV_HEIGHT = 32;
const HEADER_TITLE_PADDING_TOP_DIFFERENCE = 8;
const HEADER_TITLE_PADDING_BOTTOM_DIFFERENCE = 6;
const COLLAPSING_HEIGHT =
	SUBNAV_HEIGHT +
	HEADER_TITLE_PADDING_TOP_DIFFERENCE +
	HEADER_TITLE_PADDING_BOTTOM_DIFFERENCE;

export default function MobileHeader({
	setShowingMenu,
}: {
	setShowingMenu: (showingMenu: boolean) => void;
}): JSX.Element {
	const { asPath } = useRouter();
	const languageRoute = useLanguageRoute();
	const navigationItems = useNavigationItems();
	const playbackContext = useContext(PlaybackContext);
	const playbackRecording = playbackContext.getRecording();
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

	return (
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
				{playbackRecording && <ButtonPlayback />}
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
					{/* TODO: Use a button instead of anchor element to improve accessibility */}
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
	);
}
