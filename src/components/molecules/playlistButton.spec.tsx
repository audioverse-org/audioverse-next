import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import PlaylistButton from '@components/molecules/playlistButton';
import * as api from '@lib/api';
import { getPlaylists } from '@lib/api/getPlaylists';
import { setPlaylistMembership } from '@lib/api/setPlaylistMembership';

jest.mock('@lib/api/getMe');
jest.mock('@lib/api/setPlaylistMembership');
jest.mock('@lib/api/getPlaylists');

const renderComponent = async ({
	recordingId = 'recording_id',
}: {
	recordingId?: string;
} = {}) => {
	const result = await render(<PlaylistButton recordingId={recordingId} />);

	const getEntry = (playlistTitle: string) => result.getByText(playlistTitle);

	return {
		...result,
		button: result.getByText('Add to Playlist'),
		waitForPlaylists: () =>
			waitFor(() => expect(getPlaylists).toHaveBeenCalled()),
		getEntry,
		getCheckbox: (playlistTitle: string) =>
			getEntry(playlistTitle).querySelector('input'),
	};
};

describe('playlist button', () => {
	beforeEach(() => jest.resetAllMocks());

	it('shows error if user not logged in', async () => {
		const { getByText, button } = await renderComponent();

		userEvent.click(button);

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

		const { queryByText, button, waitForPlaylists } = await renderComponent();

		await waitForPlaylists();

		userEvent.click(button);

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

		const { getEntry, button, waitForPlaylists } = await renderComponent();

		await waitForPlaylists();

		userEvent.click(button);

		await waitFor(() => expect(getEntry('playlist_title')).toBeInTheDocument());
	});

	it('adds recording to playlist', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([
			{
				id: 'playlist_id',
				title: 'playlist_title',
			},
		]);

		const { getEntry, button, waitForPlaylists } = await renderComponent();

		await waitForPlaylists();

		userEvent.click(button);

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
			button,
			waitForPlaylists,
		} = await renderComponent();

		await waitForPlaylists();

		userEvent.click(button);

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
			button,
			waitForPlaylists,
		} = await renderComponent();

		await waitForPlaylists();

		userEvent.click(button);

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

		const { getEntry, button, waitForPlaylists } = await renderComponent();

		await waitForPlaylists();

		userEvent.click(button);

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

		const { getEntry, button, waitForPlaylists } = await renderComponent();

		await waitForPlaylists();

		userEvent.click(button);

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

	// allows new playlist creation
	// loads playlist membership statuses on initial page load

	// usePlaylistMemberships
	// useSetPlaylistMembership
	// bust playlist membership query cache
});
