import {
	getByText,
	queryByLabelText,
	queryByPlaceholderText,
	queryByText,
	waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import PlaylistButton from '@components/molecules/playlistButton';
import * as api from '@lib/api';
import { addPlaylist } from '@lib/api/addPlaylist';
import { getPlaylists } from '@lib/api/getPlaylists';
import { setPlaylistMembership } from '@lib/api/setPlaylistMembership';
import {
	renderWithQueryProvider,
	resolveWithDelay,
	sleep,
} from '@lib/test/helpers';

jest.mock('@lib/api/getMe');
jest.mock('@lib/api/setPlaylistMembership');
jest.mock('@lib/api/getPlaylists');
jest.mock('@lib/api/addPlaylist');

const renderComponent = async ({
	recordingId = 'recording_id',
}: {
	recordingId?: string;
} = {}) => {
	const result = await renderWithQueryProvider(
		<PlaylistButton recordingId={recordingId} />
	);

	const getEntry = (playlistTitle: string) =>
		getByText(result.container, playlistTitle);

	const getNewPlaylistInput = () =>
		queryByPlaceholderText(
			result.container,
			'New Playlist'
		) as HTMLInputElement;

	const getSubmitButton = () =>
		queryByText(result.container, 'Create') as HTMLButtonElement;

	return {
		...result,
		getButton: () => getByText(result.container, 'Add to Playlist'),
		waitForPlaylists: (count = 1) =>
			waitFor(() => expect(getPlaylists).toHaveBeenCalledTimes(count)),
		getEntry,
		getCheckbox: (playlistTitle: string): HTMLInputElement =>
			queryByLabelText(result.container, playlistTitle) as HTMLInputElement,
		getNewPlaylistInput,
		getSubmitButton,
		userAddPlaylist: async (playlistTitle: string) => {
			await userEvent.type(getNewPlaylistInput(), playlistTitle);

			userEvent.click(getSubmitButton());
		},
	};
};

describe('playlist button', () => {
	beforeEach(() => jest.resetAllMocks());

	it('shows error if user not logged in', async () => {
		const { getByText, getButton } = await renderComponent();

		userEvent.click(getButton());

		expect(
			getByText('You must be logged in to perform this action')
		).toBeInTheDocument();
	});

	it('does not show error if user logged in', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([
			{
				id: 'playlist_id',
				title: 'playlist_title',
			},
		]);

		const {
			queryByText,
			getButton,
			waitForPlaylists,
		} = await renderComponent();

		await waitForPlaylists();

		userEvent.click(getButton());

		expect(
			queryByText('You must be logged in to perform this action')
		).toBeNull();
	});

	it('shows user playlists', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([
			{
				id: 'playlist_id',
				title: 'playlist_title',
			},
		]);

		const {
			getCheckbox,
			getButton,
			waitForPlaylists,
		} = await renderComponent();

		await waitForPlaylists();

		userEvent.click(getButton());

		await waitFor(() =>
			expect(getCheckbox('playlist_title')).toBeInTheDocument()
		);
	});

	it('adds recording to playlist', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([
			{
				id: 'playlist_id',
				title: 'playlist_title',
			},
		]);

		const { getEntry, getButton, waitForPlaylists } = await renderComponent();

		await waitForPlaylists();

		userEvent.click(getButton());

		const entry = getEntry('playlist_title');

		userEvent.click(entry);

		await waitFor(() =>
			expect(setPlaylistMembership).toBeCalledWith(
				'recording_id',
				'playlist_id',
				true
			)
		);
	});

	it('toggles checkbox', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([
			{
				id: 'playlist_id',
				title: 'playlist_title',
			},
		]);

		const {
			getEntry,
			getCheckbox,
			getButton,
			waitForPlaylists,
		} = await renderComponent();

		await waitForPlaylists();

		userEvent.click(getButton());

		const entry = getEntry('playlist_title');

		userEvent.click(entry);

		const checkbox = getCheckbox('playlist_title');

		expect(checkbox?.checked).toBeTruthy();
	});

	it('toggles back and forth', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([
			{
				id: 'playlist_id',
				title: 'playlist_title',
			},
		]);

		const {
			getEntry,
			getCheckbox,
			getButton,
			waitForPlaylists,
		} = await renderComponent();

		await waitForPlaylists();

		userEvent.click(getButton());

		const entry = getEntry('playlist_title');

		userEvent.click(entry);
		userEvent.click(entry);

		const checkbox = getCheckbox('playlist_title');

		expect(checkbox?.checked).toBeFalsy();
	});

	it('removes item from playlist', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([
			{
				id: 'playlist_id',
				title: 'playlist_title',
			},
		]);

		const { getEntry, getButton, waitForPlaylists } = await renderComponent();

		await waitForPlaylists();

		userEvent.click(getButton());

		const entry = getEntry('playlist_title');

		userEvent.click(entry);
		userEvent.click(entry);

		await waitFor(() => {
			expect(setPlaylistMembership).toBeCalledWith(
				'recording_id',
				'playlist_id',
				false
			);
		});
	});

	it('uses playlists', async () => {
		await renderComponent({ recordingId: 'recording_id' });

		expect(getPlaylists).toBeCalled();
	});

	it('busts playlist cache', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([
			{
				id: 'playlist_id',
				title: 'playlist_title',
			},
		]);

		const { getEntry, getButton, waitForPlaylists } = await renderComponent();

		await waitForPlaylists();

		userEvent.click(getButton());

		const entry = getEntry('playlist_title');

		userEvent.click(entry);

		await waitFor(() => {
			const callCount = (getPlaylists as jest.Mock).mock.calls.length;
			expect(callCount > 1).toBeTruthy();
		});
	});

	it('gets playlists using recording id', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([]);

		await renderComponent({
			recordingId: 'recording_id',
		});

		await waitFor(() =>
			expect(getPlaylists).toBeCalledWith('ENGLISH', {
				recordingId: 'recording_id',
			})
		);
	});

	it('loads checkbox state from api response', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([
			{
				id: 'playlist_id',
				title: 'playlist_title',
				hasRecording: true,
			},
		]);

		const { waitForPlaylists, getCheckbox } = await renderComponent();

		await waitForPlaylists();

		expect(getCheckbox('playlist_title')?.checked).toBeTruthy();
	});

	it('does not set membership without user action', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([]);

		const { waitForPlaylists } = await renderComponent();

		await waitForPlaylists();

		expect(setPlaylistMembership).not.toBeCalled();
	});

	it('creates playlist', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([]);
		jest.spyOn(api, 'addPlaylist').mockResolvedValue('playlist_id');

		const { userAddPlaylist, waitForPlaylists } = await renderComponent();

		await waitForPlaylists();

		await userAddPlaylist('the_title');

		await waitFor(() =>
			expect(addPlaylist).toBeCalledWith('ENGLISH', 'the_title', {
				recordingIds: ['recording_id'],
				isPublic: false,
			})
		);
	});

	it('busts playlist cache on playlist create', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([]);
		jest.spyOn(api, 'addPlaylist').mockResolvedValue('playlist_id');

		const { userAddPlaylist, waitForPlaylists } = await renderComponent();

		await waitForPlaylists();

		await userAddPlaylist('the_title');

		await waitFor(() => {
			const callCount = (getPlaylists as jest.Mock).mock.calls.length;
			expect(callCount > 1).toBeTruthy();
		});
	});

	it('resets new playlist input on create', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([]);
		jest.spyOn(api, 'addPlaylist').mockResolvedValue('playlist_id');

		const {
			getNewPlaylistInput,
			userAddPlaylist,
			waitForPlaylists,
		} = await renderComponent();

		await waitForPlaylists();

		await userAddPlaylist('the_title');

		expect(getNewPlaylistInput().value).toBeFalsy();
	});

	it('adds recording to new playlist on create', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([]);

		const { userAddPlaylist, waitForPlaylists } = await renderComponent();

		await waitForPlaylists();

		await userAddPlaylist('the_title');

		await waitFor(() => {
			expect(addPlaylist).toBeCalledWith('ENGLISH', 'the_title', {
				recordingIds: ['recording_id'],
				isPublic: false,
			});
		});
	});

	it('uses separate playlist caches for separate recordings', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([]);

		const { waitForPlaylists } = await renderComponent({
			recordingId: 'recording1',
		});

		await renderComponent({
			recordingId: 'recording2',
		});

		await waitForPlaylists(2);
	});

	it('adds playlist optimistically', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([]);

		const {
			userAddPlaylist,
			waitForPlaylists,
			getEntry,
		} = await renderComponent();

		await waitForPlaylists();

		await userAddPlaylist('the_title');

		await waitFor(() => expect(getEntry('the_title')).toBeInTheDocument());
	});

	it('defaults new playlist checkbox to checked', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([]);

		const {
			waitForPlaylists,
			getCheckbox,
			userAddPlaylist,
		} = await renderComponent();

		await waitForPlaylists();

		resolveWithDelay(jest.spyOn(api, 'getPlaylists'), 50, []);

		await userAddPlaylist('the_title');

		await waitFor(() => {
			const checkbox = getCheckbox('the_title');
			expect(checkbox?.checked).toBeTruthy();
		});
	});

	// on add playlist, cancel queries to avoid clobbering
	it('cancels old queries to avoid clobbering optimistic update', async () => {
		// Setup & initial render

		jest.spyOn(api, 'getPlaylists').mockResolvedValue([]);

		const {
			waitForPlaylists,
			userAddPlaylist,
			getEntry,
		} = await renderComponent();

		await waitForPlaylists();

		// Load slow query to clobber

		resolveWithDelay(jest.spyOn(api, 'getPlaylists'), 50, [
			{
				id: 'id1',
				title: 'playlist1',
				hasRecording: true,
			},
		]);

		// Add first playlist

		await userAddPlaylist('playlist1');

		// Wait for slow response to be requested

		await waitForPlaylists(2);

		// Load second, fast response

		jest.spyOn(api, 'getPlaylists').mockResolvedValue([
			{
				id: 'id1',
				title: 'playlist1',
				hasRecording: true,
			},
			{
				id: 'id2',
				title: 'playlist2',
				hasRecording: true,
			},
		]);

		// Add second playlist

		await userAddPlaylist('playlist2');

		// Sleep

		await sleep({ ms: 200 });

		// Check that first, slow response didn't clobber second, fast response

		expect(getEntry('playlist2')).toBeInTheDocument();
	});

	it('rolls back if mutation fails', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([]);

		jest.spyOn(api, 'addPlaylist').mockImplementation(() => {
			throw new Error('Oops!');
		});

		const {
			waitForPlaylists,
			userAddPlaylist,
			getEntry,
		} = await renderComponent();

		await waitForPlaylists();

		// load new playlist into response to avoid cache invalidation causing a pass
		resolveWithDelay(jest.spyOn(api, 'getPlaylists'), 50, [
			{
				id: 'playlist_id',
				title: 'the_title',
			},
		]);

		await userAddPlaylist('the_title');

		await waitFor(() => expect(getEntry('the_title')).toBeInTheDocument());

		await waitFor(() => expect(() => getEntry('the_title')).toThrow());
	});

	it('has privacy switcher', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([]);

		const { getByLabelText, waitForPlaylists } = await renderComponent();

		await waitForPlaylists();

		expect(getByLabelText('Public')).toBeInTheDocument();
	});

	it('does not check public box by default', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([]);

		const { getByLabelText, waitForPlaylists } = await renderComponent();

		await waitForPlaylists();

		const checkbox = getByLabelText('Public') as HTMLInputElement;

		expect(checkbox).not.toBeChecked();
	});

	it('allows checkbox to be checked', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([]);

		const { getByLabelText, waitForPlaylists } = await renderComponent();

		await waitForPlaylists();

		const checkbox = getByLabelText('Public') as HTMLInputElement;

		userEvent.click(checkbox);

		expect(checkbox).toBeChecked();
	});

	it('creates public playlist', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([]);

		const {
			getByLabelText,
			waitForPlaylists,
			userAddPlaylist,
		} = await renderComponent();

		await waitForPlaylists();

		const checkbox = getByLabelText('Public') as HTMLInputElement;

		userEvent.click(checkbox);

		await userAddPlaylist('the_title');

		await waitFor(() => {
			expect(addPlaylist).toBeCalledWith('ENGLISH', 'the_title', {
				recordingIds: ['recording_id'],
				isPublic: true,
			});
		});
	});

	it('resets public checkbox on playlist creation', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([]);

		const {
			getByLabelText,
			waitForPlaylists,
			userAddPlaylist,
		} = await renderComponent();

		await waitForPlaylists();

		const checkbox = getByLabelText('Public') as HTMLInputElement;

		userEvent.click(checkbox);

		await userAddPlaylist('the_title');

		expect(checkbox).not.toBeChecked();
	});
});
