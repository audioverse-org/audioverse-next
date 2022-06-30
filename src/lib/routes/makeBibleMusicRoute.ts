import { slug } from '@lib/slug';

export const makeBibleMusicRoute = (
	languageRoute: string,
	bookName: string
): string => `/${languageRoute}/songs/book/${slug(bookName)}`;
