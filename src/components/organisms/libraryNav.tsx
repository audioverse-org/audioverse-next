import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@components/molecules/button';
import Dropdown from '@components/molecules/dropdown';
import Mininav from '@components/molecules/mininav';
import { SORT_MAP } from '@containers/library';
import { makeLibraryRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import IconFilter from '../../../public/img/icon-filter-light.svg';
import IconSort from '../../../public/img/icon-sort-light.svg';

import styles from './libraryNav.module.scss';

type Props = {
	currentNavHref: string | null;
	disabled?: boolean;
	disableFiltersAndSorts?: boolean;
};

export default function LibraryNav({
	currentNavHref,
	disabled,
	disableFiltersAndSorts,
}: Props): JSX.Element {
	const languageRoute = useLanguageRoute();
	const router = useRouter();

	/* eslint-disable react/jsx-key */
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
			'new',
		],
		[
			<FormattedMessage
				id="libraryNav__sortOldest"
				defaultMessage="Oldest to Newest"
			/>,
			'old',
		],
		[
			<FormattedMessage id="libraryNav__sortAtoZ" defaultMessage="A to Z" />,
			'a',
		],
		[
			<FormattedMessage id="libraryNav__sortZtoA" defaultMessage="Z to A" />,
			'z',
		],
	];
	/* eslint-enable react/jsx-key */

	const querySort = (SORT_MAP as Record<string, unknown>)[
		router.query.sort as string
	]
		? (router.query.sort as keyof typeof SORT_MAP)
		: 'new';

	return (
		<div className={styles.subnav}>
			<Mininav
				items={navItems.map(([label, slug]) => ({
					id: slug,
					label,
					url: makeLibraryRoute(languageRoute, slug),
					isActive: slug === currentNavHref,
				}))}
				disabled={disabled}
			/>
			{!disableFiltersAndSorts && (
				<div className={styles.toggleButtons}>
					<Dropdown
						id="sortMenu"
						trigger={({ isOpen, ...props }) => (
							<Button
								type="secondary"
								text={
									<FormattedMessage
										id="libraryNav__sort"
										defaultMessage="Sort"
									/>
								}
								IconLeft={IconSort}
								disabled={disabled}
								className={clsx(styles.button, isOpen && styles.buttonOpen)}
								{...props}
							/>
						)}
						alignment="right"
					>
						<div className={styles.dropdownWrapper}>
							{sortOptions.map(([label, sort]) => (
								<p className={styles.paragraph} key={sort}>
									<Link
										href={{
											pathname: router.pathname,
											query: {
												...router.query,
												sort,
											},
										}}
									>
										<a>
											<input
												type="radio"
												name="library-sort"
												value={sort}
												checked={querySort === sort}
											/>
											{label}
										</a>
									</Link>
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
			)}
		</div>
	);
}
