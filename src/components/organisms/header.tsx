import { Button } from '@material-ui/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Icon from '@components/atoms/icon';
import LoadingIndicator from '@components/molecules/loadingIndicator';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './header.module.scss';

// TODO: rename component (sidebar?)

const Header = (): JSX.Element => {
	const languageRoute = useLanguageRoute();
	const iconSize = 24;
	const intl = useIntl();

	const entries: {
		href?: string;
		icon: JSX.Element;
		label: string;
	}[] = [
		{
			href: `/${languageRoute}/discover`,
			icon: <Icon icon={'search'} size={iconSize} />,
			label: intl.formatMessage({
				id: `header__navItemDiscover`,
				defaultMessage: 'Discover',
				description: `Header nav link name: Discover`,
			}),
		},
		{
			icon: <Icon icon={'playlist'} size={iconSize} />,
			label: intl.formatMessage({
				id: `header__navItemLibrary`,
				defaultMessage: 'Library',
				description: `Header nav link name: Library`,
			}),
		},
		{
			href: `/${languageRoute}/bibles`,
			icon: <Icon icon={'bible'} size={iconSize} />,
			label: intl.formatMessage({
				id: `header__naveItemBible`,
				defaultMessage: 'Bible',
				description: `Header nav link name: Bible`,
			}),
		},
		{
			icon: <Icon icon={'collections'} size={iconSize} />,
			label: intl.formatMessage({
				id: `header__navItemCollections`,
				defaultMessage: 'Collections',
				description: `Header nav link name: Collections`,
			}),
		},
		{
			icon: <Icon icon={'blog'} size={iconSize} />,
			label: intl.formatMessage({
				id: `header__navItemBlog`,
				defaultMessage: 'Blog',
				description: `Header nav link name: Blog`,
			}),
		},
		{
			icon: <Icon icon={'settings'} size={iconSize} />,
			label: intl.formatMessage({
				id: `header__navItemSettings`,
				defaultMessage: 'Settings',
				description: `Header nav link name: Settings`,
			}),
		},
		{
			icon: <Icon icon={'more'} size={iconSize} />,
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
					const inner = (
						<>
							<span className={styles.icon}>{e.icon}</span>
							{e.label}
						</>
					);

					if (!e.href) return <li key={e.label}>{inner}</li>;

					return (
						<li key={e.label}>
							<Link href={e.href}>
								<a>{inner}</a>
							</Link>
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
