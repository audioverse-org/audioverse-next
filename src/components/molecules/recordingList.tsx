import _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './recordingList.module.scss';

interface RecordingListProps {
	sermons: Sermon[];
}

export default function RecordingList({
	sermons,
}: RecordingListProps): JSX.Element {
	const router = useRouter(),
		lang = router.query.language;

	return (
		<ul className={styles.list}>
			{sermons.map((s) => (
				<li key={s.id} className={styles.item}>
					<a href={`/${lang}/sermons/${s.id}`}>
						<img
							src={_.get(s, 'imageWithFallback.url')}
							alt={_.get(s, 'title')}
						/>
						{s.title}
					</a>
				</li>
			))}
		</ul>
	);
}
