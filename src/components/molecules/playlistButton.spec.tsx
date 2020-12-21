import { render } from '@testing-library/react';
import React from 'react';

import PlaylistButton from '@components/molecules/playlistButton';

describe('playlist button', () => {
	it('renders', async () => {
		await render(<PlaylistButton />);
	});

	it('shows error if user not logged in', () => {});

	// shows error if user not logged in
	// gets user playlists
	// shows user playlists
	// adds recording to playlist

	// punt

	// busts playlist cache
});
