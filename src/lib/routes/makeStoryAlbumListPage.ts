export const makeStoryAlbumListPage = (
	languageRoute: string,
	page: string | number = 1
): string =>
	`/${languageRoute}/stories/albums${page > 1 ? `/page/${page}` : ''}`;
