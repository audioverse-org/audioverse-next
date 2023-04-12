import { Scalars } from './generated/graphql';
import node from './routes/node';
import paginatedNode from './routes/paginatedNode';
import slug from './routes/slug';

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

const stories = (r: string) => ({
	albums: paginatedNode(`${r}/albums`, (r) => ({
		id: (albumId: Scalars['ID']) => ({
			feed: node(`${r}/${albumId}/feed.xml`),
		}),
	})),
});

const songs = (r: string) => ({
	albums: node(`${r}/albums`, (r) => ({
		id: (albumId: Scalars['ID']) => ({
			feed: node(`${r}/${albumId}/feed.xml`),
		}),
	})),
	book: (bookName: string) =>
		node(`${r}/book/${slug(bookName)}`, (r) => ({
			track: (canonicalPath: string) =>
				node(`${r}/${canonicalPath.split('/').slice(3).join('/')}`),
		})),
});

const conferences = (r: string) => ({
	id: (conferenceId: Scalars['ID']) =>
		node(`${r}/${conferenceId}`, (r) => ({
			feed: node(`${r}/feed.xml`),
			sequences: paginatedNode(`${r}/sequences`),
			presenters: paginatedNode(`${r}/presenters`),
			teachings: paginatedNode(`${r}/teachings`),
		})),
});

const sponsors = (r: string) => ({
	id: (sponsorId: Scalars['ID']) =>
		node(`${r}/${sponsorId}`, (r) => ({
			feed: node(`${r}/feed.xml`),
			teachings: paginatedNode(`${r}/teachings`),
			conferences: paginatedNode(`${r}/conferences`),
			series: paginatedNode(`${r}/series`),
		})),
	letter: (letter: string) => node(`${r}/letter/${letter}`),
	all: node(`${r}/all`),
});

const contact = (r: string) => ({
	testimonies: node(`${r}/testimonies`),
	subpath: (subpath: string) => node(`${r}${subpath}`),
});

const library = (r: string) => ({
	playlist: (playlistId: Scalars['ID']) => node(`${r}/playlist/${playlistId}`),
	subpath: (subpath: string) => node(`${r}${subpath}`),
});

const about = (r: string) => ({
	id: (pageId: number) => node(`${r}/${pageId}`),
});

const account = (r: string) => ({
	login: node(`${r}/login`),
	logout: node(`${r}/logout`),
	register: node(`${r}/register`),
	profile: node(`${r}/profile`),
	preferences: node(`${r}/preferences`),
});

const discover = (r: string) => ({
	collections: node(`${r}/collections`),
});

const search = (r: string) => ({
	collections: paginatedNode(`${r}/collections`),
	persons: paginatedNode(`${r}/persons`),
	sequences: paginatedNode(`${r}/sequences`),
	sponsors: paginatedNode(`${r}/sponsors`),
	teachings: paginatedNode(`${r}/teachings`),
});

const releases = (r: string) => ({
	id: (releaseId: Scalars['ID']) => node(`${r}/${releaseId}`),
});

