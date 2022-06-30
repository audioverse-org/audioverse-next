export const makeLoginRoute = (
	languageRoute: string,
	redirectUrl?: string
): string =>
	`/${languageRoute}/account/login${redirectUrl ? `?back=${redirectUrl}` : ''}`;
