import {
	act,
	findByLabelText,
	findByTestId,
	getByLabelText,
	getByText,
	queryByLabelText,
	waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import videojs from 'video.js';

import Player, { PlayerProps } from '@components/molecules/player';
import AndMiniplayer from '@components/templates/andMiniplayer';
import AndPlaybackContext from '@components/templates/andPlaybackContext';
import * as api from '@lib/api';
import { BaseColors } from '@lib/constants';
import { PlayerFragment, SequenceContentType } from '@lib/generated/graphql';
import {
	buildRenderer,
	loadRouter,
	mockVideojs,
	renderWithIntl,
	setPlayerMock,
} from '@lib/test/helpers';

jest.mock('video.js');
jest.mock('@lib/api/recordingIsFavorited');

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

const renderComponent = buildRenderer(
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

describe('player', () => {
	beforeEach(() => {
		setPlayerMock();
		loadRouter({});
		jest.spyOn(api, 'recordingIsFavorited').mockResolvedValue(false);
	});

	it('has button', async () => {
		const { getByLabelText } = await renderComponent();

		expect(getByLabelText('play')).toBeInTheDocument();
	});

	it('plays when clicked', async () => {
		const mockPlayer = setPlayerMock();

		await act(async () => {
			const { getByLabelText } = await renderComponent();

			userEvent.click(getByLabelText('play'));
		});

		// to be called with nothing
		expect(mockPlayer.play).toBeCalledWith();
	});

	it('toggles play/pause buttons', async () => {
		await act(async () => {
			const result = await renderComponent();

			const player = result.getByLabelText('player');

			userEvent.click(getByLabelText(player, 'play'));

			expect(await findByLabelText(player, 'pause')).toBeInTheDocument();
		});
	});

	it('toggles back to play button', async () => {
		await act(async () => {
			const result = await renderComponent();

			const player = result.getByLabelText('player');

			userEvent.click(getByLabelText(player, 'play'));
			await findByLabelText(player, 'pause');

			userEvent.click(getByLabelText(player, 'pause'));

			expect(await findByLabelText(player, 'play')).toBeInTheDocument();
		});
	});

	it('sets current time', async () => {
		const mockPlayer = setPlayerMock({
			duration: 1234,
		});

		const { getByLabelText } = await renderComponent();

		const input = getByLabelText('progress');

		ReactTestUtils.Simulate.input(input, {
			target: {
				value: 50,
			},
		} as any);

		await waitFor(() => expect(mockPlayer.currentTime).toBeCalledWith(617));
	});

	it('treats range output as percentage', async () => {
		const mockPlayer = setPlayerMock({ duration: 300 });

		const { getByLabelText } = await renderComponent({
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

		ReactTestUtils.Simulate.input(getByLabelText('progress'), {
			target: {
				value: 50,
			},
		} as any);

		await waitFor(() => expect(mockPlayer.currentTime).toBeCalledWith(150));
	});

	it('updates scrubber on time update', async () => {
		const player = setPlayerMock({ duration: 300 });

		const { getByTestId, getByLabelText, getAllByLabelText } =
			await renderComponent();

		userEvent.click(getByLabelText('play'));

		await waitFor(() => expect(videojs).toBeCalled());

		player.currentTime(75);

		ReactTestUtils.Simulate.timeUpdate(getByTestId('video-element'), {} as any);

		await waitFor(() =>
			expect(getAllByLabelText('progress')[0]).toHaveValue('25')
		);
	});

	it('updates progress on scrub', async () => {
		setPlayerMock({ duration: 300 });

		const { getByLabelText } = await renderComponent();

		const input = getByLabelText('progress');

		ReactTestUtils.Simulate.input(input, {
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
		const mockPlayer = setPlayerMock();

		await act(async () => {
			const result = await renderComponent();

			userEvent.click(result.getByLabelText('play'));

			const player = result.getByLabelText('player');
			await findByLabelText(player, 'pause');

			mockPlayer.currentTime(50);

			ReactTestUtils.Simulate.timeUpdate(
				result.getByTestId('video-element'),
				{} as any
			);

			userEvent.click(getByLabelText(player, 'back 15 seconds'));

			expect(mockPlayer.currentTime).toBeCalledWith(35);
		});
	});

	it('nudges forward 15 seconds', async () => {
		const mockPlayer = setPlayerMock();

		await act(async () => {
			const result = await renderComponent();

			userEvent.click(result.getByLabelText('play'));

			const player = result.getByLabelText('player');
			await findByLabelText(player, 'pause');

			mockPlayer.currentTime(50);

			ReactTestUtils.Simulate.timeUpdate(
				result.getByTestId('video-element'),
				{} as any
			);

			userEvent.click(getByLabelText(player, 'forward 15 seconds'));

			await waitFor(() => {
				expect(mockPlayer.currentTime).toBeCalledWith(65);
			});
		});
	});

	it('does not load recording if UI not clicked', async () => {
		await renderComponent();

		expect(videojs).not.toBeCalled();
	});

	it('handles scrubber update after initial recording load', async () => {
		const mockPlayer = setPlayerMock({ duration: 300 });

		const { getByLabelText, getAllByLabelText } = await renderComponent();

		userEvent.click(getByLabelText('play'));

		await waitFor(() => expect(videojs).toBeCalled());

		ReactTestUtils.Simulate.input(getAllByLabelText('progress')[0], {
			target: {
				value: 50,
			},
		} as any);

		await waitFor(() => expect(mockPlayer.currentTime).toBeCalledWith(150));
	});

	it('plays video on poster click', async () => {
		const mockPlayer = setPlayerMock();

		await act(async () => {
			const { getByAltText } = await renderComponent({
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

			const poster = getByAltText('the_sermon_title') as HTMLElement;

			userEvent.click(poster.parentElement as HTMLElement);

			await waitFor(() => expect(mockPlayer.play).toBeCalled());
		});
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

		const result = await renderComponent({
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

		ReactTestUtils.Simulate.input(result.getByLabelText('progress'), {
			target: {
				value: 50,
			},
		} as any);

		await waitFor(() => expect(videojs).toBeCalled());

		const player = result.getByLabelText('player');
		userEvent.click(getByLabelText(player, 'play'));

		await waitFor(() => expect(mockPlayer.currentTime).toBeCalledWith(150));
	});

	it('overloads different recording', async () => {
		const mockPlayer = setPlayerMock();

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

		const { getByTestId } = await renderWithIntl(
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
			</AndPlaybackContext>
		);

		const firstPlayer = getByTestId('first_sermon_id');
		const secondPlayer = getByTestId('second_sermon_id');

		userEvent.click(getByLabelText(firstPlayer, 'play'));

		await waitFor(() => expect(videojs).toBeCalled());

		userEvent.click(getByLabelText(secondPlayer, 'play'));

		await waitFor(() =>
			expect(mockPlayer.src).toBeCalledWith([
				{
					duration: 2345,
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

		const poster = getByAltText('the_sermon_title') as HTMLElement;

		userEvent.click(poster.parentElement as HTMLElement);

		expect(queryByAltText('the_sermon_title')).not.toBeInTheDocument();
	});

	it('does not show audio controls when video playing', async () => {
		const { getByAltText, getByLabelText } = await renderComponent({
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

		const poster = getByAltText('the_sermon_title') as HTMLElement;

		userEvent.click(poster.parentElement as HTMLElement);

		await waitFor(() => expect(videojs).toBeCalled());

		const player = getByLabelText('player');

		expect(queryByLabelText(player, 'pause')).not.toBeInTheDocument();
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

		const { getByTestId } = await renderWithIntl(
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
			</AndPlaybackContext>
		);

		const firstPlayer = getByTestId('first_sermon_id');
		const secondPlayer = getByTestId('second_sermon_id');

		userEvent.click(getByLabelText(firstPlayer, 'play'));

		await waitFor(() => expect(videojs).toBeCalled());

		ReactTestUtils.Simulate.input(getByLabelText(firstPlayer, 'progress'), {
			target: {
				value: 50,
			},
		} as any);

		expect(getByLabelText(secondPlayer, 'progress')).toHaveValue('0');
	});

	it('has volume control', async () => {
		setPlayerMock({ volume: 0.7 });

		await act(async () => {
			const { getByLabelText, findAllByLabelText } = await renderComponent();

			userEvent.click(getByLabelText('play'));

			await findAllByLabelText('pause');

			const control = getByLabelText('Volume');
			expect(control).toHaveValue('70');
		});
	});

	it('sets volume', async () => {
		const playerMock = setPlayerMock();

		await act(async () => {
			const { getByLabelText, findAllByLabelText } = await renderComponent();

			userEvent.click(getByLabelText('play'));

			await findAllByLabelText('pause');

			const control = getByLabelText('Volume');

			ReactTestUtils.Simulate.change(control, {
				target: {
					value: 70,
				},
			} as any);

			await waitFor(() => expect(playerMock.volume).toBeCalledWith(0.7));
		});
	});

	it('does not show miniplayer if no recording loaded', async () => {
		const { queryByLabelText } = await renderComponent();

		expect(queryByLabelText('Volume')).not.toBeInTheDocument();
	});

	it('displays portal target when video is loaded', async () => {
		const { getByAltText, getByTestId } = await renderComponent({
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

		const poster = getByAltText('the_sermon_title') as HTMLElement;

		userEvent.click(poster.parentElement as HTMLElement);

		expect(getByTestId('portal')).toBeInTheDocument();
	});

	it('plays video through portal', async () => {
		setPlayerMock();

		const result = await renderComponent({
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

		const poster = result.getByAltText('the_sermon_title') as HTMLElement;

		userEvent.click(poster.parentElement as HTMLElement);

		const portal = result.getByTestId('portal');

		await findByTestId(portal, 'video-element');
	});

	it('displays progress bar in miniplayer', async () => {
		const result = await renderComponent();

		userEvent.click(result.getByLabelText('play'));

		const miniplayer = result.getByLabelText('miniplayer');

		expect(getByLabelText(miniplayer, 'progress')).toBeInTheDocument();
	});

	it('sets miniplayer progress value', async () => {
		const mockPlayer = setPlayerMock({ duration: 100 });

		await act(async () => {
			const result = await renderComponent();

			userEvent.click(result.getByLabelText('play'));

			const miniplayer = result.getByLabelText('miniplayer');
			await findByLabelText(miniplayer, 'pause');

			mockPlayer.currentTime(25);

			ReactTestUtils.Simulate.timeUpdate(
				result.getByTestId('video-element'),
				{} as any
			);

			await waitFor(() => {
				expect(getByLabelText(miniplayer, 'progress')).toHaveValue('25');
			});
		});
	});

	it('accepts progress change from miniplayer progress bar', async () => {
		const mockPlayer = setPlayerMock({ time: 25, duration: 100 });

		await act(async () => {
			const result = await renderComponent();

			userEvent.click(result.getByLabelText('play'));

			const miniplayer = result.getByLabelText('miniplayer');
			const progressInput = getByLabelText(miniplayer, 'progress');

			await findByLabelText(miniplayer, 'pause');

			ReactTestUtils.Simulate.input(progressInput, {
				target: {
					value: 70,
				},
			} as any);

			expect(mockPlayer.currentTime).toBeCalledWith(70);
		});
	});

	it('displays series in miniplayer', async () => {
		const result = await renderComponent();

		userEvent.click(result.getByLabelText('play'));

		const miniplayer = result.getByLabelText('miniplayer');

		expect(getByText(miniplayer, 'the_sequence_title')).toBeInTheDocument();
	});

	it('does not attempt series display if no series', async () => {
		const result = await renderComponent({
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

		userEvent.click(result.getByLabelText('play'));

		const miniplayer = result.getByLabelText('miniplayer');

		expect(queryByLabelText(miniplayer, 'series')).not.toBeInTheDocument();
	});

	it('has pause button in miniplayer', async () => {
		await act(async () => {
			const result = await renderComponent();

			userEvent.click(result.getByLabelText('play'));

			const miniplayer = result.getByLabelText('miniplayer');

			expect(await findByLabelText(miniplayer, 'pause')).toBeInTheDocument();
		});
	});

	it('has play button in miniplayer', async () => {
		await act(async () => {
			const result = await renderComponent();

			userEvent.click(result.getByLabelText('play'));

			const miniplayer = result.getByLabelText('miniplayer');

			userEvent.click(await findByLabelText(miniplayer, 'pause'));

			expect(getByLabelText(miniplayer, 'play')).toBeInTheDocument();
		});
	});

	it('toggles between miniplayer play and pause buttons', async () => {
		await act(async () => {
			const result = await renderComponent();

			userEvent.click(result.getByLabelText('play'));

			const miniplayer = result.getByLabelText('miniplayer');

			await findByLabelText(miniplayer, 'pause');

			expect(queryByLabelText(miniplayer, 'play')).not.toBeInTheDocument();
		});
	});

	it('has nudge back button', async () => {
		const result = await renderComponent();

		userEvent.click(result.getByLabelText('play'));

		const miniplayer = result.getByLabelText('miniplayer');

		expect(getByLabelText(miniplayer, 'back 15 seconds')).toBeInTheDocument();
	});

	it('has nudge forward button', async () => {
		const result = await renderComponent();

		userEvent.click(result.getByLabelText('play'));

		const miniplayer = result.getByLabelText('miniplayer');

		expect(
			getByLabelText(miniplayer, 'forward 15 seconds')
		).toBeInTheDocument();
	});

	it('has speed button', async () => {
		const { getByText } = await renderComponent();

		expect(getByText('1x')).toBeInTheDocument();
	});

	it('switches labels', async () => {
		const { getByText, findByText } = await renderComponent();

		userEvent.click(getByText('1x'));

		await findByText('1.25x');

		userEvent.click(getByText('1.25x'));

		await findByText('1.5x');

		userEvent.click(getByText('1.5x'));

		await findByText('1.75x');

		userEvent.click(getByText('1.75x'));

		await findByText('2x');

		userEvent.click(getByText('2x'));

		await findByText('1x');
	});

	it('changes speed', async () => {
		const mockPlayer = setPlayerMock();

		await act(async () => {
			const { getByText } = await renderComponent();

			userEvent.click(getByText('1x'));
		});
		expect(mockPlayer.playbackRate).toBeCalledWith(1.25);
	});

	it('has download icon', async () => {
		const { getByLabelText } = await renderComponent();

		expect(getByLabelText('downloads')).toBeInTheDocument();
	});

	it('has share button', async () => {
		const { getByLabelText } = await renderComponent();

		expect(getByLabelText('share')).toBeInTheDocument();
	});

	it('has favorite button', async () => {
		const { getByLabelText } = await renderComponent();

		expect(getByLabelText('share')).toBeInTheDocument();
	});

	it('shows progress when video shown', async () => {
		const result = await renderComponent({
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

		const poster = result.getByAltText('the_sermon_title') as HTMLElement;

		userEvent.click(poster.parentElement as HTMLElement);

		const player = result.getByLabelText('player');

		await waitFor(() => {
			expect(getByLabelText(player, 'progress')).toBeInTheDocument();
		});
	});

	it('shows progress when video not loaded yet', async () => {
		const result = await renderComponent({
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

		const player = result.getByLabelText('player');

		expect(getByLabelText(player, 'progress')).toBeInTheDocument();
	});

	it('includes recording duration', async () => {
		const result = await renderComponent({
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

		const poster = result.getByAltText('the_sermon_title') as HTMLElement;

		userEvent.click(poster.parentElement as HTMLElement);

		const player = result.getByLabelText('player');

		await waitFor(() => {
			expect(getByText(player, '1:40')).toBeInTheDocument();
		});
	});

	it('defaults to api duration if recording not loaded', async () => {
		mockVideojs.mockReturnValue(null);

		const { findByText } = await renderComponent({
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

		await findByText('1:00');
	});

	it('has fullscreen button', async () => {
		const { getByLabelText } = await renderComponent({
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

		expect(getByLabelText('fullscreen')).toBeInTheDocument();
	});

	it('launches fullscreen when button clicked', async () => {
		const mockPlayer = setPlayerMock();

		await act(async () => {
			const { getByLabelText } = await renderComponent({
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

			userEvent.click(getByLabelText('fullscreen'));
		});

		expect(mockPlayer.requestFullscreen).toBeCalled();
	});

	it('enables controls when launch fullscreen', async () => {
		const mockPlayer = setPlayerMock({ isFullscreen: true });

		const { getByLabelText } = await renderComponent();

		userEvent.click(getByLabelText('play'));

		await waitFor(() => expect(videojs).toBeCalled());

		mockPlayer._fire('fullscreenchange');

		expect(mockPlayer.controls).toBeCalledWith(true);
	});

	it('disables controls when user exits fullscreen', async () => {
		const mockPlayer = setPlayerMock({ isFullscreen: false });

		const { getByLabelText } = await renderComponent();

		userEvent.click(getByLabelText('play'));

		await waitFor(() => expect(videojs).toBeCalled());

		mockPlayer._fire('fullscreenchange');

		expect(mockPlayer.controls).toBeCalledWith(false);
	});

	it('displays current time', async () => {
		const mockPlayer = setPlayerMock({ time: 50 });

		const result = await renderComponent();

		userEvent.click(result.getByLabelText('play'));

		await waitFor(() => {
			expect(result.getAllByLabelText('pause')).not.toHaveLength(0);
		});

		mockPlayer.currentTime(50);

		ReactTestUtils.Simulate.timeUpdate(
			result.getByTestId('video-element'),
			{} as any
		);

		const player = result.getByLabelText('player');

		await waitFor(() => {
			expect(getByText(player, '0:50')).toBeInTheDocument();
		});
	});

	it('displays zero time if recording not loaded', async () => {
		const { getByText } = await renderComponent();

		await waitFor(() => {
			expect(getByText('0:00')).toBeInTheDocument();
		});
	});

	it('displays times for videos', async () => {
		const { getByText } = await renderComponent({
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

		expect(getByText('0:00')).toBeInTheDocument();
	});

	it('does not show fullscreen button for audio', async () => {
		const { queryByLabelText } = await renderComponent();

		expect(queryByLabelText('fullscreen')).not.toBeInTheDocument();
	});

	it('handles initial zero duration', async () => {
		setPlayerMock({ time: 0, duration: 0 });

		const { getByTestId, getByLabelText, getAllByLabelText } =
			await renderComponent();

		userEvent.click(getByLabelText('play'));

		await waitFor(() => expect(videojs).toBeCalled());

		ReactTestUtils.Simulate.timeUpdate(getByTestId('video-element'), {} as any);

		await waitFor(() =>
			expect(getAllByLabelText('progress')[0]).toHaveValue('0')
		);
	});

	it('has working volume down button', async () => {
		const playerMock = setPlayerMock();

		await act(async () => {
			const { getByLabelText } = await renderComponent();

			userEvent.click(getByLabelText('play'));

			const player = getByLabelText('player');
			await findByLabelText(player, 'pause');

			userEvent.click(getByLabelText('Reduce volume'));
		});

		await waitFor(() => expect(playerMock.volume).toBeCalledWith(0.4));
	});

	it('has working volume up button', async () => {
		const playerMock = setPlayerMock();

		await act(async () => {
			const { getByLabelText } = await renderComponent();

			userEvent.click(getByLabelText('play'));

			const player = getByLabelText('player');
			await findByLabelText(player, 'pause');

			userEvent.click(getByLabelText('Increase volume'));

			await waitFor(() => expect(playerMock.volume).toBeCalledWith(0.6));
		});
	});

	it('displays current time in miniplayer', async () => {
		const mockPlayer = setPlayerMock({ time: 50 });

		const result = await renderComponent();

		userEvent.click(result.getByLabelText('play'));

		await waitFor(() => {
			expect(result.getAllByLabelText('pause')).not.toHaveLength(0);
		});

		mockPlayer.currentTime(50);

		ReactTestUtils.Simulate.timeUpdate(
			result.getByTestId('video-element'),
			{} as any
		);

		const miniplayer = result.getByLabelText('miniplayer');

		await waitFor(() => {
			expect(getByText(miniplayer, '0:50')).toBeInTheDocument();
		});
	});

	it('displays duration in miniplayer', async () => {
		setPlayerMock({ duration: 120 });

		const result = await renderComponent({
			props: {
				recording: {
					...recording,
					canonicalPath: 'the_sermon_path',
					duration: 120,
				},
			},
		});

		userEvent.click(result.getByLabelText('play'));

		const miniplayer = result.getByLabelText('miniplayer');

		await waitFor(() => {
			expect(getByText(miniplayer, '2:00')).toBeInTheDocument();
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
