import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '~components/molecules/button';
import ButtonPlayback from '~components/molecules/buttonPlayback';
import Mininav from '~components/molecules/mininav';
import SearchBar from '~components/molecules/searchBar';
import Header from '~components/organisms/header';
import { PlaybackContext } from '~components/templates/andPlaybackContext';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';
import { useNavigationItems } from '~lib/useNavigationItems';
import IconExitSmall from '~public/img/icons/icon-exit-small.svg';
import MoreIcon from '~public/img/icons/icon-more.svg';

import styles from './mobileHeader.module.scss';
import { useTransitionProgress } from './mobileHeader.useTransitionProgress';
import { EntityFilterId } from './searchResults.filters';

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
	term,
	onTermChange,
	entityType,
	onEntityTypeChange,
}: {
	setShowingMenu: (showingMenu: boolean) => void;
	scrollRef: React.RefObject<HTMLDivElement>;
	term?: string;
	onTermChange: (term: string | undefined) => void;
	entityType: EntityFilterId;
	onEntityTypeChange: (entityType: EntityFilterId) => void;
}): JSX.Element {
	const { asPath } = useRouter();
	const lang = useLanguageRoute();
	const navItems = useNavigationItems();
	const { getRecording } = useContext(PlaybackContext);
	const progress = useTransitionProgress(scrollRef, COLLAPSING_HEIGHT);

	return (
		<div className={styles.base}>
			<div className={styles.wrapper}>
				<div
					className={styles.title}
					style={{
						paddingTop: px(progress, TITLE_PAD_TOP),
						paddingBottom: px(progress, TITLE_PAD_BOTTOM),
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
						href={root.lang(lang).give.get()}
					/>
					{getRecording() && <ButtonPlayback />}
				</div>
				<div
					className={styles.subnav}
					style={{ height: px(progress, SUBNAV_HEIGHT) }}
				>
					<Mininav
						items={navItems.slice(0, -2).map((item) => {
							if (!item.href) {
								throw new Error(`Missing href for ${item.label}`);
							}

							return {
								id: item.key,
								label: item.label,
								url: item.href,
								isActive: item.href === asPath,
							};
						})}
						compact
						className={styles.subnavItems}
					/>
					<button className={styles.more} onClick={() => setShowingMenu(true)}>
						<MoreIcon />
					</button>
				</div>
			</div>

			<SearchBar
				className={clsx(
					styles.search,
					term !== undefined && styles.searchActive
				)}
				inputClassName={styles.searchInput}
				filtersClassName={styles.searchFilters}
				term={term}
				onTermChange={onTermChange}
				entityType={entityType}
				onEntityTypeChange={onEntityTypeChange}
				IconClear={IconExitSmall}
				stealFocus={true}
			/>
		</div>
	);
}
