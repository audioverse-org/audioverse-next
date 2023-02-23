import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
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
	const [isFocused, setIsFocused] = useState(false);
	const { pathname } = useRouter();
	const shouldHideCancelButton =
		pathname.includes('/[language]/search') || term === undefined;

	return (
		<div className={clsx(styles.base, className)}>
			<div className={clsx(styles.inner, isFocused && styles.focused)}>
				<div className={styles.inputWrapper}>
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
						<div className={clsx(styles.clear, term ?? styles.hide)}>
							<button
								onClick={(e) => {
									e.preventDefault();
									onChange('');
								}}
							>
								<IconExit width={24} height={24} />
							</button>
						</div>
					)}
				</div>
			</div>
			<button
				className={clsx(styles.cancel, shouldHideCancelButton && styles.hide)}
				onClick={() => onChange(undefined)}
			>
				<FormattedMessage
					id="molecule-searchBar__cancel"
					defaultMessage="Cancel"
				/>
			</button>
		</div>
	);
}
