import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import React from 'react';

import styles from './detail.module.scss';
import WithFailStates from '@components/templates/withFailStates';
import _ from 'lodash';

export default function SermonDetail({ sermon }) {
	const router = useRouter();

	const imageSrc = _.get(sermon, 'imageWithFallback.url'),
		imageAlt = _.get(sermon, 'title');

	return (
		<WithFailStates
			dependencies={sermon}
			getChildren={() => (
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
					{sermon.recordingDate ? <p>{new Date(sermon.recordingDate).toLocaleDateString()}</p> : null}
					{sermon.audioFiles.map((file) => {
						return (
							<div key={file.url}>
								<audio controls src={file.url} preload={'metadata'}>
									Your browser doesn't support this player.
								</audio>
							</div>
						);
					})}
					{sermon.description ? <div dangerouslySetInnerHTML={{ __html: sermon.description }} /> : null}
					Other sermons: ...
				</>
			)}
		/>
	);
}
