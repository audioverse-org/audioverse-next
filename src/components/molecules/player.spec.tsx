import { getByLabelText, getByTestId, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import videojs from 'video.js';

import Player, { PlayerProps } from '@components/molecules/player';
import AndMiniplayer from '@components/templates/andMiniplayer';
import { PlayerFragment } from '@lib/generated/graphql';
import {
	buildRenderer,
	renderWithIntl,
	setPlayerMock,
} from '@lib/test/helpers';

jest.mock('video.js');

const recording: Partial<PlayerFragment> = {
	id: 'the_sermon_id',
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
		const { getByTestId, getByLabelText } = await renderComponent();

		userEvent.click(getByLabelText('play'));

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

	it('overloads different recording', async () => {
		const mockPlayer = setPlayerMock();

		const recording1: Partial<PlayerFragment> = {
			id: 'first_sermon_id',
			title: 'first_sermon_title',
			audioFiles: [
				{
					url: 'first_source_src',
					mimeType: 'first_source_type',
					filesize: 'first_source_size',
				},
			],
		};

		const recording2: Partial<PlayerFragment> = {
			id: 'second_sermon_id',
			title: 'second_sermon_title',
			audioFiles: [
				{
					url: 'second_source_src',
					mimeType: 'second_source_type',
					filesize: 'second_source_size',
				},
			],
		};

		const { getByTestId } = await renderWithIntl(
			() => (
				<AndMiniplayer>
					<Player recording={recording1 as PlayerFragment} />
					<Player recording={recording2 as PlayerFragment} />
				</AndMiniplayer>
			),
			{}
		);

		const firstPlayer = getByTestId('first_sermon_id');
		const secondPlayer = getByTestId('second_sermon_id');

		userEvent.click(getByLabelText(firstPlayer, 'play'));

		await waitFor(() => expect(videojs).toBeCalled());

		userEvent.click(getByLabelText(secondPlayer, 'play'));

		await waitFor(() =>
			expect(mockPlayer.src).toBeCalledWith([
				{
					src: 'second_source_src',
					type: 'second_source_type',
				},
			])
		);
	});

	it('does not show poster when video playing', async () => {
		const { getByAltText, queryByAltText } = await renderComponent({
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

		expect(queryByAltText('the_sermon_title')).not.toBeInTheDocument();
	});

	it('does not show audio controls when video playing', async () => {
		const { getByAltText, queryByLabelText } = await renderComponent({
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

		await waitFor(() => expect(videojs).toBeCalled());

		expect(queryByLabelText('pause')).not.toBeInTheDocument();
	});

	it('isolates recording progress between recordings', async () => {
		const recording1: Partial<PlayerFragment> = {
			id: 'first_sermon_id',
			title: 'first_sermon_title',
			audioFiles: [
				{
					url: 'first_source_src',
					mimeType: 'first_source_type',
					filesize: 'first_source_size',
				},
			],
		};

		const recording2: Partial<PlayerFragment> = {
			id: 'second_sermon_id',
			title: 'second_sermon_title',
			audioFiles: [
				{
					url: 'second_source_src',
					mimeType: 'second_source_type',
					filesize: 'second_source_size',
				},
			],
		};

		const { getByTestId } = await renderWithIntl(
			() => (
				<AndMiniplayer>
					<Player recording={recording1 as PlayerFragment} />
					<Player recording={recording2 as PlayerFragment} />
				</AndMiniplayer>
			),
			{}
		);

		const firstPlayer = getByTestId('first_sermon_id');
		const secondPlayer = getByTestId('second_sermon_id');

		userEvent.click(getByLabelText(firstPlayer, 'play'));

		await waitFor(() => expect(videojs).toBeCalled());

		ReactTestUtils.Simulate.change(getByLabelText(firstPlayer, 'progress'), {
			target: {
				value: 50,
			},
		} as any);

		expect(getByLabelText(secondPlayer, 'progress')).toHaveValue('0');
	});

	it('has volume control', async () => {
		setPlayerMock({ volume: 0.7 });

		const { getByLabelText } = await renderComponent();

		userEvent.click(getByLabelText('play'));

		const control = getByLabelText('volume');

		expect(control).toHaveValue('70');
	});

	it('sets volume', async () => {
		const playerMock = setPlayerMock();

		const { getByLabelText } = await renderComponent();

		userEvent.click(getByLabelText('play'));

		const control = getByLabelText('volume');

		ReactTestUtils.Simulate.change(control, {
			target: {
				value: 70,
			},
		} as any);

		await waitFor(() => expect(playerMock.volume).toBeCalledWith(0.7));
	});

	it('does not show miniplayer if no recording loaded', async () => {
		const { queryByLabelText } = await renderComponent();

		expect(queryByLabelText('volume')).not.toBeInTheDocument();
	});

	it('displays portal target when video is loaded', async () => {
		const { getByAltText, getByTestId } = await renderComponent({
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

		expect(getByTestId('portal')).toBeInTheDocument();
	});

	it('plays video through portal', async () => {
		setPlayerMock();

		const result = await renderComponent({
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

		const poster = result.getByAltText('the_sermon_title') as HTMLElement;

		userEvent.click(poster.parentElement as HTMLElement);

		const portal = result.getByTestId('portal');

		await waitFor(() =>
			expect(getByTestId(portal, 'video-element')).toBeInTheDocument()
		);
	});
});

// TODO:
// Display progress bar in mini player
// Display sequence title in mini player
// Display playback controls in mini player
// Style volume controls

// punt:
// Replaces play/pause with loading indicator when player in loading state
