import fs from 'fs';

import { Feed } from 'feed';

interface CreateFeedProps {
	recordings: any[];
	title: string;
}

export default function createFeed({
	recordings,
	title,
}: CreateFeedProps): void {
	const feed = new Feed({
		id: '',
		title,
		copyright: '',
	});

	recordings.map((i) => feed.addItem(i));

	fs.writeFileSync('./public/sermons/all.xml', feed.rss2());
}
