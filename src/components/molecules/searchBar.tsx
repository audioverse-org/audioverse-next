import { filters } from '@components/organisms/searchResults.filters';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import IconExit from '../../../public/img/icons/icon-exit.svg';
import IconSearch from '../../../public/img/icons/icon-search.svg';
import Mininav from './mininav';
import styles from './searchBar.module.scss';

export default function SearchBar({
	className,
	term,
	onChange,
}: {
	term: string | undefined;
	onChange: (term: string | undefined) => void;
	className?: string;
}): JSX.Element {
	const intl = useIntl();
	const [isFocused, setIsFocused] = useState(false);
	const { pathname } = useRouter();

	const tab = undefined;
	const setTab = () => undefined;

	return (
		<div className={clsx(styles.base, term ?? styles.inactive, className)}>
			<div className={clsx(styles.input, isFocused && styles.focused)}>
				<IconSearch width={24} height={24} />
				<input
					name="q"
					type="search"
					autoComplete="off"
					value={term ?? ''}
					onChange={({ target }) => onChange(target.value)}
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
					<button
						className={styles.clear}
						onClick={(e) => {
							e.preventDefault();
							onChange('');
						}}
					>
						<IconExit width={24} height={24} />
					</button>
				)}
			</div>
			<button className={styles.cancel} onClick={() => onChange(undefined)}>
				<FormattedMessage
					id="molecule-searchBar__cancel"
					defaultMessage="Cancel"
				/>
			</button>
			<Mininav
				className={styles.filters}
				theme="light"
				items={Object.entries(filters).map(([id, { heading }]) => ({
					id,
					label: heading,
					isActive: tab === id,
					onClick: () => setTab(id),
				}))}
			/>
		</div>
	);
}
