import { waitFor } from '@testing-library/dom';
import {
	act,
	getByLabelText,
	getByTestId,
	render,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import Player from '@components/molecules/player';
import AndMiniplayer from '@components/templates/andMiniplayer';
import { PlayerFragment } from '@lib/generated/graphql';
import MyApp from '@pages/_app';

const recordingAudio: Partial<PlayerFragment> = {
	id: 'the_sermon_id',
	title: 'the_sermon_title',
	sequence: {
		title: 'the_sequence_title',
	},
	audioFiles: [
		{
			url: 'the_source_src',
			mimeType: 'the_source_type',
			filesize: 'the_source_size',
		},
	],
};

const recordingVideo: Partial<PlayerFragment> = {
	id: 'the_sermon_id',
	title: 'the_sermon_title',
	sequence: {
		title: 'the_sequence_title',
	},
	videoFiles: [
		{
			url: 'the_source_src',
			mimeType: 'the_source_type',
			filesize: 'the_source_size',
		},
	],
};

const Page = ({
	includePlayer,
	recording,
}: {
	includePlayer: boolean;
	recording: Partial<PlayerFragment>;
}) => (
	<AndMiniplayer>
		{includePlayer && <Player recording={recording as PlayerFragment} />}
	</AndMiniplayer>
);

const renderApp = async (
	includePlayer: boolean,
	recording: Partial<PlayerFragment>,
	container: any = undefined
) => {
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
	it('moves video to and from miniplayer', async () => {
		await act(async () => {
			const result = await renderApp(true, recordingVideo);

			userEvent.click(result.getByAltText('the_sermon_title'));

			await waitFor(() => result.expectVideoLocation(result.getPlayer()));

			await result.rerender(false);

			await waitFor(() => result.expectVideoLocation(result.getMiniplayer()));

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

			await waitFor(() =>
				expect(getByLabelText(miniplayer, 'pause')).toBeInTheDocument()
			);

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

			await waitFor(() =>
				expect(getByLabelText(miniplayer, 'pause')).toBeInTheDocument()
			);

			const controls = getByLabelText(miniplayer, 'pause').parentElement;

			expect(controls).not.toHaveClass('hidden');
		});
	});

	it('handles pause event', async () => {
		await act(async () => {
			const result = await renderApp(true, recordingVideo);

			userEvent.click(result.getByAltText('the_sermon_title'));

			const miniplayer = result.getByLabelText('miniplayer');

			await waitFor(() =>
				expect(getByLabelText(miniplayer, 'pause')).toBeInTheDocument()
			);

			const portal = result.getByTestId('portal');

			ReactTestUtils.Simulate.pause(
				getByTestId(portal, 'video-element'),
				{} as any
			);

			await waitFor(() =>
				expect(getByLabelText(miniplayer, 'play')).toBeInTheDocument()
			);
		});
	});

	it('handles play event', async () => {
		await act(async () => {
			const result = await renderApp(true, recordingVideo);

			userEvent.click(result.getByAltText('the_sermon_title'));

			const miniplayer = result.getByLabelText('miniplayer');

			await waitFor(() =>
				expect(getByLabelText(miniplayer, 'pause')).toBeInTheDocument()
			);

			userEvent.click(getByLabelText(miniplayer, 'pause'));

			await waitFor(() =>
				expect(getByLabelText(miniplayer, 'play')).toBeInTheDocument()
			);

			const portal = result.getByTestId('portal');

			ReactTestUtils.Simulate.play(
				getByTestId(portal, 'video-element'),
				{} as any
			);

			await waitFor(() =>
				expect(getByLabelText(miniplayer, 'pause')).toBeInTheDocument()
			);
		});
	});
});
