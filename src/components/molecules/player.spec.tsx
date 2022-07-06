import { act, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { __loadRouter } from 'next/router';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import videojs, { __loadMockPlayer, __mockPlayer } from 'video.js';

import Player, { PlayerProps } from '@components/molecules/player';
import AndMiniplayer from '@components/templates/andMiniplayer';
import AndPlaybackContext from '@components/templates/andPlaybackContext';
import { recordingIsFavorited } from '@lib/api/recordingIsFavorited';
import { SequenceContentType } from '@src/__generated__/graphql';
import { buildRenderer } from '@lib/test/buildRenderer';
import renderWithProviders from '@lib/test/renderWithProviders';
import { BaseColors } from '@lib/constants';
import { simulateMediaTick } from '@lib/test/simulateMediaTick';
import { PlayerFragment } from '@components/molecules/__generated__/player';

jest.mock('video.js');
jest.mock('@lib/api/recordingIsFavorited');
jest.mock('@components/molecules/helpWidget');

const mockRecordingIsFavorited = recordingIsFavorited as jest.Mock;

const recording: Partial<PlayerFragment> = {
	id: 'the_sermon_id',
	title: 'the_sermon_title',
	canonicalPath: 'the_sermon_path',
	isDownloadAllowed: true,
	audioDownloads: [],
	videoDownloads: [],
	speakers: [],
	sequence: {
		contentType: SequenceContentType.Series,
		title: 'the_sequence_title',
	},
	audioFiles: [
		{
			url: 'the_source_src',
			mimeType: 'the_source_type',
			filesize: 'the_source_size',
			duration: 1234,
		},
	],
};

const renderComponent = buildRenderer<PlayerProps>(
	(props: PlayerProps) => {
		return (
			<AndPlaybackContext>
				<AndMiniplayer>
					<Player {...props} />
				</AndMiniplayer>
			</AndPlaybackContext>
		);
	},
	{
		defaultProps: {
			recording,
		},
	}
);

const updateProgress = async (progress = 50) => {
	const input = screen.getAllByLabelText('progress')[0];

	await act(async () => {
		ReactTestUtils.Simulate.input(input, {
			target: {
				value: progress,
			},
		} as any);
	});

	return input;
};

async function updateVolume(volume = 70) {
	const control = screen.getByLabelText('Volume');

	await act(async () => {
		ReactTestUtils.Simulate.change(control, {
			target: {
				value: volume,
			},
		} as any);
	});

	return control;
}

describe('player', () => {
	beforeEach(() => {
		__loadRouter({});
		mockRecordingIsFavorited.mockResolvedValue(false);
		__loadMockPlayer();
	});

	it('has button', async () => {
		await renderComponent();

		expect(screen.getByLabelText('play')).toBeInTheDocument();
	});

	it('plays when clicked', async () => {
		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		await waitFor(() => {
			// to be called with nothing
			expect(__mockPlayer.play).toBeCalledWith();
		});
	});

	it('toggles play/pause buttons', async () => {
		await renderComponent();

		const player = screen.getByLabelText('player');

		userEvent.click(within(player).getByLabelText('play'));

		expect(await within(player).findByLabelText('pause')).toBeInTheDocument();
	});

	it('toggles back to play button', async () => {
		await renderComponent();

		const player = screen.getByLabelText('player');

		userEvent.click(within(player).getByLabelText('play'));
		await within(player).findByLabelText('pause');

		userEvent.click(within(player).getByLabelText('pause'));

		expect(await within(player).findByLabelText('play')).toBeInTheDocument();
	});

	it('sets current time', async () => {
		__loadMockPlayer({
			duration: 1234,
		});

		await renderComponent();

		await updateProgress();

		await waitFor(() => {
			expect(__mockPlayer.currentTime).toBeCalledWith(617);
		});
	});

	it('treats range output as percentage', async () => {
		__loadMockPlayer({ duration: 300 });

		await renderComponent({
			props: {
				recording: {
					...recording,
					audioFiles: [
						{
							url: 'the_source_src',
							mimeType: 'the_source_type',
							filesize: 'the_source_size',
							duration: 300,
						},
					],
				},
			},
		});

		await updateProgress();

		await waitFor(() => expect(__mockPlayer.currentTime).toBeCalledWith(150));
	});

	it('updates scrubber on time update', async () => {
		const player = __loadMockPlayer({ duration: 300 });

		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		await waitFor(() => expect(videojs).toBeCalled());

		player.currentTime(75);

		await simulateMediaTick();

		await waitFor(() =>
			expect(screen.getAllByLabelText('progress')[0]).toHaveValue('25')
		);
	});

	it('updates progress on scrub', async () => {
		__loadMockPlayer({ duration: 300 });

		await renderComponent();

		const input = await updateProgress();

		await waitFor(() => expect(input).toHaveValue('50'));
	});

	it('does not reload player on play', async () => {
		__loadMockPlayer();

		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		await screen.findAllByLabelText('pause');

		expect(__mockPlayer.src).not.toBeCalled();
	});

	it('nudges back 15 seconds', async () => {
		__loadMockPlayer();

		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		const player = screen.getByLabelText('player');
		await within(player).findByLabelText('pause');

		__mockPlayer.currentTime(50);

		await simulateMediaTick();

		userEvent.click(within(player).getByLabelText('back 15 seconds'));

		expect(__mockPlayer.currentTime).toBeCalledWith(35);
	});

	it('nudges forward 15 seconds', async () => {
		__loadMockPlayer();

		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		const player = screen.getByLabelText('player');
		await within(player).findByLabelText('pause');

		__mockPlayer.currentTime(50);

		await simulateMediaTick();

		userEvent.click(within(player).getByLabelText('forward 15 seconds'));

		await waitFor(() => {
			expect(__mockPlayer.currentTime).toBeCalledWith(65);
		});
	});

	it('does not load recording if UI not clicked', async () => {
		await renderComponent();

		expect(videojs).not.toBeCalled();
	});

	it('handles scrubber update after initial recording load', async () => {
		__loadMockPlayer({ duration: 300 });

		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		await waitFor(() => expect(videojs).toBeCalled());

		await updateProgress();

		await waitFor(() => expect(__mockPlayer.currentTime).toBeCalledWith(150));
	});

	it('plays video on poster click', async () => {
		__loadMockPlayer();

		await renderComponent({
			props: {
				recording: {
					...recording,
					title: 'the_sermon_title',
					canonicalPath: 'the_sermon_path',
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

		userEvent.click(screen.getByAltText('the_sermon_title'));

		await waitFor(() => expect(__mockPlayer.play).toBeCalled());
	});

	it('tracks scrubber click when duration not yet known', async () => {
		__loadMockPlayer({
			duration: NaN,
			functions: {
				play: jest.fn(async () => {
					__mockPlayer._updateOptions({
						isPaused: false,
						duration: 300,
					});
				}),
			},
		});

		await renderComponent({
			props: {
				recording: {
					...recording,
					audioFiles: [
						{
							url: 'the_source_src',
							mimeType: 'the_source_type',
							filesize: 'the_source_size',
							duration: 300,
						},
					],
				},
			},
		});

		await updateProgress();

		await waitFor(() => expect(videojs).toBeCalled());

		const player = screen.getByLabelText('player');
		userEvent.click(within(player).getByLabelText('play'));

		await waitFor(() => expect(__mockPlayer.currentTime).toBeCalledWith(150));
	});

	it('overloads different recording', async () => {
		__loadMockPlayer();

		const recording1: Partial<PlayerFragment> = {
			id: 'first_sermon_id',
			title: 'first_sermon_title',
			canonicalPath: 'the_sermon_path',
			audioFiles: [
				{
					url: 'first_source_src',
					mimeType: 'first_source_type',
					filesize: 'first_source_size',
					duration: 1234,
				},
			],
			speakers: [],
		};

		const recording2: Partial<PlayerFragment> = {
			id: 'second_sermon_id',
			title: 'second_sermon_title',
			canonicalPath: 'the_sermon_path',
			audioFiles: [
				{
					url: 'second_source_src',
					mimeType: 'second_source_type',
					filesize: 'second_source_size',
					duration: 2345,
				},
			],
			speakers: [],
		};

		await renderWithProviders(
			<AndPlaybackContext>
				<AndMiniplayer>
					<Player
						recording={recording1 as PlayerFragment}
						backgroundColor={BaseColors.WHITE}
					/>
					<Player
						recording={recording2 as PlayerFragment}
						backgroundColor={BaseColors.WHITE}
					/>
				</AndMiniplayer>
			</AndPlaybackContext>,
			undefined
		);

		const firstPlayer = screen.getByTestId('first_sermon_id');
		const secondPlayer = screen.getByTestId('second_sermon_id');

		userEvent.click(within(firstPlayer).getByLabelText('play'));

		await waitFor(() => expect(videojs).toBeCalled());

		userEvent.click(within(secondPlayer).getByLabelText('play'));

		await waitFor(() =>
			expect(__mockPlayer.src).toBeCalledWith([
				{
					duration: 2345,
					src: 'second_source_src',
					type: 'second_source_type',
				},
			])
		);
	});

	it('does not show poster when video playing', async () => {
		await renderComponent({
			props: {
				recording: {
					...recording,
					title: 'the_sermon_title',
					canonicalPath: 'the_sermon_path',
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

		userEvent.click(screen.getByAltText('the_sermon_title'));

		await screen.findAllByLabelText('pause');

		expect(screen.queryByAltText('the_sermon_title')).not.toBeInTheDocument();
	});

	it('does not show audio controls when video playing', async () => {
		await renderComponent({
			props: {
				recording: {
					...recording,
					title: 'the_sermon_title',
					canonicalPath: 'the_sermon_path',
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

		userEvent.click(screen.getByAltText('the_sermon_title'));

		await waitFor(() => expect(videojs).toBeCalled());

		const player = screen.getByLabelText('player');

		expect(within(player).queryByLabelText('pause')).not.toBeInTheDocument();
	});

	it('isolates recording progress between recordings', async () => {
		const recording1: Partial<PlayerFragment> = {
			id: 'first_sermon_id',
			title: 'first_sermon_title',
			canonicalPath: 'the_sermon_path',
			audioFiles: [
				{
					url: 'first_source_src',
					mimeType: 'first_source_type',
					filesize: 'first_source_size',
					duration: 1234,
				},
			],
			speakers: [],
		};

		const recording2: Partial<PlayerFragment> = {
			id: 'second_sermon_id',
			title: 'second_sermon_title',
			canonicalPath: 'the_sermon_path',
			audioFiles: [
				{
					url: 'second_source_src',
					mimeType: 'second_source_type',
					filesize: 'second_source_size',
					duration: 2345,
				},
			],
			speakers: [],
		};

		await renderWithProviders(
			<AndPlaybackContext>
				<AndMiniplayer>
					<Player
						recording={recording1 as PlayerFragment}
						backgroundColor={BaseColors.WHITE}
					/>
					<Player
						recording={recording2 as PlayerFragment}
						backgroundColor={BaseColors.WHITE}
					/>
				</AndMiniplayer>
			</AndPlaybackContext>,
			undefined
		);

		const firstPlayer = screen.getByTestId('first_sermon_id');
		const secondPlayer = screen.getByTestId('second_sermon_id');

		userEvent.click(within(firstPlayer).getByLabelText('play'));

		await waitFor(() => expect(videojs).toBeCalled());

		await updateProgress();

		expect(within(secondPlayer).getByLabelText('progress')).toHaveValue('0');
	});

	it('has volume control', async () => {
		__loadMockPlayer({ volume: 0.7 });

		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		await screen.findAllByLabelText('pause');

		const control = screen.getByLabelText('Volume');

		await waitFor(() => {
			expect(control).toHaveValue('70');
		});
	});

	it('sets volume', async () => {
		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		await screen.findAllByLabelText('pause');

		await updateVolume();

		await waitFor(() => expect(__mockPlayer.volume).toBeCalledWith(0.7));
	});

	it('does not show miniplayer if no recording loaded', async () => {
		await renderComponent();

		expect(screen.queryByLabelText('Volume')).not.toBeInTheDocument();
	});

	it('displays portal target when video is loaded', async () => {
		await renderComponent({
			props: {
				recording: {
					...recording,
					title: 'the_sermon_title',
					canonicalPath: 'the_sermon_path',
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

		userEvent.click(screen.getByAltText('the_sermon_title'));

		await screen.findAllByLabelText('pause');

		expect(screen.getByTestId('portal')).toBeInTheDocument();
	});

	it('plays video through portal', async () => {
		__loadMockPlayer();

		await renderComponent({
			props: {
				recording: {
					...recording,
					title: 'the_sermon_title',
					canonicalPath: 'the_sermon_path',
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

		userEvent.click(screen.getByAltText('the_sermon_title'));

		const portal = screen.getByTestId('portal');

		await expect(
			within(portal).findByTestId('video-element')
		).resolves.toBeInTheDocument();
	});

	it('displays progress bar in miniplayer', async () => {
		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		await screen.findAllByLabelText('pause');

		const miniplayer = screen.getByLabelText('miniplayer');

		expect(within(miniplayer).getByLabelText('progress')).toBeInTheDocument();
	});

	it('sets miniplayer progress value', async () => {
		__loadMockPlayer({ duration: 100 });

		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		const miniplayer = screen.getByLabelText('miniplayer');
		await within(miniplayer).findByLabelText('pause');

		__mockPlayer.currentTime(25);

		await simulateMediaTick();

		await waitFor(() => {
			expect(within(miniplayer).getByLabelText('progress')).toHaveValue('25');
		});
	});

	it('accepts progress change from miniplayer progress bar', async () => {
		__loadMockPlayer({ time: 25, duration: 100 });

		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		const miniplayer = screen.getByLabelText('miniplayer');

		await within(miniplayer).findByLabelText('pause');

		await updateProgress(70);

		expect(__mockPlayer.currentTime).toBeCalledWith(70);
	});

	it('displays series in miniplayer', async () => {
		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		await screen.findAllByLabelText('pause');

		const miniplayer = screen.getByLabelText('miniplayer');

		expect(
			within(miniplayer).getByText('the_sequence_title')
		).toBeInTheDocument();
	});

	it('does not attempt series display if no series', async () => {
		await renderComponent({
			props: {
				recording: {
					...recording,
					sequence: null,
					id: 'the_sermon_id',
					title: 'the_sermon_title',
					canonicalPath: 'the_sermon_path',
					audioFiles: [
						{
							url: 'the_source_src',
							mimeType: 'the_source_type',
							filesize: 'the_source_size',
						},
					],
				},
			},
		});

		userEvent.click(screen.getByLabelText('play'));

		await screen.findAllByLabelText('pause');

		const miniplayer = screen.getByLabelText('miniplayer');

		expect(
			within(miniplayer).queryByLabelText('series')
		).not.toBeInTheDocument();
	});

	it('has pause button in miniplayer', async () => {
		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		const miniplayer = screen.getByLabelText('miniplayer');

		expect(
			await within(miniplayer).findByLabelText('pause')
		).toBeInTheDocument();
	});

	it('has play button in miniplayer', async () => {
		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		const miniplayer = screen.getByLabelText('miniplayer');

		userEvent.click(await within(miniplayer).findByLabelText('pause'));

		expect(within(miniplayer).getByLabelText('play')).toBeInTheDocument();
	});

	it('toggles between miniplayer play and pause buttons', async () => {
		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		const miniplayer = screen.getByLabelText('miniplayer');

		await within(miniplayer).findByLabelText('pause');

		expect(within(miniplayer).queryByLabelText('play')).not.toBeInTheDocument();
	});

	it('has nudge back button', async () => {
		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		await screen.findAllByLabelText('pause');

		const miniplayer = screen.getByLabelText('miniplayer');

		expect(
			within(miniplayer).getByLabelText('back 15 seconds')
		).toBeInTheDocument();
	});

	it('has nudge forward button', async () => {
		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		await screen.findAllByLabelText('pause');

		const miniplayer = screen.getByLabelText('miniplayer');

		expect(
			within(miniplayer).getByLabelText('forward 15 seconds')
		).toBeInTheDocument();
	});

	it('has speed button', async () => {
		await renderComponent();

		expect(screen.getByText('1x')).toBeInTheDocument();
	});

	it('switches labels', async () => {
		await renderComponent();

		userEvent.click(screen.getByText('1x'));

		await screen.findByText('1.25x');

		userEvent.click(screen.getByText('1.25x'));

		await screen.findByText('1.5x');

		userEvent.click(screen.getByText('1.5x'));

		await screen.findByText('1.75x');

		userEvent.click(screen.getByText('1.75x'));

		await screen.findByText('2x');

		userEvent.click(screen.getByText('2x'));

		await expect(screen.findByText('1x')).resolves.toBeInTheDocument();
	});

	it('changes speed', async () => {
		__loadMockPlayer();

		await renderComponent();

		userEvent.click(screen.getByText('1x'));

		await waitFor(() => {
			expect(__mockPlayer.on).toBeCalled();
		});

		await waitFor(() => {
			expect(__mockPlayer.playbackRate).toBeCalledWith(1.25);
		});
	});

	it('has download icon', async () => {
		await renderComponent();

		expect(screen.getByLabelText('downloads')).toBeInTheDocument();
	});

	it('has share button', async () => {
		await renderComponent();

		expect(screen.getByLabelText('share')).toBeInTheDocument();
	});

	it('has favorite button', async () => {
		await renderComponent();

		expect(screen.getByLabelText('share')).toBeInTheDocument();
	});

	it('shows progress when video shown', async () => {
		await renderComponent({
			props: {
				recording: {
					...recording,
					title: 'the_sermon_title',
					canonicalPath: 'the_sermon_path',
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

		userEvent.click(screen.getByAltText('the_sermon_title'));

		const player = screen.getByLabelText('player');

		await waitFor(() => {
			expect(within(player).getByLabelText('progress')).toBeInTheDocument();
		});
	});

	it('shows progress when video not loaded yet', async () => {
		await renderComponent({
			props: {
				recording: {
					...recording,
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

		const player = screen.getByLabelText('player');

		expect(within(player).getByLabelText('progress')).toBeInTheDocument();
	});

	it('includes recording duration', async () => {
		await renderComponent({
			props: {
				recording: {
					...recording,
					title: 'the_sermon_title',
					canonicalPath: 'the_sermon_path',
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

		userEvent.click(screen.getByAltText('the_sermon_title'));

		await screen.findAllByLabelText('pause');

		const player = screen.getByLabelText('player');

		await waitFor(() => {
			expect(within(player).getByText('1:40')).toBeInTheDocument();
		});
	});

	it('defaults to api duration if recording not loaded', async () => {
		__loadMockPlayer({
			player: null,
		});

		await renderComponent({
			props: {
				recording: {
					...recording,
					duration: 60,
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

		await expect(screen.findByText('1:00')).resolves.toBeInTheDocument();
	});

	it('has fullscreen button', async () => {
		await renderComponent({
			props: {
				recording: {
					...recording,
					duration: 60,
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

		expect(screen.getByLabelText('fullscreen')).toBeInTheDocument();
	});

	it('launches fullscreen when button clicked', async () => {
		__loadMockPlayer();

		await renderComponent({
			props: {
				recording: {
					...recording,
					canonicalPath: 'the_sermon_path',
					duration: 60,
					speakers: [],
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

		userEvent.click(screen.getByLabelText('fullscreen'));

		await waitFor(() => {
			expect(__mockPlayer.requestFullscreen).toBeCalled();
		});
	});

	it('enables controls when launch fullscreen', async () => {
		__loadMockPlayer({ isFullscreen: true });

		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		await waitFor(() => expect(videojs).toBeCalled());

		__mockPlayer._fire('fullscreenchange');

		expect(__mockPlayer.controls).toBeCalledWith(true);
	});

	it('disables controls when user exits fullscreen', async () => {
		__loadMockPlayer({ isFullscreen: false });

		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		await waitFor(() => expect(videojs).toBeCalled());

		__mockPlayer._fire('fullscreenchange');

		expect(__mockPlayer.controls).toBeCalledWith(false);
	});

	it('displays current time', async () => {
		__loadMockPlayer({ time: 50 });

		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		await waitFor(() => {
			expect(screen.getAllByLabelText('pause')).not.toHaveLength(0);
		});

		__mockPlayer.currentTime(50);

		await simulateMediaTick();

		const player = screen.getByLabelText('player');

		await waitFor(() => {
			expect(within(player).getByText('0:50')).toBeInTheDocument();
		});
	});

	it('displays zero time if recording not loaded', async () => {
		await renderComponent();

		await waitFor(() => {
			expect(screen.getByText('0:00')).toBeInTheDocument();
		});
	});

	it('displays times for videos', async () => {
		await renderComponent({
			props: {
				recording: {
					...recording,
					duration: 60,
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

		expect(screen.getByText('0:00')).toBeInTheDocument();
	});

	it('does not show fullscreen button for audio', async () => {
		await renderComponent();

		expect(screen.queryByLabelText('fullscreen')).not.toBeInTheDocument();
	});

	it('handles initial zero duration', async () => {
		__loadMockPlayer({ time: 0, duration: 0 });

		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		await waitFor(() => expect(videojs).toBeCalled());

		await simulateMediaTick();

		await waitFor(() =>
			expect(screen.getAllByLabelText('progress')[0]).toHaveValue('0')
		);
	});

	it('has working volume down button', async () => {
		const playerMock = __loadMockPlayer();

		await renderComponent();

		userEvent.click(screen.getByLabelText('play'));

		await within(screen.getByLabelText('player')).findByLabelText('pause');

		await waitFor(() => {
			expect(screen.getByLabelText('Volume')).toHaveValue('50');
		});

		userEvent.click(screen.getByLabelText('Reduce volume'));

		await waitFor(() => expect(playerMock.volume).toBeCalledWith(0.4));
	});

	it('has working volume up button', async () => {
		const playerMock = __loadMockPlayer();

		await renderComponent();

		userEvent.click(await screen.findByLabelText('play'));

		const player = screen.getByLabelText('player');
		await within(player).findByLabelText('pause');

		await waitFor(() => {
			expect(screen.getByLabelText('Volume')).toHaveValue('50');
		});

		userEvent.click(screen.getByLabelText('Increase volume'));

		await waitFor(() => expect(playerMock.volume).toBeCalledWith(0.6));
	});

	it('displays current time in miniplayer', async () => {
		__loadMockPlayer({ time: 50 });

		await renderComponent();

		userEvent.click(await screen.findByLabelText('play'));

		await waitFor(() => {
			expect(screen.getAllByLabelText('pause')).not.toHaveLength(0);
		});

		__mockPlayer.currentTime(50);

		await simulateMediaTick();

		const miniplayer = screen.getByLabelText('miniplayer');

		await within(miniplayer).findByText('0:50');
	});

	it('displays duration in miniplayer', async () => {
		__loadMockPlayer({ duration: 120 });

		await renderComponent({
			props: {
				recording: {
					...recording,
					canonicalPath: 'the_sermon_path',
					duration: 120,
				},
			},
		});

		userEvent.click(await screen.findByLabelText('play'));

		const miniplayer = await screen.findByLabelText('miniplayer');

		await expect(
			within(miniplayer).findByText('2:00')
		).resolves.toBeInTheDocument();
	});

	it('unloads volume handler', async () => {
		const { unmount } = await renderComponent();

		userEvent.click(await screen.findByLabelText('play'));

		await waitFor(() => {
			expect(screen.getAllByLabelText('pause')).not.toHaveLength(0);
		});

		unmount();

		await waitFor(() => {
			expect(__mockPlayer.off).toBeCalledWith(
				'volumechange',
				expect.any(Function)
			);
		});
	});
});

// TODO:
// displays duration in miniplayer
// enables and disables player controls when entering and exiting fullscreen
// gets initial speed from player if isloaded
// Display progress bar in mini player
// Display sequence title in mini player
// Display playback controls in mini player
// Style volume controls
// Speed control button toggles between 1, 1.5, 1.75, 2x speeds
// sets isPaused to true when recording reaches end

// punt:
// Replaces play/pause with loading indicator when player in loading state
