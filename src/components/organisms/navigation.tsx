import clsx from 'clsx';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading3 from '~components/atoms/heading3';
import Heading6 from '~components/atoms/heading6';
import Link from '~components/atoms/linkWithoutPrefetch';
import Button from '~components/molecules/button';
import DownloadAppButton from '~components/molecules/downloadAppButton';
import LanguageButton from '~components/molecules/languageButton';
import NavItem from '~components/molecules/navItem';
import Header from '~components/organisms/header';
import { getSessionToken, setSessionToken } from '~lib/cookies';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';
import { INavigationItem, useNavigationItems } from '~lib/useNavigationItems';
import IconUser from '~public/img/icons/fa-user-heavy.svg';
import IconDisclosure from '~public/img/icons/icon-disclosure-light-small.svg';
import IconExit from '~public/img/icons/icon-exit.svg';
import { BaseColors } from '~src/lib/constants';
import useIsAuthenticated from '~src/lib/hooks/useIsAuthenticated';

import { analytics } from '../../lib/analytics';
import IconButton from '../molecules/iconButton';
import OpenAppButton from '../molecules/openAppButton';
import styles from './navigation.module.scss';

const Navigation = ({ onExit }: { onExit: () => void }): JSX.Element => {
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
			analytics.page();
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

	const { user } = useIsAuthenticated();

	const navigationItems = useNavigationItems();
	const submenuItem = navigationItems.find(
		({ key }: INavigationItem) => submenu === key,
	);

	return (
		<header className={styles.header}>
			<div className={styles.mobileHeader}>
				<div className={styles.mobileRow}>
					<Header />
					<IconButton
						aria-label={intl.formatMessage({
							id: 'organism-navigation__exit',
							defaultMessage: 'Exit',
							description: 'Exit button label',
						})}
						Icon={IconExit}
						onClick={() => onExit()}
						color={BaseColors.DARK}
						backgroundColor={BaseColors.CREAM}
						className={styles.exitButton}
					/>
				</div>
			</div>
			<div className={styles.slider}>
				<div className={clsx(styles.sliderColumns, submenu && styles.in)}>
					<div>
						<div className={styles.mobileRow}>
							<LanguageButton
								buttonType="secondary"
								onClick={(baseUrl) => {
									router.push(`/${baseUrl}/`);
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
							href={root.lang(languageRoute).give.get()}
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
								<Link
									href={root.lang(languageRoute).account.loginLanding.get({
										params: {
											back: router.asPath,
										},
									})}
									legacyBehavior
								>
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
						<OpenAppButton className={styles.open_app_side} />
					</div>
					<div
						aria-hidden={submenuItem === undefined}
						className={clsx(styles.submenu, submenu && styles.submenuShown)}
					>
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
													<Link href={href as string} legacyBehavior>
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
										),
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
