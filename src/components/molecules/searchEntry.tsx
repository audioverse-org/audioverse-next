import React from 'react';

import styles from './searchEntry.module.scss';

interface SearchEntryProps {
	type: string;
	title: string;
	metaLines?: string[];
}

const SearchEntry = ({
	type,
	title,
	metaLines = [],
}: SearchEntryProps): JSX.Element => (
	<div className={styles.entry}>
		<p>{type}</p>
		<h3>{title}</h3>
		<p>
			{metaLines.map((l, i) => (
				<span key={i}>
					{l}
					<br />
				</span>
			))}
		</p>
	</div>
);

export default SearchEntry;
