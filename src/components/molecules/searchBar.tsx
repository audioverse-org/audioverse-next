import {
	EntityFilterId,
	filters,
} from '@components/organisms/searchResults.filters';
import clsx from 'clsx';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import IconExit from '../../../public/img/icons/icon-exit.svg';
import IconSearch from '../../../public/img/icons/icon-search.svg';
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
}: {
	term: string | undefined;
	onTermChange: (term: string | undefined) => void;
	className?: string;
	inputClassName?: string;
	filtersClassName?: string;
	entityType: EntityFilterId;
	onEntityTypeChange: (entityType: EntityFilterId) => void;
	IconClear?: React.ComponentType;
}): JSX.Element {
	const intl = useIntl();
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div className={clsx(styles.base, term ?? styles.inactive, className)}>
			<div
				className={clsx(
					styles.input,
					isFocused && styles.focused,
					inputClassName
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
					onBlur={() => setIsFocused(false)}
					placeholder={
						isFocused
							? ''
							: intl.formatMessage({
									id: 'molecule-searchBar__label',
									defaultMessage: 'Search',
									description: 'search bar label',
							  })
					}
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
		</div>
	);
}
