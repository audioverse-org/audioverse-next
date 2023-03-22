import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef } from 'react';
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
import styles from './mobileHeader.module.scss';
import { useTransitionProgress } from './mobileHeader.useTransitionProgress';

const SUBNAV_HEIGHT = 32;
const HEADER_TITLE_PADDING_TOP_DIFFERENCE = 8;
const HEADER_TITLE_PADDING_BOTTOM_DIFFERENCE = 6;
const COLLAPSING_HEIGHT =
	SUBNAV_HEIGHT +
	HEADER_TITLE_PADDING_TOP_DIFFERENCE +
	HEADER_TITLE_PADDING_BOTTOM_DIFFERENCE;

export default function MobileHeader({
	setShowingMenu,
	scrollRef,
}: {
	setShowingMenu: (showingMenu: boolean) => void;
	scrollRef: React.RefObject<HTMLDivElement>;
}): JSX.Element {
	const { asPath } = useRouter();
	const languageRoute = useLanguageRoute();
	const navigationItems = useNavigationItems();
	const playbackContext = useContext(PlaybackContext);
	const playbackRecording = playbackContext.getRecording();
	const headerRef = useRef<HTMLDivElement>(null);
	const headerTitleRef = useRef<HTMLDivElement>(null);
	const transitionProgress = useTransitionProgress(
		scrollRef,
		COLLAPSING_HEIGHT
	);

	useEffect(() => {
		if (isServerSide() || !headerRef.current || !headerTitleRef.current) return;

		const titlePaddingTop =
			24 - transitionProgress * HEADER_TITLE_PADDING_TOP_DIFFERENCE;
		const titlePaddingBottom =
			22 - transitionProgress * HEADER_TITLE_PADDING_BOTTOM_DIFFERENCE;
		const headerPaddingBottom = (1 - transitionProgress) * SUBNAV_HEIGHT;

		headerTitleRef.current.style.paddingTop = `${titlePaddingTop}px`;
		headerTitleRef.current.style.paddingBottom = `${titlePaddingBottom}px`;
		headerRef.current.style.paddingBottom = `${headerPaddingBottom}px`;
	}, [transitionProgress]);

	return (
		<div className={styles.mobileHeader} ref={headerRef}>
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
			<div className={styles.mobileSubnavWrapper}>
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
