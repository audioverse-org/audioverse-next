import React from 'react';

export default function Home({ sermons }) {
	return (
		<div>
			<ul>
				{sermons.map((s) => (
					<li key={s.id}>{s.title}</li>
				))}
			</ul>
		</div>
	);
}
