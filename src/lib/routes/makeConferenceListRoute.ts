export const makeConferenceListRoute = (
	languageRoute: string,
	page: string | number = 1
): string => `/${languageRoute}/conferences${page > 1 ? `/page/${page}` : ''}`;
