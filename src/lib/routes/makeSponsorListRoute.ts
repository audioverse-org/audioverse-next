export const makeSponsorListRoute = (
	languageRoute: string,
	letter?: string
): string => `/${languageRoute}/sponsors${letter ? `/letter/${letter}` : ''}`;
