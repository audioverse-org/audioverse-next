export const makeAudiobookListRoute = (
	languageRoute: string,
	page: string | number = 1
): string => `/${languageRoute}/books${page > 1 ? `/page/${page}` : ''}`;
