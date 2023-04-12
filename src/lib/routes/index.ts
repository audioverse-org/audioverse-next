import { Scalars } from '../generated/graphql';
import about from './about';
import account from './account';
import discover from './discover';
import presenters from './presenters';
import node from './primatives/node';
import paginatedNode from './primatives/paginatedNode';
import releases from './releases';
import search from './search';
import library from './library';
import contact from './contact';
import sponsors from './sponsors';
import conferences from './conferences';
import songs from './songs';
import stories from './stories';
import books from './books';
import bibles from './bibles';
import teachings from './teachings';
import series from './series';

const namespaces = (r: string) => ({
	about: node(`${r}/about`, about),
	account: node(`${r}/account`, account),
	bibles: node(`${r}/bibles`, bibles),
	blog: paginatedNode(`${r}/blog`),
	books: paginatedNode(`${r}/books`, books),
	conferences: paginatedNode(`${r}/conferences`, conferences),
	contact: node(`${r}/contact`, contact),
	discover: node(`${r}/discover`, discover),
	give: node(`${r}/give`),
	library: node(`${r}/library`, library),
	presenters: node(`${r}/presenters`, presenters),
	releases: node(`${r}/releases`, releases),
	search: node(`${r}/search`, search),
	series: paginatedNode(`${r}/series`, series),
	songs: node(`${r}/songs`, songs),
	sponsors: node(`${r}/sponsors`, sponsors),
	stories: node(`${r}/stories`, stories),
	teachings: node(`${r}/teachings`, teachings),
	testimonies: paginatedNode(`${r}/testimonies`),
});

const root = {
	lang: (languageRoute: string) => node(`/${languageRoute}`, namespaces),
};

export default root;

// LEGACY:

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
