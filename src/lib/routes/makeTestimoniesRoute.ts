export const makeTestimoniesRoute = (
	languageRoute: string,
	page: string | number = 1
): string => `/${languageRoute}/testimonies${page > 1 ? `/page/${page}` : ''}`;
