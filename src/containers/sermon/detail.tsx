import _ from 'lodash';
import React, { useState } from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import Favorite from '@components/molecules/favorite';
import type { Sermon } from 'types';
import Player from '@components/molecules/player';

import styles from './detail.module.scss';

export interface SermonDetailProps {
	sermon: Sermon | null;
}

const getFiles = (sermon: Sermon, prefersAudio: boolean) => {
	const { videoStreams = [], videoFiles = [], audioFiles = [] } = sermon;

	if (prefersAudio) return audioFiles;
	if (videoStreams.length > 0) return videoStreams;
	if (videoFiles.length > 0) return videoFiles;

	return audioFiles;
};

const getSources = (sermon: Sermon, prefersAudio: boolean) => {
	const files = getFiles(sermon, prefersAudio);

	return files.map((f) => ({
		src: f.url,
		type: f.mimeType,
	}));
};

const hasVideo = (sermon: Sermon) => {
	const { videoStreams = [], videoFiles = [] } = sermon;

	return videoStreams.length > 0 || videoFiles.length > 0;
};

function SermonDetail({ sermon }: SermonDetailProps) {
	if (!sermon) return null;

	const [prefersAudio, setPrefersAudio] = useState(false);
	const imageSrc = _.get(sermon, 'imageWithFallback.url');
	const imageAlt = _.get(sermon, 'title');
	const sources = getSources(sermon, prefersAudio);

	return (
		<>
			<div className={styles.meta}>
				{imageSrc ? <img src={imageSrc} alt={imageAlt} /> : null}
				<div>
					<h1>{sermon.title}</h1>
					<ul className={styles.speakers}>
						{sermon.persons.map((speaker: Person) => {
							return <li key={speaker.name}>{speaker.name}</li>;
						})}
					</ul>
				</div>
			</div>
			{sermon.recordingDate ? (
				<p>{new Date(sermon.recordingDate).toLocaleDateString()}</p>
			) : null}
			<Favorite id={sermon.id} />
			<Player sources={sources} />
			{/*TODO: Hide toggle button if no video files*/}
			{hasVideo(sermon) && (
				<button onClick={() => setPrefersAudio(!prefersAudio)}>
					Play {prefersAudio ? 'Video' : 'Audio'}
				</button>
			)}
			{sermon.description ? (
				<div dangerouslySetInnerHTML={{ __html: sermon.description }} />
			) : null}
			Other sermons: ...
		</>
	);
}

export default withFailStates(SermonDetail, (props) => !props.sermon);
