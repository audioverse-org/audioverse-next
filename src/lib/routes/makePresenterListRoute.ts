export const makePresenterListRoute = (
	languageRoute: string,
	letter?: string
): string => `/${languageRoute}/presenters${letter ? `/letter/${letter}` : ''}`;
