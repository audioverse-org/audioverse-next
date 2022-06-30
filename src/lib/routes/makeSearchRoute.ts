export const makeSearchRoute = (languageRoute: string, term = ''): string =>
	`/${languageRoute}/search${term ? `?q=${term}` : ''}`;
