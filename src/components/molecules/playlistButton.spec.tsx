import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import PlaylistButton from '@components/molecules/playlistButton';
import { getMe } from '@lib/api';
import { setPlaylistMembership } from '@lib/api/setPlaylistMembership';
import { loadMe } from '@lib/test/helpers';

jest.mock('@lib/api/getMe');
jest.mock('@lib/api/setPlaylistMembership');

const renderComponent = async () => {
	const result = await render(<PlaylistButton recordingId={'recording_id'} />);

	const getEntry = (playlistTitle: string) => result.getByText(playlistTitle);

	return {
		...result,
		button: result.getByText('Add to Playlist'),
		waitForMe: () => waitFor(() => expect(getMe).toHaveBeenCalled()),
		getEntry,
		getCheckbox: (playlistTitle: string) =>
			getEntry(playlistTitle).querySelector('input'),
	};
};

describe('playlist button', () => {
	it('shows error if user not logged in', async () => {
		const { getByText, button } = await renderComponent();

		userEvent.click(button);

		expect(
			getByText('You must be logged in to perform this action')
		).toBeInTheDocument();
	});

	it('does not show error if user logged in', async () => {
		loadMe();

		const { queryByText, button, waitForMe } = await renderComponent();

		await waitForMe();

		userEvent.click(button);

		expect(
			queryByText('You must be logged in to perform this action')
		).toBeNull();
	});

	it('queries me with language', async () => {
		await renderComponent();

		await waitFor(() => expect(getMe).toBeCalledWith('ENGLISH'));
	});

	it('shows user playlists', async () => {
		loadMe({
			playlists: [
				{
					title: 'playlist_title',
				},
			],
		});

		const { getEntry, button, waitForMe } = await renderComponent();

		await waitForMe();

		userEvent.click(button);

		await waitFor(() => expect(getEntry('playlist_title')).toBeInTheDocument());
	});

	it('adds recording to playlist', async () => {
		loadMe({
			playlists: [
				{
					id: 'playlist_id',
					title: 'playlist_title',
				},
			],
		});

		const { getEntry, button, waitForMe } = await renderComponent();

		await waitForMe();

		userEvent.click(button);

		const entry = getEntry('playlist_title');

		userEvent.click(entry);

		expect(setPlaylistMembership).toBeCalledWith(
			'recording_id',
			'playlist_id',
			true
		);
	});

	it('toggles checkbox', async () => {
		loadMe({
			playlists: [
				{
					id: 'playlist_id',
					title: 'playlist_title',
				},
			],
		});

		const {
			getEntry,
			getCheckbox,
			button,
			waitForMe,
		} = await renderComponent();

		await waitForMe();

		userEvent.click(button);

		const entry = getEntry('playlist_title');

		userEvent.click(entry);

		const checkbox = getCheckbox('playlist_title');

		expect(checkbox?.checked).toBeTruthy();
	});

	it('toggles back and forth', async () => {
		loadMe({
			playlists: [
				{
					id: 'playlist_id',
					title: 'playlist_title',
				},
			],
		});

		const {
			getEntry,
			getCheckbox,
			button,
			waitForMe,
		} = await renderComponent();

		await waitForMe();

		userEvent.click(button);

		const entry = getEntry('playlist_title');

		userEvent.click(entry);
		userEvent.click(entry);

		const checkbox = getCheckbox('playlist_title');

		expect(checkbox?.checked).toBeFalsy();
	});

	it('removes item from playlist', async () => {
		loadMe({
			playlists: [
				{
					id: 'playlist_id',
					title: 'playlist_title',
				},
			],
		});

		const { getEntry, button, waitForMe } = await renderComponent();

		await waitForMe();

		userEvent.click(button);

		const entry = getEntry('playlist_title');

		userEvent.click(entry);
		userEvent.click(entry);

		expect(setPlaylistMembership).toBeCalledWith(
			'recording_id',
			'playlist_id',
			false
		);
	});

	// allows new playlist creation
	// loads playlist membership statuses on initial page load
});
