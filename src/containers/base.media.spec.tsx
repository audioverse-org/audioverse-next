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

import { RecordingFragment } from '~components/organisms/__generated__/recording';
import { Recording } from '~components/organisms/recording';
import setPlayerMock from '~lib/test/setPlayerMock';
import MyApp from '~pages/_app';
import {
	RecordingContentType,
	SequenceContentType,
} from '~src/__generated__/graphql';

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
	container: any = undefined,
) => {
	__loadRouter({
		pathname: '/[language]/discover',
		query: {},
		asPath: '',
	});

	const result = render(
		<MyApp
			Component={Page as any}
			pageProps={{ includePlayer, recording } as any}
		/>,
		{ container },
	);

	return {
		...result,
		getMiniplayer: () => result.getByLabelText('miniplayer'),
		getPlayer: () => result.getByLabelText('player'),
		expectVideoLocation: (location: HTMLElement) =>
			expect(getByTestId(location, 'video-element')).toBeInTheDocument(),
		rerender: (includePlayer: boolean) => {
			return renderApp(includePlayer, recording, result.container);
		},
	};
};

describe('app media playback', () => {
	beforeEach(() => setPlayerMock());

	it('moves video to and from miniplayer', async () => {
		const result = await renderApp(true, recordingVideo);

		await userEvent.click(result.getByAltText('the_sermon_title'));

		await waitFor(() => result.expectVideoLocation(result.getPlayer()));

		await result.rerender(false);

		await waitFor(() => {
			result.expectVideoLocation(result.getMiniplayer());
		});

		await result.rerender(true);

		await waitFor(() => result.expectVideoLocation(result.getPlayer()));

		await userEvent.click(screen.getByLabelText('pause'));

		await screen.findByLabelText('play');
	});

	it('hides controls when video in miniplayer', async () => {
		const { rerender } = await renderApp(true, recordingVideo);

		await userEvent.click(screen.getByAltText('the_sermon_title'));

		const miniplayer = await screen.findByLabelText('miniplayer');

		await rerender(false);

		await findByLabelText(miniplayer, 'pause');

		const controls = getByLabelText(miniplayer, 'pause').parentElement;

		expect(controls).toHaveClass('hidden');
	});

	it('shows controls when video not in miniplayer', async () => {
		const result = await renderApp(true, recordingVideo);

		await userEvent.click(result.getByAltText('the_sermon_title'));

		const miniplayer = await result.findByLabelText('miniplayer');

		await waitFor(() => {
			expect(getByLabelText(miniplayer, 'pause')).toBeInTheDocument();
		});

		const controls = getByLabelText(miniplayer, 'pause').parentElement;

		expect(controls).not.toHaveClass('hidden');
	});

	it('shows controls when not playing video', async () => {
		await renderApp(true, recordingAudio);

		await userEvent.click(screen.getByLabelText('play'));

		const miniplayer = await screen.findByLabelText('miniplayer');

		await findByLabelText(miniplayer, 'pause');

		const controls = getByLabelText(miniplayer, 'pause').parentElement;

		expect(controls).not.toHaveClass('hidden');
	});

	it('handles pause event', async () => {
		await renderApp(true, recordingVideo);

		await userEvent.click(screen.getByAltText('the_sermon_title'));

		const miniplayer = await screen.findByLabelText('miniplayer');

		await findByLabelText(miniplayer, 'pause');

		const portal = screen.getByTestId('portal');
		const video = await findByTestId(portal, 'video-element');

		await act(async () => {
			ReactTestUtils.Simulate.pause(video, {} as any);
		});

		await findByLabelText(miniplayer, 'play');
	});

	it('handles play event', async () => {
		await renderApp(true, recordingVideo);

		await userEvent.click(screen.getByAltText('the_sermon_title'));

		const miniplayer = await screen.findByLabelText('miniplayer');

		await findByLabelText(miniplayer, 'pause');

		await userEvent.click(getByLabelText(miniplayer, 'pause'));

		await findByLabelText(miniplayer, 'play');

		const portal = screen.getByTestId('portal');

		await waitFor(() => {
			expect(getByTestId(portal, 'video-element')).toBeInTheDocument();
		});

		const video = getByTestId(portal, 'video-element');

		await act(async () => {
			ReactTestUtils.Simulate.play(video, {} as any);
		});

		await findByLabelText(miniplayer, 'pause');
	});

	it('moves player out of miniplayer when not showing video', async () => {
		const result = await renderApp(true, recordingAudioVideo);

		await waitFor(() => {
			expect(result.getByText('Audio')).toBeInTheDocument();
		});

		await userEvent.click(result.getByText('Audio'));

		await waitFor(() => {
			expect(videojs).toBeCalled();
		});

		const miniplayer = result.getByLabelText('miniplayer');

		await findByLabelText(miniplayer, 'play');

		expect(queryByTestId(miniplayer, 'video-element')).not.toBeInTheDocument();
	});

	it('never shows video in miniplayer when still on detail page', async () => {
		const result = await renderApp(true, recordingAudioVideo);

		await waitFor(() => {
			expect(result.getByText('Audio')).toBeInTheDocument();
		});

		await userEvent.click(result.getByText('Audio'));

		const player = result.getByLabelText('player');

		await waitFor(() => {
			expect(getByLabelText(player, 'play')).toBeInTheDocument();
		});

		await userEvent.click(result.getByText('Video'));

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

		await userEvent.click(result.getByText('Audio'));

		await waitFor(() => {
			expect(videojs).toBeCalled();
		});

		const miniplayer = result.getByLabelText('miniplayer');
		const pane = miniplayer.querySelector('#mini-player');

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

		await userEvent.click(result.getByText('Audio'));

		await waitFor(() => {
			expect(videojs).toBeCalled();
		});

		expect(videojs).not.toBeCalledWith(
			expect.anything(),
			expect.objectContaining({
				sources: [{ src: 'video_source_src' }],
			}),
		);
	});
});
