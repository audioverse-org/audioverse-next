import clsx from 'clsx';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading3 from '@components/atoms/heading3';
import Heading6 from '@components/atoms/heading6';
import Button from '@components/molecules/button';
import DownloadAppButton from '@components/molecules/downloadAppButton';
import LanguageButton from '@components/molecules/languageButton';
import NavItem from '@components/molecules/navItem';
import SearchBar from '@components/molecules/searchBar';
import Header from '@components/organisms/header';
import { getSessionToken, setSessionToken } from '@lib/cookies';
import useLanguageRoute from '@lib/useLanguageRoute';
import { useNavigationItems } from '@lib/useNavigationItems';
import { INavigationItem } from '@lib/useNavigationItems';

import IconUser from '../../../public/img/icons/fa-user-heavy.svg';
import IconDisclosure from '../../../public/img/icons/icon-disclosure-light-small.svg';
import IconExit from '../../../public/img/icons/icon-exit.svg';

import styles from './navigation.module.scss';
import { makeLoginRoute } from '@lib/routes/makeLoginRoute';
import { makeDonateRoute } from '@lib/routes/makeDonateRoute';
import { useGetWithAuthGuardDataQuery } from '@components/HOCs/__generated__/withAuthGuard';

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
	const intl = useIntl();
	const router = useRouter();
	const [submenu, setSubmenu] = useState('');
	const sessionToken = getSessionToken();

	useEffect(() => {
		const onRouteChange = (url: string) => {
			const isUrlLanguageHome = !url.replace(/(^\/|\/$)/g, '').includes('/');
			if (isUrlLanguageHome) {
				setSubmenu('');
			}
		};
		Router.events.on('routeChangeComplete', onRouteChange);
		return () => {
			Router.events.off('routeChangeComplete', onRouteChange);
		};
	}, []);

	useEffect(() => {
		if (sessionToken) {
			setSessionToken(sessionToken);
		}
	}, [router.asPath, sessionToken]);

	const authResult = useGetWithAuthGuardDataQuery(
		{},
		{
			enabled: !!sessionToken,
			retry: false,
		}
	);
	const user = authResult.data?.me?.user;

	const navigationItems = useNavigationItems();
	const submenuItem = navigationItems.find(
		({ key }: INavigationItem) => submenu === key
	);

	return (
		<header className={styles.header}>
			<div className={styles.mobileHeader}>
				<div className={styles.mobileRow}>
					<Header />
					<a onClick={() => onExit()}>
						<IconExit />
					</a>
				</div>
				<div className={clsx(styles.mobileRow, styles.mobileSearch)}>
					<SearchBar term={searchTerm} onChange={onSearchChange} />
				</div>
			</div>
			<div className={styles.slider}>
				<div className={clsx(styles.sliderColumns, submenu && styles.in)}>
					<div>
						<div className={styles.mobileRow}>
							<LanguageButton
								buttonType="secondary"
								onClick={(baseUrl) => {
									router.push(`/${baseUrl}/`).then(() => {
										// noop
									});
								}}
								className={styles.languageButton}
							/>
							<DownloadAppButton
								buttonType="secondary"
								menuAlignment="right"
								id="navigation-downloadApp"
								className={styles.downloadButton}
							/>
						</div>

						<ul>
							{navigationItems.slice(0, -1).map((item: INavigationItem) => (
								<NavItem key={item.key} item={item} setSubmenu={setSubmenu} />
							))}
						</ul>

						<Button
							type="super"
							text={
								<FormattedMessage
									id="andNavigation__donate"
									defaultMessage="Donate"
								/>
							}
							href={makeDonateRoute(languageRoute)}
							className={styles.desktopDonate}
						/>

						<div className={styles.account}>
							{user ? (
								<>
									<a
										className={styles.accountWithAvatar}
										onClick={(e) => {
											e.preventDefault();
											setSubmenu('account');
										}}
									>
										<span className={styles.accountAvatar}>
											<IconUser />
										</span>
										<span className={styles.accountName}>
											{user.name ||
												intl.formatMessage({
													id: 'navigation__nameFallback',
													defaultMessage: 'User Account',
												})}
										</span>
									</a>
									<span
										className={styles.iconDisclosure}
										onClick={() => setSubmenu('account')}
									>
										<IconDisclosure />
									</span>
								</>
							) : (
								<Link href={makeLoginRoute(languageRoute, router.asPath)}>
									<a className="decorated">
										<span className={styles.accountAvatar}>
											<IconUser />
										</span>
										<FormattedMessage
											id="navigation__loginSignupCta"
											defaultMessage="Login/Sign up"
										/>
									</a>
								</Link>
							)}
						</div>
					</div>
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
							{Array.isArray(submenuItem?.children)
								? submenuItem?.children?.map(
										({
											key,
											Icon,
											label,
											href,
											onClick,
											isDivider,
											isTargetBlank,
										}: INavigationItem) => (
											<li key={key}>
												{isDivider ? (
													<div className={styles.divider} />
												) : (
													<Link href={href as string}>
														<a
															className={styles.navLink}
															onClick={
																onClick
																	? () =>
																			onClick({
																				popSubmenu: () => setSubmenu(''),
																			})
																	: undefined
															}
															target={isTargetBlank ? '_blank' : '_self'}
														>
															{Icon && (
																<span className={styles.icon}>
																	<Icon />
																</span>
															)}
															<span>{label}</span>
														</a>
													</Link>
												)}
											</li>
										)
								  )
								: null}
							{submenuItem?.childNode}
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navigation;
