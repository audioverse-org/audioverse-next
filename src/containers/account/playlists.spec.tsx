import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cookies from 'js-cookie';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

import { fetchApi } from '@lib/api/fetchApi';
import {
	AddAccountPlaylistDocument,
	GetAccountPlaylistsPageDataDocument,
} from '@lib/generated/graphql';
import { buildLoader } from '@lib/test/buildLoader';
import { buildRenderer } from '@lib/test/buildRenderer';
import { loadAuthGuardData } from '@lib/test/loadAuthGuardData';
import { describe, it, expect, vi } from 'vitest';

import Playlists from './playlists';

const renderPage = buildRenderer(Playlists);

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
		const testData = set(
			cloneDeep(defaults),
			'me.user.playlists.nodes[0].isPublic',
			true
		);

		loadData(testData);
		loadAuthGuardData();

		const { getAllByText } = await renderPage();

		await waitFor(() => {
			expect(getAllByText('public').length).toBe(2);
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
		Cookies.get = vi.fn().mockReturnValue({});

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
			expect(fetchApi).toBeCalledWith(AddAccountPlaylistDocument, {
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

		vi.mocked(fetchApi).mockClear();

		userEvent.click(getByText('Add Playlist'));

		await waitFor(() => {
			expect(fetchApi).toBeCalledWith(
				AddAccountPlaylistDocument,
				expect.anything()
			);
		});

		await waitFor(() => {
			expect(fetchApi).toBeCalledWith(
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
			expect(fetchApi).toBeCalledWith(AddAccountPlaylistDocument, {
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

		const newData = set(
			cloneDeep(defaults),
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

		expect(fetchApi).not.toBeCalledWith(
			AddAccountPlaylistDocument,
			expect.anything()
		);
	});
});
