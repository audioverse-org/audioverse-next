export const makeSermonListRoute = (
	languageRoute: string,
	filter = 'all',
	page: string | number = 1
): string => `/${languageRoute}/teachings/${filter}/page/${page}`;
