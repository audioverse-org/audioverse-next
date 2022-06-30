export const makeSeriesListRoute = (
	languageRoute: string,
	page: string | number = 1
): string => `/${languageRoute}/series${page > 1 ? `/page/${page}` : ''}`;
