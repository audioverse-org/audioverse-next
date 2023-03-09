import { Scalars } from './generated/graphql';

const slug = (s: string): string => s.replace(/\s/g, '-').toLowerCase();

export const makePresenterListRoute = (
	languageRoute: string,
	letter?: string
): string => `/${languageRoute}/presenters${letter ? `/letter/${letter}` : ''}`;

export const makePresenterRecordingsRoute = (
	languageRoute: string,
	personId: Scalars['ID'],
	page: string | number = 1
): string =>
	`/${languageRoute}/presenters/${personId}/teachings${
		page > 1 ? `/page/${page}` : ''
	}`;

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
): string =>
	`/${languageRoute}/presenters/${personId}/sequences${
		page > 1 ? `/page/${page}` : ''
	}`;

export const makePresenterAlsoAppearsInRoute = (
	languageRoute: string,
	personId: Scalars['ID'],
	page: string | number = 1
): string =>
	`/${languageRoute}/presenters/${personId}/appears${
		page > 1 ? `/page/${page}` : ''
	}`;

export const makeSeriesFeedRoute = (
	languageRoute: string,
	seriesId: Scalars['ID']
): string => `/${languageRoute}/series/${seriesId}/feed.xml`;

export const makeSeriesListRoute = (
	languageRoute: string,
	page: string | number = 1
): string => `/${languageRoute}/series${page > 1 ? `/page/${page}` : ''}`;

export const makeSermonListRoute = (
	languageRoute: string,
	filter = 'all',
	page: string | number = 1
): string => `/${languageRoute}/teachings/${filter}/page/${page}`;

export const makeSermonsFeedRoute = (languageRoute: string): string =>
	`/${languageRoute}/teachings/all/feed.xml`;

export const makeTrendingSermonRoute = (
	languageRoute: string,
	filter = 'all'
): string => `/${languageRoute}/teachings/trending/${filter}`;

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
): string => `/${languageRoute}/bibles/${bookId + ''}/${chapterNumber}`;

export const makeAudiobookFeedRoute = (
	languageRoute: string,
	bookId: Scalars['ID']
): string => `/${languageRoute}/books/${bookId}/feed.xml`;

export const makeAudiobookListRoute = (
	languageRoute: string,
	page: string | number = 1
): string => `/${languageRoute}/books${page > 1 ? `/page/${page}` : ''}`;

export const makeStoryAlbumFeedRoute = (
	languageRoute: string,
	storyAlbumId: Scalars['ID']
): string => `/${languageRoute}/stories/albums/${storyAlbumId}/feed.xml`;

export const makeStoryAlbumListPage = (
	languageRoute: string,
	page: string | number = 1
): string =>
	`/${languageRoute}/stories/albums${page > 1 ? `/page/${page}` : ''}`;

export const makeSongAlbumsListRoute = (languageRoute: string): string =>
	`/${languageRoute}/songs/albums`;

export const makeSongAlbumFeedRoute = (
	languageRoute: string,
	albumId: Scalars['ID']
): string => `/${languageRoute}/songs/albums/${albumId}/feed.xml`;

export const makeBibleMusicRoute = (
	languageRoute: string,
	bookName: string
): string => `/${languageRoute}/songs/book/${slug(bookName)}`;

export const makeBibleMusicTrackRoute = (
	languageRoute: string,
	bookName: string,
	trackCanonicalPath: string
): string =>
	`/${languageRoute}/songs/book/${slug(bookName)}/${trackCanonicalPath
		.split('/')
		.slice(3)
		.join('/')}`;

export const makeCollectionFeedRoute = (
	languageRoute: string,
	conferenceId: Scalars['ID']
): string => `/${languageRoute}/conferences/${conferenceId}/feed.xml`;

export const makeCollectionSequencesRoute = (
	languageRoute: string,
	conferenceId: Scalars['ID'],
	page: string | number = 1
): string =>
	`/${languageRoute}/conferences/${conferenceId}/sequences${
		page > 1 ? `/page/${page}` : ''
	}`;

export const makeCollectionPresentersRoute = (
	languageRoute: string,
	conferenceId: Scalars['ID'],
	page: string | number = 1
): string =>
	`/${languageRoute}/conferences/${conferenceId}/presenters${
		page > 1 ? `/page/${page}` : ''
	}`;

export const makeCollectionTeachingsRoute = (
	languageRoute: string,
	conferenceId: Scalars['ID'],
	page: string | number = 1
): string =>
	`/${languageRoute}/conferences/${conferenceId}/teachings${
		page > 1 ? `/page/${page}` : ''
	}`;

export const makeConferenceListRoute = (
	languageRoute: string,
	page: string | number = 1
): string => `/${languageRoute}/conferences${page > 1 ? `/page/${page}` : ''}`;