const root = {
	lang: (languageRoute: string) =>
		node(`/${languageRoute}`, (r) => ({
			presenters: node(`${r}/presenters`, presenters),
			series: paginatedNode(`${r}/series`, series),
			teachings: node(`${r}/teachings`, teachings),
			bibles: node(`${r}/bibles`, bibles),
			books: paginatedNode(`${r}/books`, books),
			stories: node(`${r}/stories`, stories),
			songs: node(`${r}/songs`, songs),
			conferences: paginatedNode(`${r}/conferences`, conferences),
			sponsors: node(`${r}/sponsors`, sponsors),
			testimonies: paginatedNode(`${r}/testimonies`),
			contact: node(`${r}/contact`, contact),
			library: node(`${r}/library`, library),
			blog: paginatedNode(`${r}/blog`),
			about: node(`${r}/about`, about),
			account: node(`${r}/account`, account),
			give: node(`${r}/give`),
			discover: node(`${r}/discover`, discover),
			search: node(`${r}/search`, search),
			releases: node(`${r}/releases`, releases),
		})),
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
	root.lang(languageRoute).presenters.id(personId).teachings.page(page).get();

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
	root.lang(languageRoute).presenters.id(personId).sequences.page(page).get();

export const makePresenterAlsoAppearsInRoute = (
	languageRoute: string,
	personId: Scalars['ID'],
	page: string | number = 1
): string =>
	root.lang(languageRoute).presenters.id(personId).appears.page(page).get();

export const makeSeriesFeedRoute = (
	languageRoute: string,
	seriesId: Scalars['ID']
): string => root.lang(languageRoute).series.id(seriesId).feed.get();

export const makeSeriesListRoute = (
	languageRoute: string,
	page: string | number = 1
): string => root.lang(languageRoute).series.page(page).get();

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
): string => root.lang(languageRoute).books.page(page).get();

export const makeStoryAlbumFeedRoute = (
	languageRoute: string,
	storyAlbumId: Scalars['ID']
): string =>
	root.lang(languageRoute).stories.albums.id(storyAlbumId).feed.get();

export const makeStoryAlbumListPage = (
	languageRoute: string,
	page: string | number = 1
): string => root.lang(languageRoute).stories.albums.page(page).get();

export const makeSongAlbumsListRoute = (languageRoute: string): string =>
	root.lang(languageRoute).songs.albums.get();

export const makeSongAlbumFeedRoute = (
	languageRoute: string,
	albumId: Scalars['ID']
): string => root.lang(languageRoute).songs.albums.id(albumId).feed.get();

export const makeBibleMusicRoute = (
	languageRoute: string,
	bookName: string
): string => root.lang(languageRoute).songs.book(bookName).get();

export const makeBibleMusicTrackRoute = (
	languageRoute: string,
	bookName: string,
	trackCanonicalPath: string
): string =>
	root.lang(languageRoute).songs.book(bookName).track(trackCanonicalPath).get();

export const makeCollectionFeedRoute = (
	languageRoute: string,
	conferenceId: Scalars['ID']
): string => root.lang(languageRoute).conferences.id(conferenceId).feed.get();

export const makeCollectionSequencesRoute = (
	languageRoute: string,
	conferenceId: Scalars['ID'],
	page: string | number = 1
): string =>
	root
		.lang(languageRoute)
		.conferences.id(conferenceId)
		.sequences.page(page)
		.get();

export const makeCollectionPresentersRoute = (
	languageRoute: string,
	conferenceId: Scalars['ID'],
	page: string | number = 1
): string =>
	root
		.lang(languageRoute)
		.conferences.id(conferenceId)
		.presenters.page(page)
		.get();

export const makeCollectionTeachingsRoute = (
	languageRoute: string,
	conferenceId: Scalars['ID'],
	page: string | number = 1
): string =>
	root
		.lang(languageRoute)
		.conferences.id(conferenceId)
		.teachings.page(page)
		.get();

export const makeConferenceListRoute = (
	languageRoute: string,
	page: string | number = 1
): string => root.lang(languageRoute).conferences.page(page).get();

export const makeSponsorFeedRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID']
): string => root.lang(languageRoute).sponsors.id(sponsorId).feed.get();

export const makeSponsorListRoute = (
	languageRoute: string,
	letter?: string
): string =>
	letter
		? root.lang(languageRoute).sponsors.letter(letter).get()
		: root.lang(languageRoute).sponsors.get();

export const makeSponsorListAllRoute = (languageRoute: string): string =>
	root.lang(languageRoute).sponsors.all.get();

export const makeSponsorTeachingsRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: string | number = 1
): string =>
	root.lang(languageRoute).sponsors.id(sponsorId).teachings.page(page).get();

export const makeSponsorConferencesRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: string | number = 1
): string =>
	root.lang(languageRoute).sponsors.id(sponsorId).conferences.page(page).get();

