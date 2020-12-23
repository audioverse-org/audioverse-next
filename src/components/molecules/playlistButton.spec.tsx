import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import PlaylistButton from '@components/molecules/playlistButton';
import * as api from '@lib/api';
import { getMe } from '@lib/api';
import { setPlaylistMembership } from '@lib/api/setPlaylistMembership';

jest.mock('@lib/api/getMe');
jest.mock('@lib/api/setPlaylistMembership');

describe('playlist button', () => {
	it('renders', async () => {
		await render(<PlaylistButton recordingId={'recording_id'} />);
	});

	it('shows error if user not logged in', async () => {
		const { getByText } = await render(
			<PlaylistButton recordingId={'recording_id'} />
		);

		const button = getByText('Add to Playlist');

		userEvent.click(button);

		expect(
			getByText('You must be logged in to perform this action')
		).toBeInTheDocument();
	});

	it('does not show error if user logged in', async () => {
		jest.spyOn(api, 'getMe').mockResolvedValue({} as any);

		const { getByText, queryByText } = await render(
			<PlaylistButton recordingId={'recording_id'} />
		);

		const button = getByText('Add to Playlist');

		await waitFor(() => expect(getMe).toHaveBeenCalled());

		userEvent.click(button);

		expect(
			queryByText('You must be logged in to perform this action')
		).toBeNull();
	});

	it('queries me with language', async () => {
		await render(<PlaylistButton recordingId={'recording_id'} />);

		await waitFor(() => expect(getMe).toBeCalledWith('ENGLISH'));
	});

	it('shows user playlists', async () => {
		jest.spyOn(api, 'getMe').mockResolvedValue({
			playlists: {
				nodes: [{ title: 'playlist_title' }],
			},
		} as any);

		const { getByText } = render(
			<PlaylistButton recordingId={'recording_id'} />
		);

		const button = getByText('Add to Playlist');

		await waitFor(() => expect(getMe).toHaveBeenCalled());

		userEvent.click(button);

		await waitFor(() =>
			expect(getByText('playlist_title')).toBeInTheDocument()
		);
	});

	it('adds recording to playlist', async () => {
		jest.spyOn(api, 'getMe').mockResolvedValue({
			playlists: {
				nodes: [
					{
						id: 'playlist_id',
						title: 'playlist_title',
					},
				],
			},
		} as any);

		const { getByText } = render(
			<PlaylistButton recordingId={'recording_id'} />
		);

		const button = getByText('Add to Playlist');

		await waitFor(() => expect(getMe).toHaveBeenCalled());

		userEvent.click(button);

		const entry = getByText('playlist_title');

		userEvent.click(entry);

		expect(setPlaylistMembership).toBeCalledWith(
			'recording_id',
			'playlist_id',
			true
		);
	});

	// toggles playlist membership bool in api call
	// toggles playlist checkbox
	// allows new playlist creation
});
