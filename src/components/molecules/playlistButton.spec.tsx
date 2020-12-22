import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import PlaylistButton from '@components/molecules/playlistButton';

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

	// does not show error if user logged in
	// gets user playlists
	// shows user playlists
	// adds recording to playlist

	// punt

	// busts playlist cache
});
