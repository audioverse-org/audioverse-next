import React from 'react';

import RecordingListEntry from '@components/molecules/recordingListEntry';
import useLanguage from '@lib/useLanguage';

import styles from './recordingList.module.scss';

interface RecordingListProps {
	sermons: Sermon[];
}

export default function RecordingList({
	sermons,
}: RecordingListProps): JSX.Element {
	const lang = useLanguage();

	return (
		<div>
			<div>
				<a href={`/${lang}/sermons/page/1`}>All</a>
				<a href={`/${lang}/sermons/video/page/1`}>Video</a>
				<a href={`/${lang}/sermons/audio/page/1`}>Audio</a>
			</div>
			<table className={styles.list}>
				<tbody>
					{sermons.map((s, i) => (
						<RecordingListEntry key={i} sermon={s} />
					))}
				</tbody>
			</table>
		</div>
	);
}
