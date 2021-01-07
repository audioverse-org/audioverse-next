import _ from 'lodash';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import Favorite from '@components/molecules/favorite';
import Player from '@components/molecules/player';
import PlaylistButton from '@components/molecules/playlistButton';
import SpeakerName from '@components/molecules/speakerName';
import type { Person, RecordingTag, Sermon } from 'types';

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
	const tags: RecordingTag[] = _.get(sermon, 'recordingTags.nodes', []);
	const { sponsor = { title: '', location: '' } } = sermon;
	const recordingDateString = new Date(sermon.recordingDate).toLocaleString(
		[],
		{
			hour: 'numeric',
			minute: 'numeric',
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		}
	);

	return (
		<>
			<div className={styles.meta}>
				{imageSrc ? <img src={imageSrc} alt={imageAlt} /> : null}
				<div>
					<h1>{sermon.title}</h1>
					<ul className={styles.speakers}>
						{speakers.map((speaker: Person) => (
							<li key={speaker.id}>
								<SpeakerName person={speaker} />
							</li>
						))}
					</ul>
				</div>
			</div>
			<Favorite id={sermon.id} />
			<PlaylistButton recordingId={sermon.id} />
			<Player sources={sources} />
			{/*TODO: Hide toggle button if no video files*/}
			{hasVideo(sermon) && (
				<button onClick={() => setPrefersAudio(!prefersAudio)}>
					Play {prefersAudio ? 'Video' : 'Audio'}
				</button>
			)}
			<div>
				<p>
					<FormattedMessage
						id="sermonDetailPage__donationMessage"
						defaultMessage="Just a $10 donation will help us reach 300 more people!"
						description="Sermon detail page donation message"
					/>
					{/*TODO: Add CTA URL*/}
					<a href="#">
						<FormattedMessage
							id="sermonDetailPage__donationCta"
							defaultMessage="Give Now!"
							description="Sermon detail page donation CTA"
						/>
					</a>
				</p>
			</div>
			{sermon.description && (
				<>
					<h2>
						<FormattedMessage
							id="sermonDetailPage__descriptionTitle"
							defaultMessage="Description"
							description="Sermon detail description title"
						/>
					</h2>
					<div dangerouslySetInnerHTML={{ __html: sermon.description }} />
				</>
			)}
			{tags.length > 0 && (
				<>
					<h2>
						<FormattedMessage
							id="sermonDetailPage__tagsTitle"
							defaultMessage="Tags"
							description="Sermon detail tags title"
						/>
					</h2>
					<ul>
						{tags.map((t) => (
							<li key={t.tag.id}>
								{/* TODO: link tags */}
								<a href="#">{t.tag.name}</a>
							</li>
						))}
					</ul>
				</>
			)}
			{/*TODO: Add related sermons*/}
			<h2>
				<FormattedMessage
					id="sermonDetailPage__sponsorInfoTitle"
					defaultMessage="Sponsor"
					description="Sermon detail sponsor info title"
				/>
			</h2>
			{/* TODO: link sponsor title */}
			<p>
				<a href="#">{sponsor.title}</a>
				<br />
				<span>{sponsor.location}</span>
			</p>
			<h2>
				<FormattedMessage
					id="sermonDetailPage__presenterInfoTitle"
					defaultMessage="Presenters"
					description="Sermon detail presenter info title"
				/>
			</h2>
			<ul>
				{speakers.map((s) => (
					<li key={s.id}>
						<SpeakerName person={s} />
					</li>
				))}
			</ul>
			{sermon.recordingDate ? (
				<>
					<h2>
						<FormattedMessage
							id="sermonDetailPage__recordedTitle"
							defaultMessage="Recorded"
							description="Sermon detail recorded date title"
						/>
					</h2>
					<p>{recordingDateString}</p>
				</>
			) : null}
		</>
	);
}

export default withFailStates(SermonDetail, (props) => !props.sermon);
