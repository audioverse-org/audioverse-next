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

const SUBNAV_HEIGHT = 24;
const TITLE_PADDING_TOP_DIFFERENCE = 8;
const TITLE_PADDING_BOTTOM_DIFFERENCE = 6;
const COLLAPSING_HEIGHT =
	SUBNAV_HEIGHT +
	TITLE_PADDING_TOP_DIFFERENCE +
	TITLE_PADDING_BOTTOM_DIFFERENCE;

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
	const subnavRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const transitionProgress = useTransitionProgress(
		scrollRef,
		COLLAPSING_HEIGHT
	);

	useEffect(() => {
		if (isServerSide() || !subnavRef.current || !titleRef.current) return;

		const paddingTop = 24 - transitionProgress * TITLE_PADDING_TOP_DIFFERENCE;
		const paddingBottom =
			14 - transitionProgress * TITLE_PADDING_BOTTOM_DIFFERENCE;
		const height = (1 - transitionProgress) * SUBNAV_HEIGHT;

		titleRef.current.style.paddingTop = `${paddingTop}px`;
		titleRef.current.style.paddingBottom = `${paddingBottom}px`;
		subnavRef.current.style.height = `${height}px`;
	}, [transitionProgress]);

	return (
		<div className={styles.base}>
			<div className={styles.title} ref={titleRef}>
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
			<div className={styles.subnav} ref={subnavRef}>
				<Mininav
					items={navigationItems.slice(0, -2).map((item) => ({
						id: item.key,
						label: item.label,
						url: item.href,
						isActive: item.href === asPath,
					}))}
					compact
					className={styles.subnavItems}
				/>
				{/* TODO: Use a button instead of anchor element to improve accessibility */}
				<a
					className={styles.more}
					onClick={(e) => {
						e.preventDefault();
						setShowingMenu(true);
					}}
				>
					<MoreIcon />
				</a>
			</div>
		</div>
	);
}
