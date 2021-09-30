import { Scalars } from './generated/graphql';

const slug = (s: string): string => s.replace(/\s/g, '-').toLowerCase();

export const makePaginationRoute = (
	base: string,
	page: string | number
): string => `${base}/page/${page}`;

export const makePresenterListRoute = (
	languageRoute: string,
	page: string | number
): string => `/${languageRoute}/presenters/page/${page}`;

export const makePresenterRecordingsRoute = (
	languageRoute: string,
	personId: Scalars['ID'],
	page: string | number = 1
): string => `/${languageRoute}/presenters/${personId}/page/${page}`;

export const makePresenterFeedRoute = (
	languageRoute: string,
	personId: Scalars['ID']
): string => `/${languageRoute}/presenters/${personId}/feed.xml`;

export const makePresenterTopRecordingsRoute = (
	languageRoute: string,
	personId: Scalars['ID']
): string => `/${languageRoute}/presenters/${personId}/top`;

export const makePresenterSequencesRoute = (
	languageRoute: string,
	personId: Scalars['ID'],
	page: string | number = 1
): string => `/${languageRoute}/presenters/${personId}/sequences/page/${page}`;

export const makePresenterAlsoAppearsInRoute = (
	languageRoute: string,
	personId: Scalars['ID'],
	page: string | number = 1
): string => `/${languageRoute}/presenters/${personId}/appears/page/${page}`;

export const makeSeriesDetailRoute = (
	languageRoute: string,
	seriesId: Scalars['ID'],
	page: string | number = 1
): string => `/${languageRoute}/series/${seriesId}/page/${page}`;

export const makeSeriesFeedRoute = (
	languageRoute: string,
	seriesId: Scalars['ID']
): string => `/${languageRoute}/series/${seriesId}/feed.xml`;

export const makeSeriesListRoute = (
	languageRoute: string,
	page: string | number = 1
): string => `/${languageRoute}/series/page/${page}`;

export const makeTagDetailRoute = (
	languageRoute: string,
	tagName: string,
	pageIndex = 1
): string =>
	`/${languageRoute}/tags/${encodeURIComponent(tagName)}/page/${pageIndex}`;

export const makeTagListRoute = (
	languageRoute: string,
	pageIndex = 1
): string => `/${languageRoute}/tags/page/${pageIndex}`;

export const makeSermonListRoute = (
	languageRoute: string,
	filter = 'all',
	page: string | number = 1
): string => `/${languageRoute}/teachings/${filter}/page/${page}`;

export const makeSermonsFeedRoute = (languageRoute: string): string =>
	`/${languageRoute}/teachings/all/feed.xml`;

export const makeBibleListRoute = (languageRoute: string): string =>
	`/${languageRoute}/bibles`;

export const makeBibleVersionRoute = (
	languageRoute: string,
	versionId: Scalars['ID']
): string => `/${languageRoute}/bibles/${versionId}`;

export const makeBibleBookRoute = (
	languageRoute: string,
	bookId: Scalars['ID'],
	chapterNumber: Scalars['ID'] = 1
): string =>
	`/${languageRoute}/bibles/${(bookId + '').replace(
		'-',
		'/'
	)}/${chapterNumber}`;

export const makeAudiobookFeedRoute = (
	languageRoute: string,
	bookId: Scalars['ID']
): string => `/${languageRoute}/books/${bookId}/feed.xml`;

export const makeAudiobookListRoute = (
	languageRoute: string,
	page: string | number
): string => `/${languageRoute}/books/page/${page}`;

export const makeStoryAlbumFeedRoute = (
	languageRoute: string,
	storyAlbumId: Scalars['ID']
): string => `/${languageRoute}/stories/albums/${storyAlbumId}/feed.xml`;

export const makeStoryAlbumListPage = (
	languageRoute: string,
	page: string | number
): string => `/${languageRoute}/stories/albums/page/${page}`;

export const makeSongAlbumsListRoute = (
	languageRoute: string,
	page: string | number
): string => `/${languageRoute}/songs/albums/page/${page}`;

export const makeSongAlbumFeedRoute = (
	languageRoute: string,
	albumId: Scalars['ID']
): string => `/${languageRoute}/songs/albums/${albumId}/feed.xml`;

export const makeBibleMusicRoute = (
	languageRoute: string,
	bookName: string
): string => `/${languageRoute}/songs/book/${slug(bookName)}`;

export const makeSponsorMusicRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID']
): string => `/${languageRoute}/songs/sponsor/${sponsorId}`;

export const makeTagMusicRoute = (
	languageRoute: string,
	tagName: string
): string => `/${languageRoute}/songs/tag/${slug(tagName)}`;

export const makeCollectionFeedRoute = (
	languageRoute: string,
	conferenceId: Scalars['ID']
): string => `/${languageRoute}/conferences/${conferenceId}/feed.xml`;

export const makeCollectionSequencesRoute = (
	languageRoute: string,
	conferenceId: Scalars['ID'],
	page = 1
): string =>
	`/${languageRoute}/conferences/${conferenceId}/sequences${
		page ? `/page/${page}` : ''
	}`;

export const makeCollectionPresentersRoute = (
	languageRoute: string,
	conferenceId: Scalars['ID'],
	page: string | number = 1
): string =>
	`/${languageRoute}/conferences/${conferenceId}/presenters/page/${page}`;

export const makeConferenceListRoute = (
	languageRoute: string,
	page: string | number
): string => `/${languageRoute}/conferences/page/${page}`;

export const makeSponsorFeedRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID']
): string => `/${languageRoute}/sponsors/${sponsorId}/feed.xml`;

export const makeSponsorListRoute = (
	languageRoute: string,
	page: string | number
): string => `/${languageRoute}/sponsors/page/${page}`;

export const makeSponsorTeachingsRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: string | number = 1
): string => `/${languageRoute}/sponsors/${sponsorId}/teachings/page/${page}`;

export const makeSponsorBooksRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: string | number = 1
): string => `/${languageRoute}/sponsors/${sponsorId}/books/page/${page}`;

export const makeSponsorAlbumsRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: string | number = 1
): string => `/${languageRoute}/sponsors/${sponsorId}/albums/page/${page}`;

export const makeSponsorConferencesRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: string | number = 1
): string => `/${languageRoute}/sponsors/${sponsorId}/conferences/page/${page}`;

export const makeSponsorSeriesRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: string | number = 1
): string => `/${languageRoute}/sponsors/${sponsorId}/series/page/${page}`;

export const makeTestimoniesRoute = (
	languageRoute: string,
	page: string | number
): string => `/${languageRoute}/testimonies/page/${page}`;

export const makePlaylistDetailRoute = (
	languageRoute: string,
	playlistId: Scalars['ID']
): string => `/${languageRoute}/library/playlist/${playlistId}`;

export const makeBlogPostListRoute = (
	languageRoute: string,
	page: string | number
): string => `/${languageRoute}/blog${page > 1 ? `/page/${page}` : ''}`;

export const makeLoginRoute = (languageRoute: string): string =>
	`/${languageRoute}/account/login`;

export const makeRegisterRoute = (languageRoute: string): string =>
	`/${languageRoute}/account/register`;

export const makeLibraryRoute = (languageRoute: string, subpath = ''): string =>
	`/${languageRoute}/library${subpath ? `/${subpath}` : ''}`;

export const makeDiscoverRoute = (languageRoute: string): string =>
	`/${languageRoute}/discover`;
