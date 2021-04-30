import { buildLoader, buildServerRenderer } from '@lib/test/helpers';
import Playlists from '@pages/[language]/account/playlists';
import { getServerSideProps } from '@pages/[language]/account/playlists';
import { GetAccountPlaylistsPageDataDocument } from '@lib/generated/graphql';
import _ from 'lodash';

const renderPage = buildServerRenderer(Playlists, getServerSideProps, {
	language: 'en',
});

const defaults = {
	me: {
		user: {
			playlists: {
				nodes: [
					{
						id: 'the_playlist_id',
						title: 'the_playlist_title',
						isPublic: false,
						summary: 'the_playlist_summary',
						recordings: {
							aggregate: {
								count: 2,
							},
						},
					},
				],
			},
		},
	},
};

const loadData = buildLoader(GetAccountPlaylistsPageDataDocument, defaults);

describe('playlists page', () => {
	it('renders', async () => {
		await renderPage();
	});

	it('lists playlists', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_playlist_title')).toBeInTheDocument();
	});

	it('includes number of presentations', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('2')).toBeInTheDocument();
	});

	it('says if it is private', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('private')).toBeInTheDocument();
	});

	it('says if it is public', async () => {
		const testData = _.set(
			defaults,
			'me.user.playlists.nodes[0].isPublic',
			true
		);

		loadData(testData);

		const { getByText } = await renderPage();

		expect(getByText('public')).toBeInTheDocument();
	});

	it('renders summary', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_playlist_summary')).toBeInTheDocument();
	});
});

// uses auth guard
// allows adding a new playlist
// re-fetches playlists after addition
// dehydrates initial data on server side
// include date created or time since creation
