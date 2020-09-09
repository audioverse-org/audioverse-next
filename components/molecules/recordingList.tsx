import { useRouter } from 'next/router';
import React from 'react';

export default function RecordingList({ sermons }) {
	const router = useRouter(),
		lang = router.query.language;

	return (
		<ul>
			{sermons.map((s) => (
				<li key={s.id}>
					<a href={`/${lang}/sermons/${s.id}`}>{s.title}</a>
				</li>
			))}
		</ul>
	);
}
