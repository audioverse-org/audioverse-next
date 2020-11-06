import fs from 'fs';
import { dirname, resolve } from 'path';

import { Feed } from 'feed';
import _ from 'lodash';

import { PROJECT_ROOT } from '@lib/constants';

interface CreateFeedProps {
	recordings: any[];
	title: string;
	projectRelativePath: string;
}

export default async function createFeed({
	recordings,
	title,
	projectRelativePath,
}: CreateFeedProps): Promise<void> {
	// https://github.com/avorg/wp-avorg-plugin/blob/master/view/page-feed.twig
	// TODO: copyright
	// TODO: itunes:subtitle
	// TODO: id?
	// TODO: itunes:explicit
	// TODO: link
	// TODO: atom:link
	// TODO: itunes:author
	// TODO: image
	// TODO: categories
	const feed = new Feed({
		id: '',
		title,
		copyright: '',
	});

	recordings.map((r) => {
		const file = _.get(r, 'audioFiles[0]') || _.get(r, 'videoFiles[0]'),
			url = _.get(file, 'url'),
			length = _.get(file, 'filesize');

		if (!url) return;

		// https://github.com/avorg/wp-avorg-plugin/blob/master/view/page-feed.twig
		// TODO: Add image
		// TODO: Add itunes:subtitle
		// TODO: Add itunes:author
		// TODO: Add pubDate (?)
		// TODO: Add itunes:duration
		feed.addItem({
			title: r.title,
			description: r.description,
			link: r.canonicalUrl,
			date: new Date(r.recordingDate),
			enclosure: { url, length },
		});
	});

	const path = resolve(PROJECT_ROOT, projectRelativePath);

	if (!path.startsWith(PROJECT_ROOT)) {
		throw new Error('Path not within project');
	}

	fs.mkdirSync(dirname(path), { recursive: true });

	fs.writeFileSync(path, feed.rss2());
}
