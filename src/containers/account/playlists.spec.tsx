import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import _ from 'lodash';
import { hydrate, QueryClient } from 'react-query';

import { storeRequest } from '@lib/api';
import {
	AddAccountPlaylistDocument,
	GetAccountPlaylistsPageDataDocument,
} from '@lib/generated/graphql';
import {
	buildLoader,
	buildServerRenderer,
	loadAuthGuardData,
	mockedFetchApi,
} from '@lib/test/helpers';
import Playlists from '@pages/[language]/account/playlists';
import { getServerSideProps } from '@pages/[language]/account/playlists';

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
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('lists playlists', async () => {
		loadData();
		loadAuthGuardData();

		const { getByText } = await renderPage();

		await waitFor(() => {
			expect(getByText('the_playlist_title')).toBeInTheDocument();
		});
	});

	it('includes number of presentations', async () => {
		loadData();
		loadAuthGuardData();

		const { getByText } = await renderPage();

		await waitFor(() => {
			expect(getByText('2')).toBeInTheDocument();
		});
	});

	it('says if it is private', async () => {
		loadData();
		loadAuthGuardData();

		const { getByText } = await renderPage();

		await waitFor(() => {
			expect(getByText('private')).toBeInTheDocument();
		});
	});

	it('says if it is public', async () => {
		const testData = _.set(
			_.cloneDeep(defaults),
			'me.user.playlists.nodes[0].isPublic',
			true
		);

		loadData(testData);
		loadAuthGuardData();

		const { getByText } = await renderPage();

		await waitFor(() => {
			expect(getByText('public')).toBeInTheDocument();
		});
	});

	it('renders summary', async () => {
		loadAuthGuardData();
		loadData();

		const { getByText } = await renderPage();

		await waitFor(() => {
			expect(getByText('the_playlist_summary')).toBeInTheDocument();
		});
	});

	it('prompts for login if user not logged in', async () => {
		const { getByPlaceholderText } = await renderPage();

		await waitFor(() => {
			expect(getByPlaceholderText('jane@example.com'));
		});
	});

	it('adds playlist', async () => {
		loadAuthGuardData();
		loadData();

		const { getByText, getByLabelText } = await renderPage();

		await waitFor(() => {
			expect(getByText('Add Playlist')).toBeInTheDocument();
		});

		userEvent.type(getByLabelText('title'), 'the_title');
		userEvent.type(getByLabelText('summary'), 'the_summary');

		userEvent.click(getByText('Add Playlist'));

		await waitFor(() => {
			expect(mockedFetchApi).toBeCalledWith(AddAccountPlaylistDocument, {
				variables: {
					isPublic: false,
					language: 'ENGLISH',
					recordingIds: [],
					summary: 'the_summary',
					title: 'the_title',
				},
			});
		});
	});

	it('reloads playlists on add', async () => {
		loadAuthGuardData();
		loadData();

		const { getByText, getByLabelText } = await renderPage();

		await waitFor(() => {
			expect(getByText('Add Playlist')).toBeInTheDocument();
		});

		userEvent.type(getByLabelText('title'), 'the_title');
		userEvent.type(getByLabelText('summary'), 'the_summary');

		userEvent.click(getByText('Add Playlist'));

		await waitFor(() => {
			expect(mockedFetchApi).toBeCalledWith(
				GetAccountPlaylistsPageDataDocument,
				expect.anything()
			);
		});
	});

	it('allows creating public playlists', async () => {
		loadAuthGuardData();
		loadData();

		const { getByText, getByLabelText } = await renderPage();

		await waitFor(() => {
			expect(getByText('Add Playlist')).toBeInTheDocument();
		});

		userEvent.type(getByLabelText('title'), 'the_title');
		userEvent.type(getByLabelText('summary'), 'the_summary');
		userEvent.click(getByLabelText('public'));

		userEvent.click(getByText('Add Playlist'));

		await waitFor(() => {
			expect(mockedFetchApi).toBeCalledWith(AddAccountPlaylistDocument, {
				variables: {
					isPublic: true,
					language: 'ENGLISH',
					recordingIds: [],
					summary: 'the_summary',
					title: 'the_title',
				},
			});
		});
	});

	it('re-fetches data on playlist add', async () => {
		loadAuthGuardData();
		loadData();

		const { getByText, getByLabelText } = await renderPage();

		await waitFor(() => {
			expect(getByText('Add Playlist')).toBeInTheDocument();
		});

		userEvent.type(getByLabelText('title'), 'the_title');

		userEvent.click(getByText('Add Playlist'));

		const newData = _.set(
			_.cloneDeep(defaults),
			'me.user.playlists.nodes[0].title',
			'new_playlist_title'
		);

		loadData(newData);

		await waitFor(() => {
			expect(getByText('new_playlist_title')).toBeInTheDocument();
		});
	});

	it('displays missing title error', async () => {
		loadAuthGuardData();
		loadData();

		const { getByText } = await renderPage();

		await waitFor(() => {
			expect(getByText('Add Playlist')).toBeInTheDocument();
		});

		userEvent.click(getByText('Add Playlist'));

		await waitFor(() => {
			expect(getByText('missing title')).toBeInTheDocument();
		});
	});

	it('does not submit new playlist without title', async () => {
		loadAuthGuardData();
		loadData();

		const { getByText } = await renderPage();

		await waitFor(() => {
			expect(getByText('Add Playlist')).toBeInTheDocument();
		});

		userEvent.click(getByText('Add Playlist'));

		await waitFor(() => {
			expect(getByText('missing title')).toBeInTheDocument();
		});

		expect(mockedFetchApi).not.toBeCalledWith(
			AddAccountPlaylistDocument,
			expect.anything()
		);
	});

	it('dehydrates state', async () => {
		loadData();

		const result = await getServerSideProps({
			req: {} as any,
			res: {} as any,
			resolvedUrl: '',
			query: { language: 'en' },
		});

		if (!('props' in result)) {
			throw new Error('Failed to get props');
		}

		const queryClient = new QueryClient();

		hydrate(queryClient, result.props.dehydratedState);

		const data: any = queryClient.getQueryData('getAccountPlaylistsPageData');

		expect(data.me.user.playlists.nodes[0].title).toEqual('the_playlist_title');
	});

	it('stores request', async () => {
		await getServerSideProps({
			req: 'the_request',
			query: { language: 'en' },
		} as any);

		expect(storeRequest).toBeCalledWith('the_request');
	});
});

// stores request

// TODO: punt: include date created or time since creation
