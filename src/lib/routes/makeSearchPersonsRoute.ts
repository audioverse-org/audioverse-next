export const makeSearchPersonsRoute = (
	languageRoute: string,
	term: string,
	page: string | number = 1
): string => `/${languageRoute}/search/persons/page/${page}?q=${term}`;
