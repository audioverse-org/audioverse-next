import React from 'react';

export interface SearchProps {
	sermons?: Sermon[];
}

export default function Search({ sermons = [] }: SearchProps): JSX.Element {
	return (
		<>
			<h2>Search</h2>
			<ul>
				{sermons.map((s, i) => (
					<li key={i}>sermon</li>
				))}
			</ul>
		</>
	);
}
