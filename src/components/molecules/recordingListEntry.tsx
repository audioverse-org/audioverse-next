import _ from 'lodash';
import React from 'react';

import styles from '@components/molecules/recordingListEntry.module.scss';
import SpeakerName from '@components/molecules/speakerName';
import { RecordingListFragment } from '@lib/generated/graphql';
import { makeSermonRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

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
	recordings,
}: {
	recordings: RecordingListFragment;
}): JSX.Element {
	const lang = useLanguageRoute();
	const persons = recordings?.persons || [];
	const videoFiles = recordings?.videoFiles || [];

	// TODO: Replace makeSermonRoute with canonical URL provided by API
	// This is doubly important because RecordingList can display things
	// other than sermons.
	return (
		<tr className={styles.item}>
			<td>
				<a href={makeSermonRoute(lang, recordings.id)}>
					<img
						src={_.get(recordings, 'imageWithFallback.url')}
						alt={_.get(recordings, 'title')}
					/>
				</a>
			</td>
			<td>
				<a href={makeSermonRoute(lang, recordings.id)} className={styles.title}>
					{recordings.title}
				</a>
			</td>
			<td className={styles.presenters}>
				<ul>
					{persons.map(
						(p): JSX.Element => (
							<li key={p.id}>
								<SpeakerName person={p} />
							</li>
						)
					)}
				</ul>
			</td>
			<td className={styles.duration}>{formatDuration(recordings.duration)}</td>
			<td>{videoFiles.length > 0 ? 'Video' : 'Audio'}</td>
		</tr>
	);
}
