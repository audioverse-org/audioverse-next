import fs from 'fs';
import { dirname, resolve } from 'path';

import { Feed } from 'feed';

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

	recordings.map((i) => feed.addItem(i));

	const path = resolve(PROJECT_ROOT, projectRelativePath);

	if (!path.startsWith(PROJECT_ROOT)) {
		throw new Error('Path not within project');
	}

	fs.mkdirSync(dirname(path), { recursive: true });

	fs.writeFileSync(path, feed.rss2());
}
