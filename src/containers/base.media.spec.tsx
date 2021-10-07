import { findByLabelText, queryByTestId, waitFor } from '@testing-library/dom';
import {
	act,
	getByLabelText,
	getByTestId,
	render,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import videojs from 'video.js';

import { Recording } from '@components/organisms/recording';
// import AndMiniplayer from '@components/templates/andMiniplayer';
import {
	RecordingContentType,
	RecordingFragment,
	SequenceContentType,
} from '@lib/generated/graphql';
import { loadQuery, setPlayerMock } from '@lib/test/helpers';
import MyApp from '@pages/_app';

const sequence = {
	id: 'the_sequence_id',
	contentType: SequenceContentType.Series,
	title: 'the_sequence_title',
	canonicalPath: 'the_sequence_path',
	recordings: {
		nodes: [],
	},
};

const recordingAudio: Partial<RecordingFragment> = {
	id: 'the_sermon_id',
	title: 'the_sermon_title',
	contentType: RecordingContentType.Sermon,
	sequence,
	audioFiles: [
		{
			url: 'the_source_src',
			mimeType: 'the_source_type',
			filesize: 'the_source_size',
		},
	],
	speakers: [],
	attachments: [],
};

const recordingVideo: Partial<RecordingFragment> = {
	id: 'the_sermon_id',
	title: 'the_sermon_title',
	contentType: RecordingContentType.Sermon,
	sequence,
	videoFiles: [
		{
			url: 'the_source_src',
			mimeType: 'the_source_type',
			filesize: 'the_source_size',
		},
	],
	speakers: [],
	attachments: [],
};

const recordingAudioVideo: Partial<RecordingFragment> = {
	id: 'the_sermon_id',
	title: 'the_sermon_title',
	contentType: RecordingContentType.Sermon,
	sequence,
	videoFiles: [
		{
			url: 'video_source_src',
			mimeType: 'video_source_type',
			filesize: 'video_source_size',
		},
	],
	audioFiles: [
		{
			url: 'audio_source_src',
			mimeType: 'audio_source_type',
			filesize: 'audio_source_size',
		},
	],
	speakers: [],
	attachments: [],
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
	loadQuery({});

	const result = await render(
		<MyApp
			Component={Page as any}
			pageProps={{ includePlayer, recording } as any}
		/>,
		{ container }
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
		await act(async () => {
			const result = await renderApp(true, recordingVideo);

			userEvent.click(result.getByAltText('the_sermon_title'));

			await waitFor(() => result.expectVideoLocation(result.getPlayer()));

			await result.rerender(false);

			await waitFor(() => {
				result.expectVideoLocation(result.getMiniplayer());
			});

			await result.rerender(true);

			await waitFor(() => result.expectVideoLocation(result.getPlayer()));
		});
	});

	it('hides controls when video in miniplayer', async () => {
		await act(async () => {
			const result = await renderApp(true, recordingVideo);

			userEvent.click(result.getByAltText('the_sermon_title'));

			await result.rerender(false);

			const miniplayer = result.getByLabelText('miniplayer');

			await findByLabelText(miniplayer, 'pause');

			const controls = getByLabelText(miniplayer, 'pause').parentElement;

			expect(controls).toHaveClass('hidden');
		});
	});

	it('shows controls when video not in miniplayer', async () => {
		await act(async () => {
			const result = await renderApp(true, recordingVideo);

			userEvent.click(result.getByAltText('the_sermon_title'));

			const miniplayer = result.getByLabelText('miniplayer');

			await waitFor(() => {
				expect(getByLabelText(miniplayer, 'pause')).toBeInTheDocument();
			});

			const controls = getByLabelText(miniplayer, 'pause').parentElement;

			expect(controls).not.toHaveClass('hidden');
		});
	});

	it('shows controls when not playing video', async () => {
		await act(async () => {
			const result = await renderApp(true, recordingAudio);

			userEvent.click(result.getByLabelText('play'));

			const miniplayer = result.getByLabelText('miniplayer');

			await findByLabelText(miniplayer, 'pause');

			const controls = getByLabelText(miniplayer, 'pause').parentElement;

			expect(controls).not.toHaveClass('hidden');
		});
	});

	it('handles pause event', async () => {
		await act(async () => {
			const result = await renderApp(true, recordingVideo);

			userEvent.click(result.getByAltText('the_sermon_title'));

			const miniplayer = result.getByLabelText('miniplayer');

			await findByLabelText(miniplayer, 'pause');

			const portal = result.getByTestId('portal');

			ReactTestUtils.Simulate.pause(
				getByTestId(portal, 'video-element'),
				{} as any
			);

			await findByLabelText(miniplayer, 'play');
		});
	});

	it('handles play event', async () => {
		await act(async () => {
			const result = await renderApp(true, recordingVideo);

			userEvent.click(result.getByAltText('the_sermon_title'));

			const miniplayer = result.getByLabelText('miniplayer');

			await findByLabelText(miniplayer, 'pause');

			userEvent.click(getByLabelText(miniplayer, 'pause'));

			await findByLabelText(miniplayer, 'play');

			const portal = result.getByTestId('portal');

			ReactTestUtils.Simulate.play(
				getByTestId(portal, 'video-element'),
				{} as any
			);

			await findByLabelText(miniplayer, 'pause');
		});
	});

	it('moves player out of miniplayer when not showing video', async () => {
		await act(async () => {
			const result = await renderApp(true, recordingAudioVideo);

			await waitFor(() => {
				expect(result.getByText('Audio')).toBeInTheDocument();
			});

			userEvent.click(result.getByText('Audio'));

			const miniplayer = result.getByLabelText('miniplayer');

			await findByLabelText(miniplayer, 'play');

			expect(
				queryByTestId(miniplayer, 'video-element')
			).not.toBeInTheDocument();
		});
	});

	it('never shows video in miniplayer when still on detail page', async () => {
		await act(async () => {
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
					expect(
						queryByTestId(miniplayer, 'video-element')
					).toBeInTheDocument();
				});
			}).rejects.toEqual(expect.anything());
		});
	});

	it('never shows video in miniplayer when loading recording by audio select', async () => {
		await act(async () => {
			const result = await renderApp(true, recordingAudioVideo);

			await waitFor(() => {
				expect(result.getByText('Audio')).toBeInTheDocument();
			});

			userEvent.click(result.getByText('Audio'));

			const miniplayer = result.getByLabelText('miniplayer');
			const pane = miniplayer.querySelector('#mini-player');

			if (!pane) throw new Error('unable to find pane');

			pane.appendChild = jest.fn();

			const player = result.getByLabelText('player');

			await findByLabelText(player, 'play');

			expect(pane.appendChild).not.toHaveBeenCalled();
		});
	});

	it('does not load video when audio selected for recording with video', async () => {
		await act(async () => {
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
		});
	});
});
