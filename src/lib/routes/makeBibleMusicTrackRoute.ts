import { slug } from '@lib/slug';

export const makeBibleMusicTrackRoute = (
	languageRoute: string,
	bookName: string,
	trackCanonicalPath: string
): string =>
	`/${languageRoute}/songs/book/${slug(bookName)}/${trackCanonicalPath
		.split('/')
		.slice(3)
		.join('/')}`;
