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
