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
	recording,
}: {
	recording: RecordingListFragment;
}): JSX.Element {
	const lang = useLanguageRoute();
	const persons = recording?.persons || [];
	const videoFiles = recording?.videoFiles || [];

	// TODO: Replace makeSermonRoute with canonical URL provided by API
	// This is doubly important because RecordingList can display things
	// other than sermons.
	return (
		<tr className={styles.item}>
			<td>
				<a href={makeSermonRoute(lang, recording.id)}>
					<img
						src={_.get(recording, 'imageWithFallback.url')}
						alt={_.get(recording, 'title')}
					/>
				</a>
			</td>
			<td>
				<a href={makeSermonRoute(lang, recording.id)} className={styles.title}>
					{recording.title}
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
			<td className={styles.duration}>{formatDuration(recording.duration)}</td>
			<td>{videoFiles.length > 0 ? 'Video' : 'Audio'}</td>
		</tr>
	);
}
