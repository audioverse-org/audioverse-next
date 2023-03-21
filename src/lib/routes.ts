import { Scalars } from './generated/graphql';

// TODO: break file apart to improve bundling

// TODO: update to improve dx, maybe something like:
// routes.lang(ENGLISH).presenters.list('B')

const slug = (s: string): string => s.replace(/\s/g, '-').toLowerCase();

const node = <T>(
	r: string,
	extend: (r: string) => T = () => ({} as T)
): {
	get: () => string;
} & T => ({
	get: () => r,
	...extend(r),
});

const paginatedNode = <T>(
	r: string,
	extend: (r: string) => T = () => ({} as T)
): {
	get: () => string;
	page: (page: string | number) => {
		get: () => string;
	};
} & T =>
	node(r, (r) => ({
		page: (page: string | number = 1) => ({
			get: () => `${r}/page/${page}`,
		}),
		...extend(r),
	}));

const presenters = (r: string) => ({
	letter: (letter: string) => node(`${r}/letter/${letter}`),
	all: node(`${r}/all`),
	id: (personId: Scalars['ID']) =>
		node(`${r}/${personId}`, (r) => ({
			teachings: paginatedNode(`${r}/teachings`),
			feed: node(`${r}/feed.xml`),
			top: node(`${r}/top`),
			sequences: paginatedNode(`${r}/sequences`),
			appears: paginatedNode(`${r}/appears`),
		})),
});

const series = (r: string) => ({
	id: (seriesId: Scalars['ID']) => ({
		feed: node(`${r}/${seriesId}/feed.xml`),
	}),
});

const teachings = (r: string) => ({
	filter: (filter = 'all') => paginatedNode(`${r}/${filter}`),
	all: {
		feed: node(`${r}/all/feed.xml`),
	},
	trending: {
		filter: (filter = 'all') => node(`${r}/trending/${filter}`),
	},
});

const bibles = (r: string) => ({
	versionId: (versionId: Scalars['ID']) => node(`${r}/${versionId}`),
	bookId: (bookId: Scalars['ID']) =>
		node(`${r}/${bookId}`, (r) => ({
			chapterNumber: (chapterNumber: Scalars['ID']) =>
				node(`${r}/${chapterNumber}`),
		})),
});

const books = (r: string) => ({
	id: (bookId: Scalars['ID']) =>
		node(`${r}/${bookId}`, (r) => ({
			feed: node(`${r}/feed.xml`),
		})),
});

const root = {
	lang: (languageRoute: string) => {
		const r = `/${languageRoute}`;
		return {
			presenters: node(`${r}/presenters`, presenters),
			series: paginatedNode(`${r}/series`, series),
			teachings: node(`${r}/teachings`, teachings),
			bibles: node(`${r}/bibles`, bibles),
			books: paginatedNode(`${r}/books`, books),
		};
	},
};

export default root;

// LEGACY:

export const makePresenterListRoute = (
	languageRoute: string,
	letter?: string
): string =>
	letter
		? root.lang(languageRoute).presenters.letter(letter).get()
		: root.lang(languageRoute).presenters.get();

export const makePresenterListAllRoute = (languageRoute: string): string =>
	root.lang(languageRoute).presenters.all.get();

export const makePresenterRecordingsRoute = (
	languageRoute: string,
	personId: Scalars['ID'],
	page: string | number = 1
): string =>
	page > 1
		? root
				.lang(languageRoute)
				.presenters.id(personId)
				.teachings.page(page)
				.get()
		: root.lang(languageRoute).presenters.id(personId).teachings.get();

export const makePresenterFeedRoute = (
	languageRoute: string,
	personId: Scalars['ID']
): string => root.lang(languageRoute).presenters.id(personId).feed.get();

export const makePresenterTopRecordingsRoute = (
	languageRoute: string,
	personId: Scalars['ID']
): string => root.lang(languageRoute).presenters.id(personId).top.get();

export const makePresenterSequencesRoute = (
	languageRoute: string,
	personId: Scalars['ID'],
	page: string | number = 1
): string =>
	page > 1
		? root
				.lang(languageRoute)
				.presenters.id(personId)
				.sequences.page(page)
				.get()
		: root.lang(languageRoute).presenters.id(personId).sequences.get();

export const makePresenterAlsoAppearsInRoute = (
	languageRoute: string,
	personId: Scalars['ID'],
	page: string | number = 1
): string =>
	page > 1
		? root.lang(languageRoute).presenters.id(personId).appears.page(page).get()
		: root.lang(languageRoute).presenters.id(personId).appears.get();

export const makeSeriesFeedRoute = (
	languageRoute: string,
	seriesId: Scalars['ID']
): string => root.lang(languageRoute).series.id(seriesId).feed.get();

export const makeSeriesListRoute = (
	languageRoute: string,
	page: string | number = 1
): string =>
	page > 1
		? root.lang(languageRoute).series.page(page).get()
		: root.lang(languageRoute).series.get();

export const makeSermonListRoute = (
	languageRoute: string,
	filter = 'all',
	page: string | number = 1
): string => root.lang(languageRoute).teachings.filter(filter).page(page).get();

export const makeSermonsFeedRoute = (languageRoute: string): string =>
	root.lang(languageRoute).teachings.all.feed.get();

export const makeTrendingSermonRoute = (
	languageRoute: string,
	filter = 'all'
): string => root.lang(languageRoute).teachings.trending.filter(filter).get();

export const makeBibleListRoute = (languageRoute: string): string =>
	root.lang(languageRoute).bibles.get();

export const makeBibleVersionRoute = (
	languageRoute: string,
	versionId: Scalars['ID']
): string => root.lang(languageRoute).bibles.versionId(versionId).get();

export const makeBibleBookRoute = (
	languageRoute: string,
	bookId: Scalars['ID'],
	chapterNumber: Scalars['ID'] = 1
): string =>
	root
		.lang(languageRoute)
		.bibles.bookId(bookId)
		.chapterNumber(chapterNumber)
		.get();

export const makeAudiobookFeedRoute = (
	languageRoute: string,
	bookId: Scalars['ID']
): string => root.lang(languageRoute).books.id(bookId).feed.get();

export const makeAudiobookListRoute = (
	languageRoute: string,
	page: string | number = 1
): string =>
	page > 1
		? root.lang(languageRoute).books.page(page).get()
		: root.lang(languageRoute).books.get();

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
