import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import videojs from 'video.js';

import Player, { PlayerProps } from '@components/molecules/player';
import AndMiniplayer from '@components/templates/andMiniplayer';
import { PlayerFragment } from '@lib/generated/graphql';
import { buildRenderer, setPlayerMock } from '@lib/test/helpers';

jest.mock('video.js');

const recording: Partial<PlayerFragment> = {
	title: 'the_sermon_title',
	audioFiles: [
		{
			url: 'the_source_src',
			mimeType: 'the_source_type',
			filesize: 'the_source_size',
		},
	],
};

const renderComponent = buildRenderer(
	(props: PlayerProps) => {
		return (
			<AndMiniplayer>
				<Player {...props} />
			</AndMiniplayer>
		);
	},
	{
		defaultProps: {
			recording,
		},
	}
);

describe('player', () => {
	beforeEach(() => setPlayerMock());

	it('has button', async () => {
		const { getByLabelText } = await renderComponent();

		expect(getByLabelText('play')).toBeInTheDocument();
	});

	it('plays when clicked', async () => {
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

		await waitFor(() => expect(mockPlayer.currentTime).toBeCalledWith(50));
	});

	it('treats range output as percentage', async () => {
		const mockPlayer = setPlayerMock({ duration: 300 });

		const { getByLabelText } = await renderComponent();

		ReactTestUtils.Simulate.change(getByLabelText('progress'), {
			target: {
				value: 50,
			},
		} as any);

		await waitFor(() => expect(mockPlayer.currentTime).toBeCalledWith(150));
	});

	it('updates scrubber on time update', async () => {
		const player = setPlayerMock({ duration: 300 });

		const { getByTestId, getByLabelText } = await renderComponent();

		userEvent.click(getByLabelText('play'));

		await waitFor(() => expect(videojs).toBeCalled());

		player.currentTime(75);

		ReactTestUtils.Simulate.timeUpdate(getByTestId('video-element'), {} as any);

		await waitFor(() => expect(getByLabelText('progress')).toHaveValue('25'));
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

		await waitFor(() => expect(input).toHaveValue('50'));
	});

	it('does not reload player on play', async () => {
		const mockPlayer = setPlayerMock();

		const { getByLabelText } = await renderComponent();

		userEvent.click(getByLabelText('play'));

		expect(mockPlayer.src).not.toBeCalled();
	});

	it('nudges back 15 seconds', async () => {
		const player = setPlayerMock();

		const { getByLabelText } = await renderComponent();

		userEvent.click(getByLabelText('back 15 seconds'));

		expect(player.currentTime).toBeCalledWith(35);
	});

	it('nudges forward 15 seconds', async () => {
		const player = setPlayerMock();

		const { getByLabelText } = await renderComponent();

		userEvent.click(getByLabelText('forward 15 seconds'));

		await waitFor(() => {
			expect(player.currentTime).toBeCalledWith(65);
		});
	});

	it('hides player if no video files', async () => {
		const { getByTestId } = await renderComponent();

		expect(getByTestId('video-element')).not.toBeVisible();
	});

	it('hides scrubber when video shown', async () => {
		const { queryByTestId } = await renderComponent({
			props: {
				recording: {
					videoFiles: [
						{
							url: 'the_source_src',
							mimeType: 'the_source_type',
							filesize: 'the_source_size',
						},
					],
				},
			},
		});

		expect(queryByTestId('progress')).not.toBeInTheDocument();
	});

	it('sets paused to true when switching formats', async () => {
		const { getByLabelText, getByText } = await renderComponent({
			props: {
				recording: {
					audioFiles: [
						{
							url: 'the_source_src',
							mimeType: 'the_source_type',
							filesize: 'the_source_size',
						},
					],
					videoFiles: [
						{
							url: 'the_source_src',
							mimeType: 'the_source_type',
							filesize: 'the_source_size',
						},
					],
				},
			},
		});

		userEvent.click(getByText('Audio'));
		userEvent.click(getByLabelText('play'));
		userEvent.click(getByText('Video'));
		userEvent.click(getByText('Audio'));

		expect(getByLabelText('play')).toBeInTheDocument();
	});

	it('displays both format buttons at the same time', async () => {
		const { getByText } = await renderComponent({
			props: {
				recording: {
					audioFiles: [
						{
							url: 'the_source_src',
							mimeType: 'the_source_type',
							filesize: 'the_source_size',
						},
					],
					videoFiles: [
						{
							url: 'the_source_src',
							mimeType: 'the_source_type',
							filesize: 'the_source_size',
						},
					],
				},
			},
		});

		expect(getByText('Audio')).toBeInTheDocument();
		expect(getByText('Video')).toBeInTheDocument();
	});

	it('does not load recording if UI not clicked', async () => {
		await renderComponent();

		expect(videojs).not.toBeCalled();
	});

	it('handles scrubber update after initial recording load', async () => {
		const mockPlayer = setPlayerMock({ duration: 300 });

		const { getByLabelText } = await renderComponent();

		userEvent.click(getByLabelText('play'));

		await waitFor(() => expect(videojs).toBeCalled());

		ReactTestUtils.Simulate.change(getByLabelText('progress'), {
			target: {
				value: 50,
			},
		} as any);

		await waitFor(() => expect(mockPlayer.currentTime).toBeCalledWith(150));
	});

	it('plays video on poster click', async () => {
		const mockPlayer = setPlayerMock();

		const { getByAltText } = await renderComponent({
			props: {
				recording: {
					title: 'the_sermon_title',
					videoFiles: [
						{
							url: 'the_source_src',
							mimeType: 'the_source_type',
							filesize: 'the_source_size',
						},
					],
				},
			},
		});

		const poster = getByAltText('the_sermon_title') as HTMLElement;

		userEvent.click(poster.parentElement as HTMLElement);

		expect(mockPlayer.play).toBeCalled();
	});

	it('tracks scrubber click when duration not yet known', async () => {
		const mockPlayer = setPlayerMock({
			duration: NaN,
			functions: {
				play: jest.fn(async () => {
					mockPlayer._updateOptions({
						isPaused: false,
						duration: 300,
					});
				}),
			},
		});

		const { getByLabelText } = await renderComponent();

		ReactTestUtils.Simulate.change(getByLabelText('progress'), {
			target: {
				value: 50,
			},
		} as any);

		await waitFor(() => expect(videojs).toBeCalled());

		userEvent.click(getByLabelText('play'));

		await waitFor(() => expect(mockPlayer.currentTime).toBeCalledWith(150));
	});
});

// TODO:
// Waits until detail UI clicked before loading recording into miniplayer
// Does not re-load recording after first load
// Replaces play/pause with loading indicator when player in loading state
