import React from 'react';
import { FormattedMessage } from 'react-intl';

import IconSearch from '../../../public/img/icon-search.svg';

import styles from './searchBar.module.scss';

export default function SearchBar(): JSX.Element {
	return (
		<div className={styles.base}>
			<IconSearch width={24} height={24} />{' '}
			<FormattedMessage
				id={'molecule-searchBar__label'}
				defaultMessage={'Search'}
				description={'search bar label'}
			/>
		</div>
	);
}
