import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import {
	EntityFilterId,
	filters,
} from '~components/organisms/searchResults.filters';
import IconExit from '~public/img/icons/icon-exit.svg';
import IconSearch from '~public/img/icons/icon-search.svg';

import { analytics } from '../../lib/analytics';
import Mininav from './mininav';
import styles from './searchBar.module.scss';

export default function SearchBar({
	className,
	inputClassName,
	filtersClassName,
	term,
	onTermChange,
	entityType,
	onEntityTypeChange,
	IconClear = IconExit,
	onSubmit,
	stealFocus,
}: {
	term: string | undefined;
	onTermChange: (term: string | undefined) => void;
	className?: string;
	inputClassName?: string;
	filtersClassName?: string;
	entityType?: EntityFilterId;
	onEntityTypeChange?: (entityType: EntityFilterId) => void;
	IconClear?: React.ComponentType;
	onSubmit?: () => void;
	stealFocus?: boolean;
}): JSX.Element {
	const intl = useIntl();
	const [isFocused, setIsFocused] = useState(false);
	const [lastTerm, setLastTerm] = useState(term);
	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleSubmit = useCallback(
		(e: KeyboardEvent) => e.key === 'Enter' && onSubmit?.(),
		[onSubmit],
	);

	useEffect(() => {
		if (isFocused) {
			document.addEventListener('keydown', handleSubmit);
		} else {
			document.removeEventListener('keydown', handleSubmit);
		}
		return () => {
			document.removeEventListener('keydown', handleSubmit);
		};
	}, [isFocused, handleSubmit, term]);

	useEffect(() => {
		if (
			stealFocus &&
			!isFocused &&
			lastTerm === undefined &&
			term !== undefined
		) {
			inputRef.current?.focus();
		}
	}, [term, lastTerm, isFocused, stealFocus]);

	return (
		<div className={clsx(styles.base, term ?? styles.inactive, className)}>
			<div
				className={clsx(
					styles.input,
					isFocused && styles.focused,
					inputClassName,
				)}
			>
				<IconSearch width={24} height={24} />
				<input
					name="q"
					type="search"
					autoComplete="off"
					value={term ?? ''}
					onChange={({ target }) => onTermChange(target.value)}
					onFocus={() => setIsFocused(true)}
					aria-label={intl.formatMessage({
						id: 'molecule-searchBar__ariaLabel',
						defaultMessage: 'search',
						description: 'search bar label',
					})}
					onBlur={() => {
						setIsFocused(false);
						if (lastTerm != term && term != '') {
							analytics.track('Search', { term });
							setLastTerm(term);
						}
					}}
					placeholder={
						isFocused
							? ''
							: intl.formatMessage({
									id: 'molecule-searchBar__label',
									defaultMessage: 'Search',
									description: 'search bar label',
								})
					}
					ref={inputRef}
				/>
				{term && (
					<button className={styles.clear} onClick={() => onTermChange('')}>
						<IconClear />
					</button>
				)}
			</div>
			<button className={styles.cancel} onClick={() => onTermChange(undefined)}>
				<FormattedMessage
					id="molecule-searchBar__cancel"
					defaultMessage="Cancel"
				/>
			</button>
			{entityType && onEntityTypeChange && (
				<Mininav
					className={clsx(styles.filters, filtersClassName)}
					theme="light"
					items={Object.entries(filters).map(([id, { heading }]) => ({
						id,
						label: heading,
						isActive: entityType === id,
						onClick: () => onEntityTypeChange(id),
					}))}
				/>
			)}
		</div>
	);
}
