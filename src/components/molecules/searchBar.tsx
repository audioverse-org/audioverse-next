import { Input, InputAdornment } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useIntl } from 'react-intl';

import IconExit from '../../../public/img/icon-exit.svg';
import IconSearch from '../../../public/img/icon-search.svg';

import styles from './searchBar.module.scss';

export default function SearchBar({
	className,
	term,
	onChange,
	onExit,
}: {
	term: string;
	onChange: (term: string) => void;
	onExit: () => void;
	className?: string;
}): JSX.Element {
	const intl = useIntl();
	return (
		<div className={clsx(styles.base, className)}>
			<Input
				value={term}
				onChange={({ target }) => onChange(target.value)}
				disableUnderline
				startAdornment={
					<InputAdornment position="start">
						<IconSearch width={24} height={24} />
					</InputAdornment>
				}
				placeholder={intl.formatMessage({
					id: 'molecule-searchBar__label',
					defaultMessage: 'Search',
					description: 'search bar label',
				})}
				endAdornment={
					<InputAdornment
						className={term ? '' : styles.clearHidden}
						position="end"
					>
						<a
							onClick={(e) => {
								e.preventDefault();
								onExit();
							}}
						>
							<IconExit width={24} height={24} />
						</a>
					</InputAdornment>
				}
			/>
		</div>
	);
}
