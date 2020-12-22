import _ from 'lodash';
import React from 'react';

import styles from '@components/molecules/recordingListEntry.module.scss';
import useLanguage from '@lib/useLanguage';
import type { MediaFile, Person, Sermon } from 'types';

const formatDuration = (duration: number): string => {
	duration = Math.round(duration);
	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor((duration - hours * 3600) / 60);
	const seconds = String(duration % 60).padStart(2, '0');
	return `${
		hours ? hours + ':' + String(minutes).padStart(2, '0') : minutes
	}:${seconds}`;
};

export default function RecordingListEntry({
	sermon,
}: {
	sermon: Sermon;
}): JSX.Element {
	const lang = useLanguage();
	const persons: Person[] = _.get(sermon, 'persons', []);
	const videoFiles: MediaFile[] = _.get(sermon, 'videoFiles', []);

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
				<a href={`/${lang}/sermons/${sermon.id}`} className={styles.title}>
					{sermon.title}
				</a>
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
			<td>{videoFiles.length > 0 ? 'Video' : 'Audio'}</td>
		</tr>
	);
}
