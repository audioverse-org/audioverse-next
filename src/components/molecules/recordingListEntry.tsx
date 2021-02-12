import _ from 'lodash';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from '@components/molecules/recordingListEntry.module.scss';
import SpeakerName from '@components/molecules/speakerName';
import { RecordingListFragment } from '@lib/generated/graphql';
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
	route,
}: {
	recording: RecordingListFragment;
	route: (languageRoute: string, entityId: string) => string;
}): JSX.Element {
	const lang = useLanguageRoute();
	const persons = recording?.persons || [];
	const videoFiles = recording?.videoFiles || [];

	// TODO: Replace route function with canonical URL provided by API
	return (
		<tr className={styles.item}>
			<td>
				<a href={route(lang, recording.id)}>
					<img
						src={_.get(recording, 'imageWithFallback.url')}
						alt={_.get(recording, 'title')}
					/>
				</a>
			</td>
			<td>
				<a href={route(lang, recording.id)} className={styles.title}>
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
			<td>
				{videoFiles.length > 0 ? (
					<FormattedMessage
						id="recordingListEntry__videoLabel"
						defaultMessage="Video"
						description="Recording list entry video label"
					/>
				) : (
					<FormattedMessage
						id="recordingListEntry__audioLabel"
						defaultMessage="Audio"
						description="Recording list entry audio label"
					/>
				)}
			</td>
		</tr>
	);
}
