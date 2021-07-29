import IconSearch from '../../../public/img/icon-search.svg';
import React from 'react';
import styles from './searchBar.module.scss';

export default function SearchBar(): JSX.Element {
	return (
		<div className={styles.base}>
			<IconSearch width={24} height={24} /> Search
		</div>
	);
}
