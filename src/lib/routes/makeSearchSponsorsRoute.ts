export const makeSearchSponsorsRoute = (
	languageRoute: string,
	term: string,
	page: string | number = 1
): string => `/${languageRoute}/search/sponsors/page/${page}?q=${term}`;
