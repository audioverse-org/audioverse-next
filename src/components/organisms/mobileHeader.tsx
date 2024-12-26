import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~components/molecules/button';
import ButtonPlayback from '~components/molecules/buttonPlayback';
import Mininav from '~components/molecules/mininav';
import Header from '~components/organisms/header';
import { PlaybackContext } from '~components/templates/andPlaybackContext';
import root from '~lib/routes';
import MoreIcon from '~public/img/icons/icon-more.svg';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import { useNavigationItems } from '~src/lib/hooks/useNavigationItems';

import OpenAppButton from '../molecules/openAppButton';
import styles from './mobileHeader.module.scss';
import useScrollDirection, {
	SCROLL_DIRECTIONS,
} from './mobileHeader.useScrollDirection';

export default function MobileHeader({
	setShowingMenu,
	scrollRef,
}: {
	setShowingMenu: (showingMenu: boolean) => void;
	scrollRef: React.RefObject<HTMLDivElement>;
}): JSX.Element {
	const intl = useIntl();
	const { asPath } = useRouter();
	const lang = useLanguageRoute();
	const navItems = useNavigationItems();
	const { getRecording } = useContext(PlaybackContext);
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
					<OpenAppButton />
					<Button
						className={styles.donate}
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
		</div>
	);
}
