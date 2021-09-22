import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading6 from '@components/atoms/heading6';
import Button from '@components/molecules/button';

import IconDisclosure from '../../../public/img/icon-disclosure-light-small.svg';

import styles from './libraryNav.module.scss';

type Props = {
	currentNavHref: string | null;
	disabled?: boolean;
};

export default function LibraryNav({
	currentNavHref,
	disabled,
}: Props): JSX.Element {
	/* eslint-disable react/jsx-key */
	const navItems: [JSX.Element, string][] = [
		[<FormattedMessage id="libraryNav__all" defaultMessage="All" />, ''],
		[
			<FormattedMessage
				id="libraryNav__playlists"
				defaultMessage="Playlists"
			/>,
			'/playlists',
		],
		[
			<FormattedMessage id="libraryNav__started" defaultMessage="Started" />,
			'/started',
		],
		[
			<FormattedMessage
				id="libraryNav__unstarted"
				defaultMessage="Not started"
			/>,
			'/unstarted',
		],
		[
			<FormattedMessage id="libraryNav__finished" defaultMessage="Finished" />,
			'/finished',
		],
		[
			<FormattedMessage id="libraryNav__history" defaultMessage="History" />,
			'/history',
		],
	];
	/* eslint-enable react/jsx-key */

	return (
		<div className={styles.subnav}>
			<div className={clsx(styles.miniNav, disabled && styles.miniNavDisabled)}>
				{navItems.map(([label, href]) => (
					<Heading6
						sans
						uppercase
						loose
						large
						unpadded
						key={href}
						className={clsx(href === currentNavHref && styles.miniNavActive)}
					>
						<Link href={href}>
							<a>{label}</a>
						</Link>
					</Heading6>
				))}
			</div>
			{/* TODO: make button functional */}
			<Button
				type="secondary"
				text={
					<FormattedMessage
						id="libraryNav__sortRecent"
						defaultMessage="Recent"
					/>
				}
				Icon={IconDisclosure}
				disabled={disabled}
			/>
		</div>
	);
}
