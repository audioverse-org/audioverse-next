export const makeBlogPostListRoute = (
	languageRoute: string,
	page: string | number = 1
): string => `/${languageRoute}/blog${page > 1 ? `/page/${page}` : ''}`;
