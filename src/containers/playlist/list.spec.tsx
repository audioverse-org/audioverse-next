import { QueryClient } from 'react-query';
import { hydrate } from 'react-query/hydration';

import { storeRequest } from '@lib/api';
import { ENTRIES_PER_PAGE } from '@lib/constants';
import { GetPlaylistsPageDataDocument } from '@lib/generated/graphql';
import {
	buildLoader,
	buildServerRenderer,
	mockedFetchApi,
} from '@lib/test/helpers';
import Playlists, {
	getServerSideProps,
} from '@pages/[language]/playlists/page/[i]';

const renderPage = buildServerRenderer(Playlists, getServerSideProps, {
	language: 'en',
	i: '1',
});

const loadData = buildLoader(GetPlaylistsPageDataDocument, {
	me: {
		user: {
			playlists: {
				nodes: [
					{
						id: 'the_playlist_id',
						title: 'the_playlist_title',
					},
				],
				aggregate: {
					count: 1,
				},
			},
		},
	},
});

describe('playlists list page', () => {
	it('renders', async () => {
		await renderPage();
	});

	it('dehydrates state', async () => {
		loadData();

		const result = await getServerSideProps({
			query: { language: 'en', i: '1' },
		} as any);

		if (!('props' in result)) {
			throw new Error('Failed to get props');
		}

		const queryClient = new QueryClient();

		hydrate(queryClient, result.props.dehydratedState);

		const data: any = queryClient.getQueryData('getPlaylistsPageData');

		expect(data.me.user.playlists.aggregate.count).toEqual(1);
	});

	it('stores request', async () => {
		await getServerSideProps({
			req: 'the_request',
			query: { language: 'en', i: '1' },
		} as any);

		expect(storeRequest).toBeCalledWith('the_request');
	});

	it('lists playlists', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_playlist_title')).toBeInTheDocument();
	});

	it('links pagination', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toHaveAttribute('href', '/en/playlists/page/1');
	});

	it('calculates total', async () => {
		loadData({
			me: {
				user: { playlists: { aggregate: { count: ENTRIES_PER_PAGE * 2 } } },
			},
		});

		const { getByText } = await renderPage();

		expect(getByText('2')).toBeInTheDocument();
	});

	it('marks active pagination link', async () => {
		loadData({
			me: {
				user: { playlists: { aggregate: { count: ENTRIES_PER_PAGE * 2 } } },
			},
		});

		const { getByTestId } = await renderPage({ i: '2' });

		expect(getByTestId('active')).toHaveTextContent('2');
	});

	it('renders page title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('Playlists')).toBeInTheDocument();
	});

	it('links playlist entries', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_playlist_title')).toHaveAttribute(
			'href',
			'/en/playlists/the_playlist_id/page/1'
		);
	});

	it('queries data with language and index', async () => {
		await getServerSideProps({
			req: 'the_request',
			query: { language: 'en', i: '1' },
		} as any);

		expect(mockedFetchApi).toBeCalledWith(GetPlaylistsPageDataDocument, {
			variables: {
				language: 'ENGLISH',
				offset: 0,
				first: ENTRIES_PER_PAGE,
			},
		});
	});
});
