import _ from 'lodash';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Favorite from '@components/molecules/favorite';
import Player from '@components/molecules/player';
import PlaylistButton from '@components/molecules/playlistButton';
import SpeakerName from '@components/molecules/speakerName';
import styles from '@containers/sermon/detail.module.scss';
import { RecordingFragment } from '@lib/generated/graphql';
import { readableBytes } from '@lib/readableBytes';
import { makeSeriesRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

export type Sermon = NonNullable<RecordingFragment>;

interface Playable {
	url: string;
	mimeType: string;
}

const getFiles = (sermon: Sermon, prefersAudio: boolean): Playable[] => {
	const { videoStreams = [], videoFiles = [], audioFiles = [] } = sermon;

	if (prefersAudio) return audioFiles;
	if (videoStreams.length > 0) return videoStreams;
	if (videoFiles.length > 0) return videoFiles;

	return audioFiles;
};

const getSources = (sermon: Sermon, prefersAudio: boolean) => {
	const files = getFiles(sermon, prefersAudio) || [];

	return files.map((f) => ({
		src: f.url,
		type: f.mimeType,
	}));
};

const hasVideo = (sermon: Sermon) => {
	const { videoStreams = [], videoFiles = [] } = sermon;

	return videoStreams.length > 0 || videoFiles.length > 0;
};

interface SermonProps {
	sermon: RecordingFragment;
}

export function Recording({ sermon }: SermonProps): JSX.Element {
	const langRoute = useLanguageRoute();
	const [prefersAudio, setPrefersAudio] = useState(false);
	const imageSrc = _.get(sermon, 'imageWithFallback.url');
	const imageAlt = _.get(sermon, 'title');
	const sources = getSources(sermon, prefersAudio);
	const speakers = sermon?.persons || [];
	const tags = sermon?.recordingTags?.nodes || [];
	const {
		sponsor = { title: '', location: '' },
		videoDownloads = [],
		audioDownloads = [],
	} = sermon;
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
	const copyrightOwner =
		sermon?.distributionAgreement?.sponsor?.title || sermon?.sponsor?.title;
	const copyrightImageUrl = sermon?.distributionAgreement?.license?.image?.url;
	const hasVideoDownloads = videoDownloads.length > 0;
	const hasAudioDownloads = audioDownloads.length > 0;
	const hasDownloads = hasVideoDownloads || hasAudioDownloads;
	return (
		<>
			<div className={styles.meta}>
				{imageSrc ? <img src={imageSrc} alt={imageAlt} /> : null}
				<div>
					<h1>{sermon.title}</h1>
					<ul className={styles.speakers}>
						{speakers.map((speaker) => (
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
				<a href="#">{sponsor?.title}</a>
				<br />
				<span>{sponsor?.location}</span>
			</p>
			{/* TODO: If no presenters (see sermon 4689) don't show presenters section */}
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
			{sermon?.sequence && (
				<>
					<h2>
						<FormattedMessage
							id="sermonDetailPage__seriesTitle"
							defaultMessage="Series"
							description="Sermon detail series title"
						/>
					</h2>
					<a href={makeSeriesRoute(langRoute, sermon?.sequence?.id)}>
						{sermon?.sequence?.title}
					</a>
				</>
			)}
			{hasDownloads && (
				<>
					<h2>
						<FormattedMessage
							id="sermonDetailPage__downloadsTitle"
							defaultMessage="Downloads"
							description="Sermon detail downloads title"
						/>
					</h2>
					{hasAudioDownloads && (
						<>
							<h3>
								<FormattedMessage
									id="sermonDetailPage__downloadsAudioTitle"
									defaultMessage="Audio Files"
									description="Sermon detail audio downloads title"
								/>
							</h3>
							<ul>
								{audioDownloads.map((file) => (
									<li key={file.id}>
										<a href={file.url}>{readableBytes(file.filesize)}</a>
									</li>
								))}
							</ul>
						</>
					)}
					{hasVideoDownloads && (
						<>
							<h3>
								<FormattedMessage
									id="sermonDetailPage__downloadsVideoTitle"
									defaultMessage="Video Files"
									description="Sermon detail video downloads title"
								/>
							</h3>
							<ul>
								{videoDownloads.map((file) => (
									<li key={file.id}>
										<a href={file.url}>{readableBytes(file.filesize)}</a>
									</li>
								))}
							</ul>
						</>
					)}
				</>
			)}
			{copyrightImageUrl && <img alt={'copyright'} src={copyrightImageUrl} />}
			<p>
				<span>
					<FormattedMessage
						id={'sermonDetailPage__copyright'}
						defaultMessage={'Copyright ⓒ{year} {owner}'}
						description={'Copyright year and owner'}
						values={{
							year: sermon?.copyrightYear,
							owner: copyrightOwner,
						}}
					/>
				</span>
				<br />
				<span>{sermon?.distributionAgreement?.license?.summary}</span>
			</p>
		</>
	);
}
