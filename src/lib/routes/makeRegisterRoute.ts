export const makeRegisterRoute = (
	languageRoute: string,
	redirectUrl?: string
): string =>
	`/${languageRoute}/account/register${
		redirectUrl ? `?back=${redirectUrl}` : ''
	}`;
