import userEvent from '@testing-library/user-event';
import ReactTestUtils from 'react-dom/test-utils';
import videojs from 'video.js';

import Player from '@components/molecules/player';
import { buildRenderer } from '@lib/test/helpers';

jest.mock('video.js');

const mockVideojs = (videojs as unknown) as jest.Mock;

const renderComponent = buildRenderer(Player, {
	defaultProps: {
		sources: [{ src: 'the_source_src', type: 'the_source_type' }],
	},
});

interface SetPlayerMockOptions {
	isPaused?: boolean;
	time?: number;
	duration?: number;
}

function setPlayerMock(options: SetPlayerMockOptions = {}) {
	let { isPaused = true, time = 50 } = options;
	const { duration = 100 } = options;

	const mockPlayer = {
		play: jest.fn(() => (isPaused = false)),
		pause: jest.fn(() => (isPaused = true)),
		paused: jest.fn(() => isPaused),
		currentTime: jest.fn((newTime: number | null = null) => {
			if (newTime !== null) time = newTime;
			return time;
		}),
		duration: jest.fn(() => duration),
	};

	mockVideojs.mockReturnValue(mockPlayer);

	return mockPlayer;
}

describe('player', () => {
	beforeEach(() => setPlayerMock());

	it('has play button', async () => {
		const { getByLabelText } = await renderComponent();

		expect(getByLabelText('play')).toBeInTheDocument();
	});

	it('plays when play clicked', async () => {
		const mockPlayer = setPlayerMock();

		const { getByLabelText } = await renderComponent();

		userEvent.click(getByLabelText('play'));

		// to be called with nothing
		expect(mockPlayer.play).toBeCalledWith();
	});

	it('toggles play/pause buttons', async () => {
		const { getByLabelText } = await renderComponent();

		userEvent.click(getByLabelText('play'));

		expect(getByLabelText('pause')).toBeInTheDocument();
	});

	it('toggles back to play button', async () => {
		const { getByLabelText } = await renderComponent();

		userEvent.click(getByLabelText('play'));
		userEvent.click(getByLabelText('pause'));

		expect(getByLabelText('play')).toBeInTheDocument();
	});

	it('sets current time', async () => {
		const mockPlayer = setPlayerMock();

		const { getByLabelText } = await renderComponent();

		const input = getByLabelText('progress');

		ReactTestUtils.Simulate.change(input, {
			target: {
				value: 50,
			},
		} as any);

		expect(mockPlayer.currentTime).toBeCalledWith(50);
	});

	it('treats range output as percentage', async () => {
		const mockPlayer = setPlayerMock({ duration: 300 });

		const { getByLabelText } = await renderComponent();

		const input = getByLabelText('progress');

		ReactTestUtils.Simulate.change(input, {
			target: {
				value: 50,
			},
		} as any);

		expect(mockPlayer.currentTime).toBeCalledWith(150);
	});

	it('updates scrubber on time update', async () => {
		const player = setPlayerMock({ duration: 300 });

		const { getByTestId, getByLabelText } = await renderComponent();

		const target = getByTestId('video-element');

		player.currentTime(75);

		ReactTestUtils.Simulate.timeUpdate(target, {} as any);

		expect(getByLabelText('progress')).toHaveValue('25');
	});

	it('updates progress on scrub', async () => {
		setPlayerMock({ duration: 300 });

		const { getByLabelText } = await renderComponent();

		const input = getByLabelText('progress');

		ReactTestUtils.Simulate.change(input, {
			target: {
				value: 50,
			},
		} as any);

		expect(input).toHaveValue('50');
	});
});
