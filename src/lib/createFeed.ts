import fs from 'fs';
import { resolve } from 'path';

import { Feed } from 'feed';

import { PROJECT_ROOT } from '@lib/constants';

interface CreateFeedProps {
	recordings: any[];
	title: string;
	projectRelativePath: string;
}

export default function createFeed({
	recordings,
	title,
	projectRelativePath,
}: CreateFeedProps): void {
	const feed = new Feed({
		id: '',
		title,
		copyright: '',
	});

	recordings.map((i) => feed.addItem(i));

	const path = resolve(PROJECT_ROOT, projectRelativePath);

	if (!path.startsWith(PROJECT_ROOT)) {
		throw new Error('Path not within project');
	}

	fs.writeFileSync(path, feed.rss2());
}
