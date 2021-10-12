import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import ActiveLink from '@components/atoms/activeLink';
import Heading3 from '@components/atoms/heading3';
import Heading6 from '@components/atoms/heading6';
import Button from '@components/molecules/button';
import LanguageButton from '@components/molecules/languageButton';
import LoadingIndicator from '@components/molecules/loadingIndicator';
import SearchBar from '@components/molecules/searchBar';
import Header from '@components/organisms/header';
import { getNavigationItems } from '@lib/getNavigationItems';
import { makeLoginRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import IconDisclosure from '../../../public/img/icon-disclosure-light-small.svg';
import IconDownload from '../../../public/img/icon-download-light.svg';
import IconExit from '../../../public/img/icon-exit.svg';

import styles from './navigation.module.scss';

const Navigation = ({
	onExit,
	searchTerm,
	onSearchChange,
}: {
	onExit: () => void;
	searchTerm: string;
	onSearchChange: (term: string) => void;
}): JSX.Element => {
	const languageRoute = useLanguageRoute();
	const router = useRouter();
	const [submenu, setSubmenu] = useState('');

	const iconSize = 24;
	const navigationItems = getNavigationItems(languageRoute);
	const submenuItem = navigationItems.find(({ key }) => submenu === key);

	return (
		<header className={styles.header}>
			<div className={styles.mobileHeader}>
				<div className={styles.mobileRow}>
					<Header />
					<a onClick={() => onExit()}>
						<IconExit />
					</a>
				</div>
				<div className={styles.mobileRow}>
					<SearchBar term={searchTerm} onChange={onSearchChange} />
				</div>
				<div className={styles.mobileRow}>
					<LanguageButton
						buttonType="secondary"
						onClick={(baseUrl) => {
							router.push(`/${baseUrl}/`);
						}}
					/>
					<Button
						type="secondary"
						text={
							<FormattedMessage
								id="navigation__downloadApp"
								defaultMessage="Download App"
							/>
						}
						IconLeft={IconDownload}
						IconRight={IconDisclosure}
						className={styles.downloadButton}
					/>
				</div>
			</div>
			<ul>
				{navigationItems.map(({ Icon, key, label, href, children }) => {
					const inner = (
						<>
							<span className={styles.icon}>
								<Icon width={iconSize} height={iconSize} />
							</span>
							{label}
							{children && (
								<span className={styles.iconDisclosure}>
									<IconDisclosure />
								</span>
							)}
						</>
					);

					if (!href) {
						return (
							<li key={key}>
								<a className={styles.navLink} onClick={() => setSubmenu(key)}>
									{inner}
								</a>
							</li>
						);
					}

					return (
						<li key={key}>
							<ActiveLink href={href} activeClassName={styles.active}>
								<a
									className={styles.navLink}
									onClick={
										children
											? (e) => {
													e.preventDefault();
													setSubmenu(key);
											  }
											: undefined
									}
								>
									{inner}
								</a>
							</ActiveLink>
						</li>
					);
				})}
			</ul>

			<div className={clsx(styles.submenu, submenu && styles.submenuShown)}>
				<a
					className={styles.backToMenu}
					onClick={(e) => {
						e.preventDefault();
						setSubmenu('');
					}}
				>
					<IconDisclosure />
					<Heading6 sans uppercase unpadded>
						<FormattedMessage
							id="navigation__backToMenu"
							defaultMessage="Back to Menu"
						/>
					</Heading6>
				</a>
				<Heading3 sans className={styles.submenuHeading}>
					{submenuItem?.label}
				</Heading3>
				<ul className={styles.submenuItems}>
					{submenuItem?.children?.map(({ key, Icon, label, href }) => (
						<li key={key}>
							<Link href={href as string}>
								<a className={styles.navLink}>
									<span className={styles.icon}>
										<Icon />
									</span>
									{label}
								</a>
							</Link>
						</li>
					))}
				</ul>
			</div>

			<div className={styles.account}>
				{/* TODO: handle logged-in state */}
				<Link href={makeLoginRoute(languageRoute)}>
					<a className="decorated">
						<FormattedMessage
							id="navigation__loginSignupCta"
							defaultMessage="Login/Sign up"
						/>
					</a>
				</Link>
			</div>

			<LoadingIndicator />
		</header>
	);
};

export default Navigation;
