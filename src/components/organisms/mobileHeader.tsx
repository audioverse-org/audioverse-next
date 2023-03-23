import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@components/molecules/button';
import Mininav from '@components/molecules/mininav';
import Header from '@components/organisms/header';
import { makeDonateRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';
import { useNavigationItems } from '@lib/useNavigationItems';
import MoreIcon from '../../../public/img/icons/icon-more.svg';
import ButtonPlayback from '@components/molecules/buttonPlayback';
import { PlaybackContext } from '@components/templates/andPlaybackContext';
import styles from './mobileHeader.module.scss';
import { useTransitionProgress } from './mobileHeader.useTransitionProgress';

type Transition = [number, number];

const SUBNAV_HEIGHT: Transition = [24, 0];
const TITLE_PAD_TOP: Transition = [24, 16];
const TITLE_PAD_BOTTOM: Transition = [14, 8];

const COLLAPSING_HEIGHT = [
	SUBNAV_HEIGHT,
	TITLE_PAD_TOP,
	TITLE_PAD_BOTTOM,
].reduce((acc, [s, e]) => acc + (s - e), 0);

const px = (progress: number, [s, e]: Transition) =>
	`${s + (e - s) * progress}px`;

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
	const { getRecording } = useContext(PlaybackContext);
	const transitionProgress = useTransitionProgress(
		scrollRef,
		COLLAPSING_HEIGHT
	);

	return (
		<div className={styles.base}>
			<div
				className={styles.title}
				style={{
					paddingTop: px(transitionProgress, TITLE_PAD_TOP),
					paddingBottom: px(transitionProgress, TITLE_PAD_BOTTOM),
				}}
			>
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
				{getRecording() && <ButtonPlayback />}
			</div>
			<div
				className={styles.subnav}
				style={{ height: px(transitionProgress, SUBNAV_HEIGHT) }}
			>
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
				<button className={styles.more} onClick={() => setShowingMenu(true)}>
					<MoreIcon />
				</button>
			</div>
		</div>
	);
}
