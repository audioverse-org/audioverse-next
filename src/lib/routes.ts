export const makePaginationRoute = (
	base: string,
	page: number | string
): string => `${base}/page/${page}`;

export const makeSermonRoute = (
	languageRoute: string,
	sermonId: string
): string => `/${languageRoute}/sermons/${sermonId}`;

export const makePersonRoute = (
	languageRoute: string,
	personId: string
): string => `/${languageRoute}/presenters/${personId}`;

export const makeSeriesRoute = (
	languageRoute: string,
	seriesId: string
): string => `/${languageRoute}/series/${seriesId}`;

export const makeSermonListRouteAll = (
	languageRoute: string,
	page: number | string
): string => `/${languageRoute}/sermons/all/page/${page}`;

export const makeSermonListRouteVideo = (
	languageRoute: string,
	page: number | string
): string => `/${languageRoute}/sermons/video/page/${page}`;

export const makeSermonListRouteAudio = (
	languageRoute: string,
	page: number | string
): string => `/${languageRoute}/sermons/audio/page/${page}`;

export const makeSermonListBaseRoute = (
	languageRoute: string,
	filter: string
): string => `/${languageRoute}/sermons/${filter}`;

export const makeTagDetailBaseRoute = (
	languageRoute: string,
	tagSlug: string
): string => `/${languageRoute}/tags/${tagSlug}`;
