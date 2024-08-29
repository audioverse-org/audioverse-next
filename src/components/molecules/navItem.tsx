import React from 'react';

import ActiveLink from '~components/atoms/activeLink';
// TODO: Split into its own SCSS module
import styles from '~components/organisms/navigation.module.scss';
import { INavigationItem } from '~lib/useNavigationItems';
import IconDisclosure from '~public/img/icons/icon-disclosure-light-small.svg';

import { analytics } from '../../lib/analytics';

export default function NavItem({
	item,
	setSubmenu,
}: {
	item: INavigationItem;
	setSubmenu: (key: string) => void;
}): JSX.Element {
	const { Icon, key, label, href, children } = item;

	const inner = (
		<>
			<div className={styles.icon}>{Icon && <Icon />}</div>
			<span className={styles.label}>{label}</span>
		</>
	);

	return (
		<li>
			{href ? (
				<ActiveLink
					href={href}
					className={styles.navLink}
					activeClassName={styles.active}
					linkLabel={label}
				>
					{inner}
				</ActiveLink>
			) : (
				<a
					className={styles.navLink}
					onClick={() => {
						analytics.track('Menu click', { label });
						return setSubmenu(key);
					}}
				>
					{inner}
				</a>
			)}
			{children && (
				<span
					className={styles.iconDisclosure}
					onClick={(e) => {
						e.preventDefault();
						setSubmenu(key);
					}}
				>
					<IconDisclosure />
				</span>
			)}
		</li>
	);
}