export const makeSponsorFeedRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID']
): string => `/${languageRoute}/sponsors/${sponsorId}/feed.xml`;

export const makeSponsorListRoute = (
	languageRoute: string,
	letter?: string
): string => `/${languageRoute}/sponsors${letter ? `/letter/${letter}` : ''}`;

export const makeSponsorListAllRoute = (languageRoute: string): string =>
	`/${languageRoute}/sponsors/all`;

export const makeSponsorTeachingsRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: string | number = 1
): string =>
	`/${languageRoute}/sponsors/${sponsorId}/teachings${
		page > 1 ? `/page/${page}` : ''
	}`;

export const makeSponsorConferencesRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: string | number = 1
): string =>
	`/${languageRoute}/sponsors/${sponsorId}/conferences${
		page > 1 ? `/page/${page}` : ''
	}`;

export const makeSponsorSeriesRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: string | number = 1
): string =>
	`/${languageRoute}/sponsors/${sponsorId}/series${
		page > 1 ? `/page/${page}` : ''
	}`;

export const makeTestimoniesRoute = (
	languageRoute: string,
	page: string | number = 1
): string => `/${languageRoute}/testimonies${page > 1 ? `/page/${page}` : ''}`;

export const makeTestimonySubmitRoute = (languageRoute: string): string =>
	`/${languageRoute}/contact/testimonies`;

export const makePlaylistDetailRoute = (
	languageRoute: string,
	playlistId: Scalars['ID']
): string => `/${languageRoute}/library/playlist/${playlistId}`;

export const makeBlogPostListRoute = (
	languageRoute: string,
	page: string | number = 1
): string => `/${languageRoute}/blog${page > 1 ? `/page/${page}` : ''}`;

export const makeAboutPage = (languageRoute: string, pageId: number): string =>
	`/${languageRoute}/about/${pageId}`;

export const makeContactRoute = (
	languageRoute: string,
	subpath = '/general'
): string => `/${languageRoute}/contact${subpath}`;

export const makeLoginRoute = (
	languageRoute: string,
	redirectUrl?: string
): string =>
	`/${languageRoute}/account/login${redirectUrl ? `?back=${redirectUrl}` : ''}`;

export const makeLogoutRoute = (languageRoute: string): string =>
	`/${languageRoute}/account/logout`;

export const makeRegisterRoute = (
	languageRoute: string,
	redirectUrl?: string
): string =>
	`/${languageRoute}/account/register${
		redirectUrl ? `?back=${redirectUrl}` : ''
	}`;

export const makeAccountProfileRoute = (languageRoute: string): string =>
	`/${languageRoute}/account/profile`;

export const makeAccountPreferencesRoute = (languageRoute: string): string =>
	`/${languageRoute}/account/preferences`;

export const makeLibraryRoute = (languageRoute: string, subpath = ''): string =>
	`/${languageRoute}/library${subpath ? `/${subpath}` : ''}`;

export const makeDonateRoute = (languageRoute: string): string =>
	`/${languageRoute}/give`;

export const makeDiscoverRoute = (languageRoute: string): string =>
	`/${languageRoute}/discover`;

export const makeDiscoverCollectionsRoute = (languageRoute: string): string =>
	`/${languageRoute}/discover/collections`;

export const makeSearchRoute = (languageRoute: string, term = ''): string =>
	`/${languageRoute}/search${term ? `?q=${term}` : ''}`;

export const makeSearchCollectionsRoute = (
	languageRoute: string,
	term: string,
	page: string | number = 1
): string => `/${languageRoute}/search/collections/page/${page}?q=${term}`;

export const makeSearchPersonsRoute = (
	languageRoute: string,
	term: string,
	page: string | number = 1
): string => `/${languageRoute}/search/persons/page/${page}?q=${term}`;

export const makeSearchSequencesRoute = (
	languageRoute: string,
	term: string,
	page: string | number = 1
): string => `/${languageRoute}/search/sequences/page/${page}?q=${term}`;

export const makeSearchSponsorsRoute = (
	languageRoute: string,
	term: string,
	page: string | number = 1
): string => `/${languageRoute}/search/sponsors/page/${page}?q=${term}`;

export const makeSearchTeachingsRoute = (
	languageRoute: string,
	term: string,
	page: string | number = 1
): string => `/${languageRoute}/search/teachings/page/${page}?q=${term}`;

export const makeReleaseRoute = (
	languageRoute: string,
	releaseId: Scalars['ID']
): string => `/${languageRoute}/releases/${releaseId}`;

export const isRedirectRouteAllowed = (route: string) => route.startsWith('/');
