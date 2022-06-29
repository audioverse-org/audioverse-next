import {
	act,
	findByLabelText,
	findByTestId,
	getByLabelText,
	getByTestId,
	queryByTestId,
	render,
	screen,
	waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { __loadRouter } from 'next/router';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import videojs from 'video.js';

import { Recording } from '@components/organisms/recording';
import {
	RecordingContentType,
	RecordingFragment,
	SequenceContentType,
} from '@lib/generated/graphql';
import setPlayerMock from '@lib/test/setPlayerMock';
import MyApp from '@pages/_app';
import { __waitForIntlMessages } from '@lib/useIntlMessages';

jest.mock('@lib/useIntlMessages');
jest.mock('@components/molecules/loadingIndicator');
jest.mock('@components/molecules/helpWidget');
jest.mock('@components/molecules/recordingButtonFavorite');

const sequence = {
	id: 'the_sequence_id',
	contentType: SequenceContentType.Series,
	title: 'the_sequence_title',
	canonicalPath: 'the_sequence_path',
	recordings: {
		nodes: [],
		aggregate: {
			count: 0,
		},
	},
};

const recordingAudio: Partial<RecordingFragment> = {
	id: 'the_sermon_id',
	title: 'the_sermon_title',
	contentType: RecordingContentType.Sermon,
	canonicalPath: 'the_sermon_path',
	sequence,
	audioFiles: [
		{
			url: 'the_source_src',
			mimeType: 'the_source_type',
			filesize: 'the_source_size',
			duration: 1234,
		},
	],
	speakers: [],
	writers: [],
	attachments: [],
	imageWithFallback: { url: '' },
};

const recordingVideo: Partial<RecordingFragment> = {
	id: 'the_sermon_id',
	title: 'the_sermon_title',
	contentType: RecordingContentType.Sermon,
	canonicalPath: 'the_sermon_path',
	sequence,
	videoFiles: [
		{
			url: 'the_source_src',
			mimeType: 'the_source_type',
			filesize: 'the_source_size',
			duration: 1234,
		},
	],
	speakers: [],
	writers: [],
	attachments: [],
	imageWithFallback: { url: '' },
};

const recordingAudioVideo: Partial<RecordingFragment> = {
	id: 'the_sermon_id',
	title: 'the_sermon_title',
	contentType: RecordingContentType.Sermon,
	canonicalPath: 'the_sermon_path',
	sequence,
	videoFiles: [
		{
			url: 'video_source_src',
			mimeType: 'video_source_type',
			filesize: 'video_source_size',
			duration: 1234,
		},
	],
	audioFiles: [
		{
			url: 'audio_source_src',
			mimeType: 'audio_source_type',
			filesize: 'audio_source_size',
			duration: 1234,
		},
	],
	speakers: [],
	writers: [],
	attachments: [],
	imageWithFallback: { url: '' },
};

const Page = ({
	includePlayer,
	recording,
}: {
	includePlayer: boolean;
	recording: Partial<RecordingFragment>;
}) => (
	<div>
		{includePlayer && <Recording recording={recording as RecordingFragment} />}
	</div>
);

const renderApp = async (
	includePlayer: boolean,
	recording: Partial<RecordingFragment>,
	container: any = undefined
) => {
	__loadRouter({
		pathname: '/[language]/discover',
		query: {},
		asPath: '',
	});

	const view = await render(
		<MyApp
			Component={Page as any}
			pageProps={{ includePlayer, recording } as any}
		/>,
		{ container }
	);

	await __waitForIntlMessages();

	return {
		...view,
		getMiniplayer: () => view.getByLabelText('miniplayer'),
		getPlayer: () => view.getByLabelText('player'),
		rerender: (includePlayer: boolean) => {
			return renderApp(includePlayer, recording, view.container);
		},
	};
};

const isVideoInContainer = (container: HTMLElement) => {
	return !!getByTestId(container, 'video-element');
};

const findControls = async () => {
	const miniplayer = await screen.findByLabelText('miniplayer');
	const pauseButton = await findByLabelText(miniplayer, 'pause');

	// WORKAROUND: https://stackoverflow.com/a/52827299/937377
	// Since we can't check the visibility of the pause button directly,
	// we need to manually traverse the DOM to get the element that has the
	// 'hidden' class.
	// eslint-disable-next-line testing-library/no-node-access
	return pauseButton.parentElement;
};

describe('app media playback', () => {
	beforeEach(() => setPlayerMock());

	it('moves video to and from miniplayer', async () => {
		const result = await renderApp(true, recordingVideo);

		userEvent.click(result.getByAltText('the_sermon_title'));

		await waitFor(() =>
			expect(isVideoInContainer(result.getPlayer())).toBe(true)
		);

		await result.rerender(false);

		await waitFor(() => {
			expect(isVideoInContainer(result.getMiniplayer())).toBe(true);
		});

		await result.rerender(true);

		await waitFor(() =>
			expect(isVideoInContainer(result.getPlayer())).toBe(true)
		);
	});

	it('hides controls when video in miniplayer', async () => {
		const result = await renderApp(true, recordingVideo);

		userEvent.click(result.getByAltText('the_sermon_title'));

		await __waitForIntlMessages();

		await result.rerender(false);

		expect(await findControls()).toHaveClass('hidden');
	});

	it('shows controls when video not in miniplayer', async () => {
		const result = await renderApp(true, recordingVideo);

		userEvent.click(result.getByAltText('the_sermon_title'));

		expect(await findControls()).not.toHaveClass('hidden');
	});

	it('shows controls when not playing video', async () => {
		const result = await renderApp(true, recordingAudio);

		userEvent.click(result.getByLabelText('play'));

		expect(await findControls()).not.toHaveClass('hidden');
	});

	it('handles pause event', async () => {
		const result = await renderApp(true, recordingVideo);

		userEvent.click(result.getByAltText('the_sermon_title'));

		const miniplayer = result.getByLabelText('miniplayer');

		await findByLabelText(miniplayer, 'pause');

		const portal = result.getByTestId('portal');

		await act(async () => {
			ReactTestUtils.Simulate.pause(
				await findByTestId(portal, 'video-element'),
				{} as any
			);
		});

		await expect(
			findByLabelText(miniplayer, 'play')
		).resolves.toBeInTheDocument();
	});

	it('handles play event', async () => {
		const result = await renderApp(true, recordingVideo);

		userEvent.click(result.getByAltText('the_sermon_title'));

		const miniplayer = result.getByLabelText('miniplayer');

		await findByLabelText(miniplayer, 'pause');

		userEvent.click(getByLabelText(miniplayer, 'pause'));

		await findByLabelText(miniplayer, 'play');

		const portal = result.getByTestId('portal');

		await waitFor(() => {
			expect(getByTestId(portal, 'video-element')).toBeInTheDocument();
		});

		await act(async () => {
			ReactTestUtils.Simulate.play(
				getByTestId(portal, 'video-element'),
				{} as any
			);
		});

		await findByLabelText(miniplayer, 'pause');
	});

	it('moves player out of miniplayer when not showing video', async () => {
		const result = await renderApp(true, recordingAudioVideo);

		await waitFor(() => {
			expect(result.getByText('Audio')).toBeInTheDocument();
		});

		userEvent.click(result.getByText('Audio'));

		const miniplayer = result.getByLabelText('miniplayer');

		await findByLabelText(miniplayer, 'play');

		expect(queryByTestId(miniplayer, 'video-element')).not.toBeInTheDocument();
	});

	it('never shows video in miniplayer when still on detail page', async () => {
		const result = await renderApp(true, recordingAudioVideo);

		await waitFor(() => {
			expect(result.getByText('Audio')).toBeInTheDocument();
		});

		userEvent.click(result.getByText('Audio'));

		const player = result.getByLabelText('player');

		await waitFor(() => {
			expect(getByLabelText(player, 'play')).toBeInTheDocument();
		});

		userEvent.click(result.getByText('Video'));

		const miniplayer = result.getByLabelText('miniplayer');

		// expect video-element to never appear in miniplayer
		await expect(async () => {
			await waitFor(() => {
				expect(getByTestId(miniplayer, 'video-element')).toBeInTheDocument();
			});
		}).rejects.toEqual(expect.anything());
	});

	it('never shows video in miniplayer when loading recording by audio select', async () => {
		const result = await renderApp(true, recordingAudioVideo);

		await waitFor(() => {
			expect(result.getByText('Audio')).toBeInTheDocument();
		});

		userEvent.click(result.getByText('Audio'));

		const pane = screen.getByTestId('miniplayerPortal');

		if (!pane) throw new Error('unable to find pane');

		pane.appendChild = jest.fn();

		const player = result.getByLabelText('player');

		await findByLabelText(player, 'play');

		expect(pane.appendChild).not.toHaveBeenCalled();
	});

	it('does not load video when audio selected for recording with video', async () => {
		const result = await renderApp(true, recordingAudioVideo);

		await waitFor(() => {
			expect(result.getByText('Audio')).toBeInTheDocument();
		});

		userEvent.click(result.getByText('Audio'));

		expect(videojs).not.toBeCalledWith(
			expect.anything(),
			expect.objectContaining({
				sources: [{ src: 'video_source_src' }],
			})
		);

		await waitFor(() => {
			expect(videojs).toBeCalled();
		});
	});
});
