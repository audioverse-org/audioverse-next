import { QueryClient } from 'react-query';
import { hydrate } from 'react-query/hydration';

import { storeRequest } from '@lib/api';
import { ENTRIES_PER_PAGE } from '@lib/constants';
import { GetPlaylistPageDataDocument } from '@lib/generated/graphql';
import {
	buildLoader,
	buildServerRenderer,
	mockedFetchApi,
} from '@lib/test/helpers';
import Playlist, {
	getServerSideProps,
} from '@pages/[language]/playlists/[id]/page/[i]';

const renderPage = buildServerRenderer(Playlist, getServerSideProps, {
	language: 'en',
	id: 'the_playlist_id',
	i: '1',
});

const loadData = buildLoader(GetPlaylistPageDataDocument, {
	me: {
		user: {
			playlist: {
				title: 'the_playlist_title',
				recordings: {
					nodes: [
						{
							id: 'the_recording_id',
							title: 'the_recording_title',
							canonicalPath: 'the_recording_path',
						},
					],
					aggregate: {
						count: 1,
					},
				},
			},
		},
	},
});

describe('playlist detail page', () => {
	it('renders', async () => {
		await renderPage();
	});

	it('dehydrates state', async () => {
		loadData();

		const result = await getServerSideProps({
			req: 'the_request',
			query: { language: 'en', id: 'the_playlist_id', i: '1' },
		});

		if (!('props' in result)) {
			throw new Error('Failed to get props');
		}

		const queryClient = new QueryClient();

		hydrate(queryClient, result.props.dehydratedState);

		const data: any = queryClient.getQueryData('getPlaylistPageData');

		expect(data.me.user.playlist.title).toEqual('the_playlist_title');
	});

	it('supports server-side pagination', async () => {
		await getServerSideProps({
			req: 'the_request',
			query: { language: 'en', id: 'the_playlist_id', i: '2' },
		});

		expect(mockedFetchApi).toBeCalledWith(GetPlaylistPageDataDocument, {
			variables: {
				id: 'the_playlist_id',
				offset: ENTRIES_PER_PAGE,
				first: ENTRIES_PER_PAGE,
			},
		});
	});

	it('stores request', async () => {
		await getServerSideProps({
			req: 'the_request',
			query: { language: 'en', id: 'the_playlist_id', i: '1' },
		});

		expect(storeRequest).toBeCalledWith('the_request');
	});

	it('lists recordings', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_recording_title')).toBeInTheDocument();
	});

	it('renders playlist title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_playlist_title')).toBeInTheDocument();
	});

	it('links pagination properly', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toHaveAttribute(
			'href',
			'/en/playlists/the_playlist_id/page/1'
		);
	});

	it('uses count in pagination', async () => {
		loadData({
			me: {
				user: {
					playlist: {
						recordings: {
							aggregate: {
								count: ENTRIES_PER_PAGE * 3,
							},
						},
					},
				},
			},
		});

		const { getByText } = await renderPage();

		expect(getByText('2')).toHaveAttribute(
			'href',
			'/en/playlists/the_playlist_id/page/2'
		);
	});

	it('highlights current pagination link', async () => {
		loadData({
			me: {
				user: {
					playlist: {
						recordings: {
							aggregate: {
								count: ENTRIES_PER_PAGE * 3,
							},
						},
					},
				},
			},
		});

		const { getByTestId } = await renderPage({ params: { i: '2' } });

		expect(getByTestId('active')).toHaveTextContent('2');
	});

	it('calculates page total correctly', async () => {
		loadData({
			me: {
				user: {
					playlist: {
						recordings: {
							aggregate: {
								count: 2,
							},
						},
					},
				},
			},
		});

		const { queryByText } = await renderPage();

		expect(queryByText('2')).not.toBeInTheDocument();
	});

	it('rounds page count properly', async () => {
		loadData({
			me: {
				user: {
					playlist: {
						recordings: {
							aggregate: {
								count: ENTRIES_PER_PAGE + 1,
							},
						},
					},
				},
			},
		});

		const { getByText } = await renderPage();

		expect(getByText('2')).toBeInTheDocument();
	});
});

// throws 404
