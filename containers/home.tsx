import React from 'react';

export default function Home({ sermons }) {
	return (
		<div>
			<ul>
				{sermons.map((s) => (
					<li key={s.id}>
						<a href={`/en/sermons/${s.id}`}>{s.title}</a>
					</li>
				))}
			</ul>
		</div>
	);
}
