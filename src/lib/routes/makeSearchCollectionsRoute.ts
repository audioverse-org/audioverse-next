export const makeSearchCollectionsRoute = (
	languageRoute: string,
	term: string,
	page: string | number = 1
): string => `/${languageRoute}/search/collections/page/${page}?q=${term}`;
