import { Feed } from 'feed';

import { GenerateFeedFragment } from '@lib/generated/graphql';

import getIntl from './getIntl';
import getLanguageByBaseUrl from './getLanguageByBaseUrl';

export function generateFeed(
	feedTitle: string,
	recordings: GenerateFeedFragment[],
	languageRoute: string
): string {
	const intl = getIntl(languageRoute);
	const language = getLanguageByBaseUrl(languageRoute);

	// TODO: Switch to automatic ID generation:
	// https://formatjs.io/docs/getting-started/message-extraction/#automatic-id-generation
	const title = intl.formatMessage(
		{
			id: 'feed-title',
			defaultMessage: '{identifier} | AudioVerse {lang}',
			description: 'Generic feed title',
		},
		{
			identifier: feedTitle,
			lang: language?.display_name,
		}
	);

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
		const { audioFiles = [], feedVideoFiles = [] } = r;
		const files = [...audioFiles, ...feedVideoFiles];
		const file = files.length && files[0];

		if (!file) return;

		const url = file.url;
		const length = parseInt(file.filesize);

		if (!url) return;

		// https://github.com/avorg/wp-avorg-plugin/blob/master/view/page-feed.twig
		// TODO: Add image
		// TODO: Add itunes:subtitle
		// TODO: Add itunes:author
		// TODO: Add pubDate (?)
		// TODO: Add itunes:duration
		feed.addItem({
			title: r.title,
			description: r.description || undefined,
			link: r.canonicalUrl,
			date: new Date(r.recordingDate || ''),
			enclosure: { url, length },
		});
	});

	return feed.rss2();
}
