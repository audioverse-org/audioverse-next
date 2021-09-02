import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import ActiveLink from '@components/atoms/activeLink';
import Heading1 from '@components/atoms/heading1';
import Button from '@components/molecules/button';
import LoadingIndicator from '@components/molecules/loadingIndicator';
import useLanguageRoute from '@lib/useLanguageRoute';

import IconBible from '../../../public/img/icon-bible.svg';
import IconBlog from '../../../public/img/icon-blog.svg';
import IconCollections from '../../../public/img/icon-collections.svg';
import IconExit from '../../../public/img/icon-exit.svg';
import IconMore from '../../../public/img/icon-more.svg';
import IconPlaylist from '../../../public/img/icon-playlist.svg';
import IconSearch from '../../../public/img/icon-search.svg';
import IconSettings from '../../../public/img/icon-settings.svg';

import styles from './navigation.module.scss';

const Navigation = ({ onExit }: { onExit: () => void }): JSX.Element => {
	const languageRoute = useLanguageRoute();
	const iconSize = 24;
	const intl = useIntl();

	const entries: {
		key: string;
		href?: string;
		// TODO: Improve Icon type
		Icon: any;
		label: string;
	}[] = [
		{
			key: 'discover',
			href: `/${languageRoute}/discover`,
			Icon: IconSearch,
			label: intl.formatMessage({
				id: `header__navItemDiscover`,
				defaultMessage: 'Discover',
				description: `Header nav link name: Discover`,
			}),
		},
		{
			key: 'playlist',
			Icon: IconPlaylist,
			label: intl.formatMessage({
				id: `header__navItemLibrary`,
				defaultMessage: 'Library',
				description: `Header nav link name: Library`,
			}),
		},
		{
			key: 'bibles',
			href: `/${languageRoute}/bibles`,
			Icon: IconBible,
			label: intl.formatMessage({
				id: `header__naveItemBible`,
				defaultMessage: 'Bible',
				description: `Header nav link name: Bible`,
			}),
		},
		{
			key: 'collections',
			Icon: IconCollections,
			label: intl.formatMessage({
				id: `header__navItemCollections`,
				defaultMessage: 'Collections',
				description: `Header nav link name: Collections`,
			}),
		},
		{
			key: 'blog',
			href: `/${languageRoute}/blog`,
			Icon: IconBlog,
			label: intl.formatMessage({
				id: `header__navItemBlog`,
				defaultMessage: 'Blog',
				description: `Header nav link name: Blog`,
			}),
		},
		{
			key: 'settings',
			Icon: IconSettings,
			label: intl.formatMessage({
				id: `header__navItemSettings`,
				defaultMessage: 'Settings',
				description: `Header nav link name: Settings`,
			}),
		},
		{
			key: 'more',
			Icon: IconMore,
			label: intl.formatMessage({
				id: `header__navItemMore`,
				defaultMessage: 'More',
				description: `Header nav link name: More`,
			}),
		},
	];

	return (
		<header className={styles.header}>
			<div className={styles.titleRow}>
				<Heading1 unpadded>
					<FormattedMessage id="navigation_menuTitle" defaultMessage="Menu" />
				</Heading1>
				<a onClick={() => onExit()}>
					<IconExit />
				</a>
			</div>
			<ul>
				{entries.map((e) => {
					const { Icon } = e;
					const inner = (
						<>
							<span className={styles.icon}>
								<Icon width={iconSize} height={iconSize} />
							</span>
							{e.label}
						</>
					);

					if (!e.href) return <li key={e.key}>{inner}</li>;

					return (
						<li key={e.key}>
							<ActiveLink href={e.href} activeClassName={styles.active}>
								<a>{inner}</a>
							</ActiveLink>
						</li>
					);
				})}
			</ul>

			<Button
				type="super"
				href={`/${languageRoute}/give`}
				text={
					<FormattedMessage
						id={`header__donateButtonLabel`}
						defaultMessage="Donate"
						description={`Header nav donate button label`}
					/>
				}
				className={styles.donateButton}
			/>

			<LoadingIndicator />
		</header>
	);
};

export default Navigation;
