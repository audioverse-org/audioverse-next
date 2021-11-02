import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import ActiveLink from '@components/atoms/activeLink';
import Heading3 from '@components/atoms/heading3';
import Heading6 from '@components/atoms/heading6';
import RoundImage from '@components/atoms/roundImage';
import Button from '@components/molecules/button';
import DownloadAppButton from '@components/molecules/downloadAppButton';
import LanguageButton from '@components/molecules/languageButton';
import SearchBar from '@components/molecules/searchBar';
import Header from '@components/organisms/header';
import { useGetWithAuthGuardDataQuery } from '@lib/generated/graphql';
import { getNavigationItems } from '@lib/getNavigationItems';
import { makeDonateRoute, makeLoginRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import IconDisclosure from '../../../public/img/icon-disclosure-light-small.svg';
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
	const authResult = useGetWithAuthGuardDataQuery({}, { retry: false });
	const user = authResult.data?.me?.user;

	const iconSize = 24;
	const navigationItems = getNavigationItems(router, languageRoute);
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
							/>
							<DownloadAppButton menuAlignment="right" />
						</div>

						<ul>
							{navigationItems
								.slice(0, -1)
								.map(({ Icon, key, label, href, children }) => {
									const inner = (
										<>
											{Icon && (
												<span className={styles.icon}>
													<Icon width={iconSize} height={iconSize} />
												</span>
											)}
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
												<a
													className={styles.navLink}
													onClick={() => setSubmenu(key)}
												>
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
								<a
									className={styles.accountWithAvatar}
									onClick={(e) => {
										e.preventDefault();
										setSubmenu('account');
									}}
								>
									{user.image && (
										<div className={styles.accountAvatar}>
											<RoundImage image={user.image.url} small />
										</div>
									)}
									<span className={styles.accountName}>{user.name}</span>
									<span className={styles.iconDisclosure}>
										<IconDisclosure />
									</span>
								</a>
							) : (
								<Link href={makeLoginRoute(languageRoute)}>
									<a className="decorated">
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
										({ key, Icon, label, href, onClick }) => (
											<li key={key}>
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
													>
														{Icon && (
															<span className={styles.icon}>
																<Icon />
															</span>
														)}
														{label}
													</a>
												</Link>
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
