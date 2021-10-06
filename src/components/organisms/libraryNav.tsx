import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading6 from '@components/atoms/heading6';
import Button from '@components/molecules/button';
import Dropdown from '@components/molecules/dropdown';
import { makeLibraryRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import IconDisclosure from '../../../public/img/icon-disclosure-light-small.svg';
import IconFilter from '../../../public/img/icon-filter-light.svg';

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
	const languageRoute = useLanguageRoute();
	const navItems: [JSX.Element, string][] = [
		[<FormattedMessage id="libraryNav__all" defaultMessage="All" />, ''],
		[
			<FormattedMessage
				id="libraryNav__collections"
				defaultMessage="Collections"
			/>,
			'collections',
		],
		[
			<FormattedMessage id="libraryNav__started" defaultMessage="Started" />,
			'started',
		],
		[
			<FormattedMessage
				id="libraryNav__unstarted"
				defaultMessage="Not started"
			/>,
			'unstarted',
		],
		[
			<FormattedMessage id="libraryNav__finished" defaultMessage="Finished" />,
			'finished',
		],
		[
			<FormattedMessage id="libraryNav__history" defaultMessage="History" />,
			'history',
		],
	];
	const sortOptions: [JSX.Element, string][] = [
		[
			<FormattedMessage
				id="libraryNav__sortNewest"
				defaultMessage="Newest to Oldest"
			/>,
			'',
		],
		[
			<FormattedMessage
				id="libraryNav__sortOldest"
				defaultMessage="Oldest to Newest"
			/>,
			'',
		],
		[
			<FormattedMessage id="libraryNav__sortAtoZ" defaultMessage="A to Z" />,
			'',
		],
		[
			<FormattedMessage id="libraryNav__sortZtoA" defaultMessage="Z to A" />,
			'',
		],
	];
	/* eslint-enable react/jsx-key */

	return (
		<div className={styles.subnav}>
			<div className={clsx(styles.miniNav, disabled && styles.miniNavDisabled)}>
				{navItems.map(([label, slug]) => (
					<Heading6
						sans
						uppercase
						loose
						large
						unpadded
						key={slug}
						className={clsx(slug === currentNavHref && styles.miniNavActive)}
					>
						<Link href={makeLibraryRoute(languageRoute, slug)}>
							<a>{label}</a>
						</Link>
					</Heading6>
				))}
			</div>
			<div className={styles.toggleButtons}>
				{/* TODO: make buttons functional */}
				<Dropdown
					id="sortMenu"
					trigger={({ isOpen, ...props }) => (
						<Button
							type="secondary"
							text={
								<FormattedMessage
									id="libraryNav__sortNewest"
									defaultMessage="Newest to Oldest"
								/>
							}
							IconLeft={IconDisclosure}
							disabled={disabled}
							className={clsx(styles.button, isOpen && styles.buttonOpen)}
							{...props}
						/>
					)}
					alignment="left"
				>
					<div className={styles.dropdownWrapper}>
						{sortOptions.map(([label, link]) => (
							<p className={styles.paragraph} key={link}>
								<a href={link} target="_blank" rel="noreferrer">
									{label}
								</a>
							</p>
						))}
					</div>
				</Dropdown>
				<Dropdown
					id="filterMenu"
					trigger={({ isOpen, ...props }) => (
						<Button
							type="secondary"
							text={
								<FormattedMessage
									id="libraryNav__filter"
									defaultMessage="Filter"
								/>
							}
							IconLeft={IconFilter}
							disabled={disabled}
							className={clsx(styles.button, isOpen && styles.buttonOpen)}
							{...props}
						/>
					)}
					alignment="right"
				>
					{/* TODO: use filter options */}
					TODO
				</Dropdown>
			</div>
		</div>
	);
}
