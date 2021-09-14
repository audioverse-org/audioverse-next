import { Scalars } from './generated/graphql';

const slug = (s: string): string => s.replace(/\s/g, '-').toLowerCase();

export const makePaginationRoute = (
	base: string,
	page: Scalars['ID']
): string => `${base}/page/${page}`;

export const makeSermonRoute = (
	languageRoute: string,
	sermonId: Scalars['ID']
): string => `/${languageRoute}/teachings/${sermonId}`;

export const makeAudiobookTrackRoute = (
	languageRoute: string,
	recordingId: Scalars['ID']
): string => `/${languageRoute}/books/tracks/${recordingId}`;

export const makePresenterListRoute = (
	languageRoute: string,
	page: Scalars['ID']
): string => `/${languageRoute}/presenters/page/${page}`;

export const makePresenterRecordingsRoute = (
	languageRoute: string,
	personId: Scalars['ID'],
	page: Scalars['ID'] = 1
): string => `/${languageRoute}/presenters/${personId}/page/${page}`;

export const makePresenterTopRecordingsRoute = (
	languageRoute: string,
	personId: Scalars['ID']
): string => `/${languageRoute}/presenters/${personId}/top`;

export const makePresenterSequencesRoute = (
	languageRoute: string,
	personId: Scalars['ID'],
	page: Scalars['ID'] = 1
): string => `/${languageRoute}/presenters/${personId}/sequences/page/${page}`;

export const makePresenterAlsoAppearsInRoute = (
	languageRoute: string,
	personId: Scalars['ID'],
	page: Scalars['ID'] = 1
): string => `/${languageRoute}/presenters/${personId}/appears/page/${page}`;

export const makeSeriesDetailRoute = (
	languageRoute: string,
	seriesId: Scalars['ID'],
	page: Scalars['ID'] = 1
): string => `/${languageRoute}/series/${seriesId}/page/${page}`;

export const makeSeriesListRoute = (
	languageRoute: string,
	page: Scalars['ID'] = 1
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
	filter: string,
	page: Scalars['ID']
): string => `/${languageRoute}/teachings/${filter}/page/${page}`;

// TODO: use makeSermonListRoute
// TODO: default page to 1
export const makeSermonListRouteAll = (
	languageRoute: string,
	page: Scalars['ID']
): string => `/${languageRoute}/teachings/all/page/${page}`;

// TODO: use makeSermonListRoute
// TODO: default page to 1
export const makeSermonListRouteVideo = (
	languageRoute: string,
	page: Scalars['ID']
): string => `/${languageRoute}/teachings/video/page/${page}`;

// TODO: use makeSermonListRoute
// TODO: default page to 1
export const makeSermonListRouteAudio = (
	languageRoute: string,
	page: Scalars['ID']
): string => `/${languageRoute}/teachings/audio/page/${page}`;

export const makeBibleListRoute = (languageRoute: string): string =>
	`/${languageRoute}/bibles`;

export const makeBibleVersionRoute = (
	languageRoute: string,
	versionId: Scalars['ID']
): string => `/${languageRoute}/bibles/${versionId}`;

export const makeBibleBookRoute = (
	languageRoute: string,
	bookId: Scalars['ID']
): string => `/${languageRoute}/bibles/${(bookId + '').replace('-', '/')}`;

// TODO: rename to makeAudiobookDetailRoute
export const makeAudiobookRoute = (
	languageRoute: string,
	bookId: Scalars['ID']
): string => `/${languageRoute}/books/${bookId}`;

export const makeAudiobookListRoute = (
	languageRoute: string,
	page: Scalars['ID']
): string => `/${languageRoute}/books/page/${page}`;

export const makeStoryRoute = (
	languageRoute: string,
	storyId: Scalars['ID']
): string => `/${languageRoute}/stories/${storyId}`;

export const makeStoryAlbumRoute = (
	languageRoute: string,
	storyAlbumId: Scalars['ID']
): string => `/${languageRoute}/stories/albums/${storyAlbumId}`;

export const makeStoryAlbumListPage = (
	languageRoute: string,
	page: Scalars['ID']
): string => `/${languageRoute}/stories/albums/page/${page}`;

export const makeSongAlbumsListRoute = (
	languageRoute: string,
	page: Scalars['ID']
): string => `/${languageRoute}/songs/albums/page/${page}`;

export const makeSongAlbumDetailRoute = (
	languageRoute: string,
	albumId: Scalars['ID']
): string => `/${languageRoute}/songs/albums/${albumId}`;

export const makeAlbumTrackRoute = (
	languageRoute: string,
	trackId: Scalars['ID']
): string => `/${languageRoute}/songs/tracks/${trackId}`;

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

export const makeCollectionRoute = (
	languageRoute: string,
	conferenceId: Scalars['ID']
): string => `/${languageRoute}/conferences/${conferenceId}`;

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
	page: Scalars['ID'] = 1
): string =>
	`/${languageRoute}/conferences/${conferenceId}/presenters/page/${page}`;

export const makeConferenceListRoute = (
	languageRoute: string,
	page: Scalars['ID']
): string => `/${languageRoute}/conferences/page/${page}`;

// TODO: rename makeSponsorDetailRoute
export const makeSponsorRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID']
): string => `/${languageRoute}/sponsors/${sponsorId}`;

export const makeSponsorListRoute = (
	languageRoute: string,
	page: Scalars['ID']
): string => `/${languageRoute}/sponsors/page/${page}`;

export const makeSponsorTeachingsRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: Scalars['ID'] = 1
): string => `/${languageRoute}/sponsors/${sponsorId}/teachings/page/${page}`;

export const makeSponsorBooksRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: Scalars['ID'] = 1
): string => `/${languageRoute}/sponsors/${sponsorId}/books/page/${page}`;

export const makeSponsorAlbumsRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: Scalars['ID'] = 1
): string => `/${languageRoute}/sponsors/${sponsorId}/albums/page/${page}`;

export const makeSponsorConferencesRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: Scalars['ID'] = 1
): string => `/${languageRoute}/sponsors/${sponsorId}/conferences/page/${page}`;

export const makeSponsorSeriesRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: Scalars['ID'] = 1
): string => `/${languageRoute}/sponsors/${sponsorId}/series/page/${page}`;

export const makeTestimoniesRoute = (
	languageRoute: string,
	page: Scalars['ID']
): string => `/${languageRoute}/testimonies/page/${page}`;

export const makePlaylistListRoute = (
	languageRoute: string,
	page: Scalars['ID']
): string => `/${languageRoute}/playlists/page/${page}`;

export const makePlaylistDetailRoute = (
	languageRoute: string,
	playlistId: Scalars['ID'],
	page: Scalars['ID'] = 1
): string => `/${languageRoute}/playlists/${playlistId}/page/${page}`;

export const makeBlogPostRoute = (
	languageRoute: string,
	blogPostId: Scalars['ID']
): string => `/${languageRoute}/blog/${blogPostId}`;

export const makeBlogPostListRoute = (
	languageRoute: string,
	page: Scalars['ID']
): string => `/${languageRoute}/blog${page > 1 ? `/page/${page}` : ''}`;
