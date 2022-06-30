export const makeContactRoute = (
	languageRoute: string,
	subpath = '/general'
): string => `/${languageRoute}/contact${subpath}`;
