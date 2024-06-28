import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~components/molecules/button';
import ButtonPlayback from '~components/molecules/buttonPlayback';
import Mininav from '~components/molecules/mininav';
import SearchBar from '~components/molecules/searchBar';
import Header from '~components/organisms/header';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';
import { useNavigationItems } from '~lib/useNavigationItems';
import IconExitSmall from '~public/img/icons/icon-exit-small.svg';
import MoreIcon from '~public/img/icons/icon-more.svg';
import usePlayerRecording from '~src/lib/media/usePlayerRecording';

import { analytics } from '../../lib/analytics';
import styles from './mobileHeader.module.scss';
import useScrollDirection, {
	SCROLL_DIRECTIONS,
} from './mobileHeader.useScrollDirection';
import { EntityFilterId } from './searchResults.filters';

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
	const intl = useIntl();
	const { asPath } = useRouter();
	const lang = useLanguageRoute();
	const navItems = useNavigationItems();
	const { recording } = usePlayerRecording();
	const scrollDirection = useScrollDirection(scrollRef);

	return (
		<div
			className={clsx(styles.base, {
				[styles.up]: scrollDirection === SCROLL_DIRECTIONS.UP,
				[styles.down]: scrollDirection === SCROLL_DIRECTIONS.DOWN,
			})}
		>
			<div className={styles.wrapper}>
				<div className={styles.title}>
					<Header />
					<Button
						type="super"
						onClick={() => {
							analytics.track('Donate');
						}}
						text={
							<FormattedMessage
								id="andNavigation__donate"
								defaultMessage="Donate"
							/>
						}
						href={root.lang(lang).give.get()}
					/>
					{recording && <ButtonPlayback />}
				</div>
				<div className={styles.subnav}>
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
					<button
						aria-label={intl.formatMessage({
							id: 'organism-mobileHeader__more',
							defaultMessage: 'more',
							description: 'more button label',
						})}
						className={styles.more}
						onClick={() => setShowingMenu(true)}
					>
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
