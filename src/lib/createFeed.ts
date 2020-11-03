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
	const feed = new Feed({
		id: '',
		title,
		copyright: '',
	});

	recordings.map((i) => {
		const file = _.get(i, 'audioFiles[0]') || _.get(i, 'videoFiles[0]'),
			url = _.get(file, 'url'),
			length = _.get(file, 'filesize');

		if (!url) return;

		feed.addItem({
			title: i.title,
			description: i.description,
			link: i.canonicalUrl,
			date: new Date(i.recordingDate),
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