export const makeSponsorSeriesRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: string | number = 1
): string =>
	root.lang(languageRoute).sponsors.id(sponsorId).series.page(page).get();

export const makeTestimoniesRoute = (
	languageRoute: string,
	page: string | number = 1
): string => root.lang(languageRoute).testimonies.page(page).get();

export const makeTestimonySubmitRoute = (languageRoute: string): string =>
	root.lang(languageRoute).testimonies.get();

export const makePlaylistDetailRoute = (
	languageRoute: string,
	playlistId: Scalars['ID']
): string => root.lang(languageRoute).library.playlist(playlistId).get();

export const makeBlogPostListRoute = (
	languageRoute: string,
	page: string | number = 1
): string => root.lang(languageRoute).blog.page(page).get();

export const makeAboutPage = (languageRoute: string, pageId: number): string =>
	root.lang(languageRoute).about.id(pageId).get();

export const makeContactRoute = (
	languageRoute: string,
	subpath = '/general'
): string => root.lang(languageRoute).contact.subpath(subpath).get();

export const makeLoginRoute = (
	languageRoute: string,
	redirectUrl = ''
): string =>
	root.lang(languageRoute).account.login.get({
		params: {
			back: redirectUrl,
		},
	});

export const makeLogoutRoute = (languageRoute: string): string =>
	root.lang(languageRoute).account.logout.get();

export const makeRegisterRoute = (
	languageRoute: string,
	redirectUrl = ''
): string =>
	root.lang(languageRoute).account.register.get({
		params: {
			back: redirectUrl,
		},
	});

export const makeAccountProfileRoute = (languageRoute: string): string =>
	root.lang(languageRoute).account.profile.get();

export const makeAccountPreferencesRoute = (languageRoute: string): string =>
	root.lang(languageRoute).account.preferences.get();

export const makeLibraryRoute = (languageRoute: string, subpath = ''): string =>
	root.lang(languageRoute).library.subpath(subpath).get();

export const makeDonateRoute = (languageRoute: string): string =>
	root.lang(languageRoute).give.get();

export const makeDiscoverRoute = (languageRoute: string): string =>
	root.lang(languageRoute).discover.get();

export const makeDiscoverCollectionsRoute = (languageRoute: string): string =>
	root.lang(languageRoute).discover.collections.get();

export const makeSearchRoute = (languageRoute: string, term = ''): string =>
	root.lang(languageRoute).search.get({
		params: {
			q: term,
		},
	});

export const makeSearchCollectionsRoute = (
	languageRoute: string,
	term: string,
	page: string | number = 1
): string =>
	root
		.lang(languageRoute)
		.search.collections.page(page)
		.get({
			params: {
				q: term,
			},
		});

export const makeSearchPersonsRoute = (
	languageRoute: string,
	term: string,
	page: string | number = 1
): string =>
	root
		.lang(languageRoute)
		.search.persons.page(page)
		.get({
			params: {
				q: term,
			},
		});

export const makeSearchSequencesRoute = (
	languageRoute: string,
	term: string,
	page: string | number = 1
): string =>
	root
		.lang(languageRoute)
		.search.sequences.page(page)
		.get({
			params: {
				q: term,
			},
		});

export const makeSearchSponsorsRoute = (
	languageRoute: string,
	term: string,
	page: string | number = 1
): string =>
	root
		.lang(languageRoute)
		.search.sponsors.page(page)
		.get({
			params: {
				q: term,
			},
		});

export const makeSearchTeachingsRoute = (
	languageRoute: string,
	term: string,
	page: string | number = 1
): string =>
	root
		.lang(languageRoute)
		.search.teachings.page(page)
		.get({
			params: {
				q: term,
			},
		});

export const makeReleaseRoute = (
	languageRoute: string,
	releaseId: Scalars['ID']
): string => root.lang(languageRoute).releases.id(releaseId).get();

export const isRedirectRouteAllowed = (route: string) => route.startsWith('/');
