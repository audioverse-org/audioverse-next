import _ from 'lodash';
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
					<img
						src={_.get(s, 'imageWithFallback.url')}
						alt={_.get(s, 'title')}
					/>
					<a href={`/${lang}/sermons/${s.id}`}>{s.title}</a>
				</li>
			))}
		</ul>
	);
}
