import about from './about';
import account from './account';
import bibles from './bibles';
import books from './books';
import conferences from './conferences';
import contact from './contact';
import discover from './discover';
import library from './library';
import presenters from './presenters';
import node from './primatives/node';
import paginatedNode from './primatives/paginatedNode';
import releases from './releases';
import search from './search';
import series from './series';
import songs from './songs';
import sponsors from './sponsors';
import stories from './stories';
import teachings from './teachings';

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

// TODO:
// Make it clearer why this is needed
// Reassess if this is the right place for this function
export const isRedirectRouteAllowed = (route: string) => route.startsWith('/');
