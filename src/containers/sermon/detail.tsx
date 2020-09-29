import _ from 'lodash';
import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';

import styles from './detail.module.scss';

export interface SermonDetailProps {
	sermon: Sermon | null;
}

function SermonDetail({ sermon }: SermonDetailProps) {
	if (!sermon) return null;

	const imageSrc = _.get(sermon, 'imageWithFallback.url'),
		imageAlt = _.get(sermon, 'title');

	return (
		<>
			<div className={styles.meta}>
				{imageSrc ? <img src={imageSrc} alt={imageAlt} /> : null}
				<div>
					<h1>{sermon.title}</h1>
					<ul className={styles.speakers}>
						{sermon.persons.map((speaker) => {
							return <li key={speaker.name}>{speaker.name}</li>;
						})}
					</ul>
				</div>
			</div>
			{sermon.recordingDate ? (
				<p>{new Date(sermon.recordingDate).toLocaleDateString()}</p>
			) : null}
			{sermon.audioFiles.map((file) => {
				return (
					<div key={file.url}>
						<audio controls src={file.url} preload={'metadata'}>
							Your browser doesn&apos;t support this player.
						</audio>
					</div>
				);
			})}
			{sermon.description ? (
				<div dangerouslySetInnerHTML={{ __html: sermon.description }} />
			) : null}
			Other sermons: ...
		</>
	);
}

export default withFailStates(SermonDetail, (props) => !props.sermon);
