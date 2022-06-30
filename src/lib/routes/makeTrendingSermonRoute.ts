export const makeTrendingSermonRoute = (
	languageRoute: string,
	filter = 'all'
): string => `/${languageRoute}/teachings/trending/${filter}`;
