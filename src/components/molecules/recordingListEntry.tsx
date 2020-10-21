import _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import styles from '@components/molecules/recordingListEntry.module.scss';

const formatDuration = (seconds: number, m = 0, h = 0): string => {
	seconds = Math.round(seconds);

	if (seconds >= 60 * 60) {
		return formatDuration(seconds - 60 * 60, m, h + 1);
	}

	if (seconds >= 60) {
		return formatDuration(seconds - 60, m + 1, h);
	}

	const ms = `${m}:${seconds < 10 ? '0' : ''}${seconds}`;

	return h ? `${h}:${h && m < 10 ? '0' : ''}${ms}` : ms;
};

export default function RecordingListEntry({
	sermon,
}: {
	sermon: Sermon;
}): JSX.Element {
	const router = useRouter(),
		lang = router.query.language,
		persons: Person[] = _.get(sermon, 'persons', []);

	return (
		<tr className={styles.item}>
			<td>
				<a href={`/${lang}/sermons/${sermon.id}`}>
					<img
						src={_.get(sermon, 'imageWithFallback.url')}
						alt={_.get(sermon, 'title')}
					/>
				</a>
			</td>
			<td>
				<a href={`/${lang}/sermons/${sermon.id}`}>{sermon.title}</a>
			</td>
			<td className={styles.presenters}>
				<ul>
					{persons.map((p: Person, i: number) => {
						return (
							<li key={i}>
								<a href={`/${lang}/presenters/${p.id}`}>{p.name}</a>
							</li>
						);
					})}
				</ul>
			</td>
			<td className={styles.duration}>{formatDuration(sermon.duration)}</td>
		</tr>
	);
}
