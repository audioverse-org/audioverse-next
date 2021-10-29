import { Input, InputAdornment } from '@material-ui/core';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { makeSearchRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import IconExit from '../../../public/img/icon-exit.svg';
import IconSearch from '../../../public/img/icon-search.svg';

import styles from './searchBar.module.scss';

export default function SearchBar({
	className,
	term,
	onChange,
}: {
	term: string;
	onChange: (term: string) => void;
	className?: string;
}): JSX.Element {
	const intl = useIntl();
	const languageRoute = useLanguageRoute();
	const router = useRouter();
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div className={clsx(styles.base, className)}>
			<form
				action={makeSearchRoute(languageRoute)}
				onSubmit={(e) => {
					e.preventDefault();
					router.push(makeSearchRoute(languageRoute, term));
				}}
				className={clsx(styles.inner, isFocused && styles.focused)}
			>
				<Input
					name="q"
					type="search"
					autoComplete="off"
					value={term}
					onChange={({ target }) => onChange(target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					disableUnderline
					startAdornment={
						<InputAdornment position="start" className={styles.icon}>
							<IconSearch width={24} height={24} />
						</InputAdornment>
					}
					placeholder={
						isFocused
							? ''
							: intl.formatMessage({
									id: 'molecule-searchBar__label',
									defaultMessage: 'Search',
									description: 'search bar label',
							  })
					}
					endAdornment={
						term && (
							<InputAdornment
								className={term ? '' : styles.clearHidden}
								position="end"
							>
								<a
									onClick={(e) => {
										e.preventDefault();
										onChange('');
									}}
								>
									<IconExit width={24} height={24} />
								</a>
							</InputAdornment>
						)
					}
				/>
			</form>
		</div>
	);
}
