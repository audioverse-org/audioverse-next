import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import PlaylistButton from '@components/molecules/playlistButton';
import * as api from '@lib/api';
import { getMe } from '@lib/api';

jest.mock('@lib/api/getMe');

describe('playlist button', () => {
	it('renders', async () => {
		await render(<PlaylistButton />);
	});

	it('shows error if user not logged in', async () => {
		const { getByText } = await render(<PlaylistButton />);

		const button = getByText('Add to Playlist');

		userEvent.click(button);

		expect(
			getByText('You must be logged in to perform this action')
		).toBeInTheDocument();
	});

	it('does not show error if user logged in', async () => {
		jest.spyOn(api, 'getMe').mockResolvedValue({} as any);

		const { getByText, queryByText } = await render(<PlaylistButton />);

		const button = getByText('Add to Playlist');

		await waitFor(() => expect(getMe).toHaveBeenCalled());

		console.log('clicking');

		userEvent.click(button);

		expect(
			queryByText('You must be logged in to perform this action')
		).toBeNull();
	});

	it('queries me with language', async () => {
		await render(<PlaylistButton />);

		await waitFor(() => expect(getMe).toBeCalledWith('ENGLISH'));
	});

	it('shows user playlists', async () => {
		jest.spyOn(api, 'getMe').mockResolvedValue({
			playlists: {
				nodes: [{ title: 'playlist_title' }],
			},
		} as any);

		const { getByText } = render(<PlaylistButton />);

		const button = getByText('Add to Playlist');

		await waitFor(() => expect(getMe).toHaveBeenCalled());

		userEvent.click(button);

		await waitFor(() =>
			expect(getByText('playlist_title')).toBeInTheDocument()
		);
	});

	// adds recording to playlist
	// allows new playlist creation
	// busts me cache
});
