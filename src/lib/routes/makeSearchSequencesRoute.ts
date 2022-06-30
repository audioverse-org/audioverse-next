export const makeSearchSequencesRoute = (
	languageRoute: string,
	term: string,
	page: string | number = 1
): string => `/${languageRoute}/search/sequences/page/${page}?q=${term}`;
