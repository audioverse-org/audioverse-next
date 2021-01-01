import _ from 'lodash';
import React, { useState } from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import Favorite from '@components/molecules/favorite';
import Player from '@components/molecules/player';
import PlaylistButton from '@components/molecules/playlistButton';
import SpeakerName from '@components/molecules/speakerName';
import type { Person, Sermon } from 'types';

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
	const speakers: Person[] = _.get(sermon, 'persons', []);

	return (
		<>
			<div className={styles.meta}>
				{imageSrc ? <img src={imageSrc} alt={imageAlt} /> : null}
				<div>
					<h1>{sermon.title}</h1>
					<ul className={styles.speakers}>
						{speakers.map((speaker: Person) => (
							<li key={speaker.name}>
								<SpeakerName person={speaker} />
							</li>
						))}
					</ul>
				</div>
			</div>
			{sermon.recordingDate ? (
				<p>{new Date(sermon.recordingDate).toLocaleDateString()}</p>
			) : null}
			<Favorite id={sermon.id} />
			<PlaylistButton recordingId={sermon.id} />
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
