export const makeSearchTeachingsRoute = (
	languageRoute: string,
	term: string,
	page: string | number = 1
): string => `/${languageRoute}/search/teachings/page/${page}?q=${term}`;
