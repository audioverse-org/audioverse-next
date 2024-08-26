import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading6 from '~components/atoms/heading6';
import Link from '~components/atoms/linkWithoutPrefetch';
import Button from '~components/molecules/button';
import Dropdown from '~components/molecules/dropdown';
import Mininav from '~components/molecules/mininav';
import { SORT_MAP } from '~containers/library/library';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';
import IconFilter from '~public/img/icons/icon-filter-light.svg';
import IconSort from '~public/img/icons/icon-sort-light.svg';

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
		[
			<FormattedMessage
				id="libraryNav__listenLater"
				defaultMessage="Listen Later"
			/>,
			'',
		],
		[
			<FormattedMessage
				id="libraryNav__playlists"
				defaultMessage="Playlists"
			/>,
			'playlists',
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
	const contentTypeOptions: [JSX.Element, string][] = [
		[
			<FormattedMessage
				id="libraryNav__contentType-all"
				defaultMessage="All"
			/>,
			'',
		],
		[
			<FormattedMessage
				id="libraryNav__contentType-people"
				defaultMessage="People"
			/>,
			'people',
		],
		[
			<FormattedMessage
				id="libraryNav__contentType-conferences"
				defaultMessage="Conferences"
			/>,
			'conferences',
		],
		[
			<FormattedMessage
				id="libraryNav__contentType-series"
				defaultMessage="Series"
			/>,
			'series',
		],
		[
			<FormattedMessage
				id="libraryNav__contentType-sponsors"
				defaultMessage="Sponsors"
			/>,
			'sponsors',
		],
		[
			<FormattedMessage
				id="libraryNav__contentType-teachings"
				defaultMessage="Teachings"
			/>,
			'teachings',
		],
		[
			<FormattedMessage
				id="libraryNav__contentType-music"
				defaultMessage="Music"
			/>,
			'music',
		],
		[
			<FormattedMessage
				id="libraryNav__contentType-audiobooks"
				defaultMessage="Audiobooks"
			/>,
			'audiobooks',
		],
		[
			<FormattedMessage
				id="libraryNav__contentType-stories"
				defaultMessage="Stories"
			/>,
			'stories',
		],
	];
	const mediaTypeOptions: [JSX.Element, string][] = [
		[
			<FormattedMessage id="libraryNav__mediaType-all" defaultMessage="All" />,
			'',
		],
		[
			<FormattedMessage
				id="libraryNav__mediaType-video"
				defaultMessage="Video"
			/>,
			'video',
		],
		[
			<FormattedMessage
				id="libraryNav__mediaType-audio"
				defaultMessage="Audio only"
			/>,
			'audio',
		],
	];
	const playbackStatusOptions: [JSX.Element, string][] = [
		[
			<FormattedMessage
				id="libraryNav__playbackStatus-all"
				defaultMessage="All"
			/>,
			'',
		],
		[
			<FormattedMessage
				id="libraryNav__playbackStatus-unstarted"
				defaultMessage="Unstarted"
			/>,
			'unstarted',
		],
		[
			<FormattedMessage
				id="libraryNav__playbackStatus-started"
				defaultMessage="Started"
			/>,
			'started',
		],
		[
			<FormattedMessage
				id="libraryNav__playbackStatus-finished"
				defaultMessage="Finished"
			/>,
			'finished',
		],
	];
	const durationOptions: [JSX.Element, string][] = [
		[
			<FormattedMessage id="libraryNav__duration-all" defaultMessage="All" />,
			'',
		],
		[
			<FormattedMessage
				id="libraryNav__duration-short"
				defaultMessage="15-30 Minutes"
			/>,
			'15',
		],
		[
			<FormattedMessage
				id="libraryNav__duration-medium"
				defaultMessage="30-45 Minutes"
			/>,
			'30',
		],
		[
			<FormattedMessage
				id="libraryNav__duration-long"
				defaultMessage="45-60 Minutes"
			/>,
			'45',
		],
		[
			<FormattedMessage
				id="libraryNav__duration-xlong"
				defaultMessage="Over 60 Minutes"
			/>,
			'60',
		],
	];
	/* eslint-enable react/jsx-key */

	const querySort = (SORT_MAP as Record<string, unknown>)[
		router.query.sort as string
	]
		? (router.query.sort as keyof typeof SORT_MAP)
		: 'new';

	const querycontentType = router.query.contentType as string;
	const contentType = contentTypeOptions
		.map(([, value]) => value)
		.includes(querycontentType)
		? querycontentType
		: '';

	const queryMediaType = router.query.mediaType as string;
	const mediaType = mediaTypeOptions
		.map(([, value]) => value)
		.includes(queryMediaType)
		? queryMediaType
		: '';

	const queryPlaybackStatus = router.query.playbackStatus as string;
	const playbackStatus = playbackStatusOptions
		.map(([, value]) => value)
		.includes(queryPlaybackStatus)
		? queryPlaybackStatus
		: '';

	const queryDuration = router.query.duration as string;
	const duration = durationOptions
		.map(([, value]) => value)
		.includes(queryDuration)
		? queryDuration
		: '';

	const filtersApplied = contentType || mediaType || duration;

	const makeOptionGroup = (
		title: JSX.Element,
		options: [JSX.Element, string][],
		currentOption: string,
		queryKey: string,
	) => (
		<div className={styles.optionGroupWrapper}>
			<Heading6 sans uppercase loose large>
				{title}
			</Heading6>
			<div className={styles.optionGroup}>
				{options.map(([label, value]) => (
					<Link
						href={{
							pathname: router.pathname,
							query: {
								...router.query,
								[queryKey]: value,
							},
						}}
						key={value}
						legacyBehavior
					>
						<a>
							<input
								type="checkbox"
								checked={value === currentOption}
								readOnly
							/>
							{label}
						</a>
					</Link>
				))}
			</div>
		</div>
	);

	return (
		<div className={styles.subnav}>
			<Mininav
				items={navItems.map(([label, slug]) => ({
					id: slug,
					label,
					url: root.lang(languageRoute).library.get() + `/${slug}`,
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
										legacyBehavior
									>
										<a>
											<input
												type="radio"
												name="library-sort"
												value={sort}
												checked={querySort === sort}
												readOnly
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
									filtersApplied ? (
										<FormattedMessage
											id="libraryNav__filtersApplied"
											defaultMessage="Filters applied"
										/>
									) : (
										<FormattedMessage
											id="libraryNav__filter"
											defaultMessage="Filter"
										/>
									)
								}
								IconLeft={IconFilter}
								disabled={disabled}
								className={clsx(
									styles.button,
									(isOpen || filtersApplied) && styles.buttonOpen,
								)}
								{...props}
							/>
						)}
						alignment="right"
					>
						<div className={styles.columns}>
							<div>
								{makeOptionGroup(
									<FormattedMessage
										id="libraryNav__contentType"
										defaultMessage="Content Type"
									/>,
									contentTypeOptions,
									contentType,
									'contentType',
								)}
								{makeOptionGroup(
									<FormattedMessage
										id="libraryNav__playbackStatus"
										defaultMessage="Playback Status"
									/>,
									playbackStatusOptions,
									playbackStatus,
									'playbackStatus',
								)}
							</div>
							<div>
								{makeOptionGroup(
									<FormattedMessage
										id="libraryNav__mediaType"
										defaultMessage="Media Type"
									/>,
									mediaTypeOptions,
									mediaType,
									'mediaType',
								)}
								{makeOptionGroup(
									<FormattedMessage
										id="libraryNav__duration"
										defaultMessage="Duration"
									/>,
									durationOptions,
									duration,
									'duration',
								)}
							</div>
						</div>
					</Dropdown>
				</div>
			)}
		</div>
	);
}
