import { Button } from '@material-ui/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import ActiveLink from '@components/atoms/activeLink';
import LoadingIndicator from '@components/molecules/loadingIndicator';
import useLanguageRoute from '@lib/useLanguageRoute';

import IconBible from '../../../public/img/icon-bible.svg';
import IconBlog from '../../../public/img/icon-blog.svg';
import IconCollections from '../../../public/img/icon-collections.svg';
import IconMore from '../../../public/img/icon-more.svg';
import IconPlaylist from '../../../public/img/icon-playlist.svg';
import IconSearch from '../../../public/img/icon-search.svg';
import IconSettings from '../../../public/img/icon-settings.svg';

import styles from './header.module.scss';

// TODO: rename component (sidebar?)
const Header = (): JSX.Element => {
	const languageRoute = useLanguageRoute();
	const iconSize = 24;
	const intl = useIntl();

	const entries: {
		key: string;
		href?: string;
		// TODO: Improve Icon type
		Icon: any;
		fill?: boolean;
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
			fill: true,
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
			<h1 className={styles.logo}>
				<Link href={`/${languageRoute}`}>
					<a>
						<Image
							src="/img/logo.svg"
							alt="AudioVerse"
							width={161}
							height={23}
						/>
					</a>
				</Link>
			</h1>
			<ul>
				{entries.map((e) => {
					const { Icon } = e;
					const inner = (
						<>
							<span className={`${styles.icon} ${e.fill && styles.fill}`}>
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

			<Button variant={'contained'} color={'primary'}>
				<FormattedMessage
					id={`header__donateButtonLabel`}
					defaultMessage="Donate"
					description={`Header nav donate button label`}
				/>
			</Button>

			<LoadingIndicator />
		</header>
	);
};

export default Header;
