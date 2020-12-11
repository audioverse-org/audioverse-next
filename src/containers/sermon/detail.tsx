import _ from 'lodash';
import React, { useState } from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import Favorite from '@components/molecules/favorite';
import Player from '@components/molecules/player';

import styles from './detail.module.scss';

export interface SermonDetailProps {
	sermon: Sermon | null;
}

function SermonDetail({ sermon }: SermonDetailProps) {
	if (!sermon) return null;

	const [prefersAudio, setPrefersAudio] = useState(false);

	const imageSrc = _.get(sermon, 'imageWithFallback.url');
	const imageAlt = _.get(sermon, 'title');

	// TODO: Fall back to audio files if no video files
	const files = prefersAudio ? sermon.audioFiles : sermon.videoFiles;
	const sources = files.map((f) => ({
		src: f.url,
		type: f.mimeType,
	}));

	console.log({ prefersAudio, files, sources });

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
			<button
				onClick={() => {
					setPrefersAudio(!prefersAudio);
				}}
			>
				Toggle Video
			</button>
			{/*<video*/}
			{/*	id={`recording-${sermon.id}`}*/}
			{/*	className={'video-js vjs-fluid'}*/}
			{/*	controls*/}
			{/*	preload={'auto'}*/}
			{/*	poster={'https://s.audioverse.org/images/template/player-bg4.jpg'}*/}
			{/*	data-testid={'player'}*/}
			{/*>*/}
			{/*	{sermon.audioFiles.map((file) => {*/}
			{/*		// TODO: Add type attr*/}
			{/*		// https://github.com/avorg/wp-avorg-plugin/blob/master/script/playlist.js#L16*/}
			{/*		return <source key={file.url} src={file.url} type={file.mimeType} />;*/}
			{/*	})}*/}
			{/*	<p className="vjs-no-js">*/}
			{/*		To view this video please enable JavaScript, and consider upgrading to*/}
			{/*		a web browser that*/}
			{/*		<a*/}
			{/*			href="https://videojs.com/html5-video-support/"*/}
			{/*			target="_blank"*/}
			{/*			rel={'noreferrer'}*/}
			{/*		>*/}
			{/*			supports HTML5 video*/}
			{/*		</a>*/}
			{/*	</p>*/}
			{/*</video>*/}
			{/*{sermon.audioFiles.map((file) => {*/}
			{/*	return (*/}
			{/*		<div key={file.url}>*/}
			{/*			<audio controls src={file.url} preload={'metadata'}>*/}
			{/*				Your browser doesn&apos;t support this player.*/}
			{/*			</audio>*/}
			{/*		</div>*/}
			{/*	);*/}
			{/*})}*/}
			{sermon.description ? (
				<div dangerouslySetInnerHTML={{ __html: sermon.description }} />
			) : null}
			Other sermons: ...
		</>
	);
}

export default withFailStates(SermonDetail, (props) => !props.sermon);
