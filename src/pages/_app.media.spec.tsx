import { waitFor } from '@testing-library/dom';
import { getByTestId, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Player from '@components/molecules/player';
import AndMiniplayer from '@components/templates/andMiniplayer';
import { PlayerFragment } from '@lib/generated/graphql';
import MyApp from '@pages/_app';

const recording: Partial<PlayerFragment> = {
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

const Page = ({ includePlayer }: { includePlayer: boolean }) => (
	<AndMiniplayer>
		{includePlayer && <Player recording={recording as PlayerFragment} />}
	</AndMiniplayer>
);

const renderApp = async (
	includePlayer: boolean,
	container: any = undefined
) => {
	const result = await render(
		<MyApp Component={Page as any} pageProps={{ includePlayer } as any} />,
		{ container }
	);

	return {
		...result,
		getMiniplayer: () => result.getByLabelText('miniplayer'),
		getPlayer: () => result.getByLabelText('player'),
		expectVideoLocation: (location: HTMLElement) =>
			expect(getByTestId(location, 'video-element')).toBeInTheDocument(),
		rerender: (includePlayer: boolean) => {
			return renderApp(includePlayer, result.container);
		},
	};
};

describe('app media playback', () => {
	it('moves video to and from miniplayer', async () => {
		const result = await renderApp(true);

		userEvent.click(result.getByAltText('the_sermon_title'));

		await waitFor(() => result.expectVideoLocation(result.getPlayer()));

		await result.rerender(false);

		await waitFor(() => result.expectVideoLocation(result.getMiniplayer()));

		await result.rerender(true);

		await waitFor(() => result.expectVideoLocation(result.getPlayer()));
	});
});
