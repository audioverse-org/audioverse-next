import dayjs from 'dayjs';
import { Feed } from 'feed';
import { ExtraItem } from 'feed/lib/typings';
import he from 'he';
import striptags from 'striptags';

import {
	GenerateFeedFragment,
	RecordingContentType,
} from '@lib/generated/graphql';

import getIntl from './getIntl';

export function generateFeed(
	languageRoute: string,
	{
		title,
		description,
		subtitle = description,
		image,
		link,
	}: {
		title: string;
		link: string;
		description?: string;
		subtitle?: string;
		image?: string;
	},
	recordings: GenerateFeedFragment[]
): string {
	const intl = getIntl(languageRoute);

	const feed = new Feed({
		id: '',
		title,
		description: description || title,
		link,
		generator: 'AudioVerse',
		copyright: intl.formatMessage(
			{
				id: 'generatedFeed__copyright',
				defaultMessage:
					'This feed Copyright {year} AudioVerse.  Individual recordings are copyrighted by their respective owners.',
			},
			{
				year: new Date().getFullYear(),
			}
		),
		namespaces: {
			'xmlns:itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd',
			'xmlns:googleplay': 'http://www.google.com/schemas/play-podcasts/1.0',
		},
	});

	if (subtitle) {
		feed.addExtra('itunes:subtitle', subtitle);
	}
	feed.addExtra('language', languageRoute);
	feed.addExtra('itunes:explicit', 'no');
	feed.addExtra('itunes:author', 'AudioVerse');
	feed.addExtra('itunes:owner', {
		'itunes:name': 'AudioVerse',
		'itunes:email': 'contact@audioverse.org',
	});
	if (image) {
		feed.addExtra('image', image);
		feed.addExtra('itunes:image', {
			_attributes: {
				href: image,
			},
		});
	}
	feed.addExtra('itunes:category', {
		_attributes: {
			text: 'Religion &amp; Spirituality',
		},
		'itunes:category': {
			_attributes: {
				text: 'Christianity',
			},
		},
	});

	recordings.map((r) => {
		const {
			id,
			title,
			description,
			publishDate,
			audioFiles,
			videoFiles,
			contentType,
			persons,
			sequence,
			sponsor,
		} = r;
		const files = [...audioFiles, ...videoFiles];
		const file = files[0];

		const url = file.url;
		const length = parseInt(file.filesize);

		let author =
			contentType === RecordingContentType.Story
				? sequence?.title
				: persons.map(({ name }) => name).join(', ');
		if (!author) {
			author = sponsor?.title;
		}

		const isVideo = file.__typename === 'VideoFile';
		const extra: ExtraItem = {
			'itunes:subtitle': intl.formatMessage(
				{
					id: 'generateFeed__subtitle',
					defaultMessage: '{container} {format}, {bitrate} kbps',
				},
				{
					container: isVideo ? file.container.toUpperCase() : 'MP3',
					format: isVideo
						? intl.formatMessage({
								id: 'generateFeed__video',
								defaultMessage: 'Video',
						  })
						: intl.formatMessage({
								id: 'generateFeed__audio',
								defaultMessage: 'Audio',
						  }),
					bitrate: file.bitrate,
				}
			),
			'itunes:author': author,
			'itunes:summary': description
				? striptags(he.decode(description))
						.replace(/(\n|\r)/g, ' ')
						.replace(/\s+/g, ' ')
						.substr(0, 1024)
						.trim()
				: '',
			'itunes:duration': Math.round(file.duration) + '',
		};
		if (image) {
			extra['itunes:image'] = {
				_attributes: {
					href: image,
				},
			};
		}
		feed.addItem({
			link: '',
			guid: `${id}-${file.id}`,
			title: `${author}: ${title}`,
			date: dayjs(publishDate).toDate(),
			enclosure: { url, length, type: file.mimeType },
			extra,
		});
	});

	return feed.rss2();
}
