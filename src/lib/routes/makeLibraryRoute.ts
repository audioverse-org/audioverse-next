export const makeLibraryRoute = (languageRoute: string, subpath = ''): string =>
	`/${languageRoute}/library${subpath ? `/${subpath}` : ''}`;
