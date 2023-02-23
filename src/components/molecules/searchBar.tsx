import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { makeSearchRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import IconExit from '../../../public/img/icons/icon-exit.svg';
import IconSearch from '../../../public/img/icons/icon-search.svg';

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
				<div className={styles.inputWrapper}>
					<button type="submit" className={styles.icon}>
						<IconSearch width={24} height={24} />
					</button>
					<input
						name="q"
						type="search"
						autoComplete="off"
						value={term}
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
						<div className={clsx(styles.clear, term ? '' : styles.clearHidden)}>
							<a
								onClick={(e) => {
									e.preventDefault();
									onChange('');
								}}
							>
								<IconExit width={24} height={24} />
							</a>
							<button onClick={() => onChange(undefined)}>
								<FormattedMessage
									id="molecule-searchBar__cancel"
									defaultMessage="Cancel"
								/>
							</button>
						</div>
					)}
				</div>
			</form>
		</div>
	);
}
