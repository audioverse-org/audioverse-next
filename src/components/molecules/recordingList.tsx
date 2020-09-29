import { useRouter } from 'next/router';
import React from 'react';

interface RecordingListProps {
	sermons: Sermon[];
}

export default function RecordingList({
	sermons,
}: RecordingListProps): JSX.Element {
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
