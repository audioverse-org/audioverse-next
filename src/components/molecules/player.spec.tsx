import userEvent from '@testing-library/user-event';
import _ from 'lodash';
import videojs from 'video.js';

import Player from '@components/molecules/player';
import { buildRenderer } from '@lib/test/helpers';

jest.mock('video.js');

const mockVideojs = (videojs as unknown) as jest.Mock;

const renderComponent = buildRenderer(Player);

function setPlayerMock(player: Record<string, unknown> = {}) {
	let isPaused = true;

	const mockPlayer = _.defaults(player, {
		play: jest.fn(() => (isPaused = false)),
		pause: jest.fn(() => (isPaused = true)),
		paused: () => isPaused,
	});

	mockVideojs.mockReturnValue(mockPlayer);

	return mockPlayer;
}

describe('player', () => {
	beforeEach(() => setPlayerMock());

	it('has play button', async () => {
		const { getByLabelText } = await renderComponent({
			props: {
				sources: [{ src: 'the_source_src', type: 'the_source_type' }],
			},
		});

		expect(getByLabelText('play')).toBeInTheDocument();
	});

	it('plays when play clicked', async () => {
		const mockPlayer = setPlayerMock();

		const { getByLabelText } = await renderComponent({
			props: {
				sources: [{ src: 'the_source_src', type: 'the_source_type' }],
			},
		});

		userEvent.click(getByLabelText('play'));

		// to be called with nothing
		expect(mockPlayer.play).toBeCalledWith();
	});

	it('toggles play/pause buttons', async () => {
		const { getByLabelText } = await renderComponent({
			props: {
				sources: [{ src: 'the_source_src', type: 'the_source_type' }],
			},
		});

		userEvent.click(getByLabelText('play'));

		expect(getByLabelText('pause')).toBeInTheDocument();
	});

	it('toggles back to play button', async () => {
		const { getByLabelText } = await renderComponent({
			props: {
				sources: [{ src: 'the_source_src', type: 'the_source_type' }],
			},
		});

		userEvent.click(getByLabelText('play'));
		userEvent.click(getByLabelText('pause'));

		expect(getByLabelText('play')).toBeInTheDocument();
	});
});
