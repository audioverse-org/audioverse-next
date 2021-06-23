import { waitFor } from '@testing-library/react';
import React, { useContext, useEffect } from 'react';

import AndMiniplayer, {
	PlaybackContext,
	PlaybackContextType,
} from '@components/templates/andMiniplayer';
import { buildRenderer, setPlayerMock } from '@lib/test/helpers';

const renderComponent = buildRenderer(AndMiniplayer);

function ContextUser({
	func,
}: {
	func: (context: PlaybackContextType) => void;
}): JSX.Element {
	const playbackContext = useContext(PlaybackContext);
	const hasPlayer = playbackContext.hasPlayer();

	useEffect(() => {
		func(playbackContext);
	}, [hasPlayer]);

	return <>child</>;
}

describe('miniplayer template', () => {
	it('renders', async () => {
		await renderComponent();
	});

	it('renders children', async () => {
		const { getByText } = await renderComponent({
			props: {
				children: <p>testing</p>,
			},
		});

		expect(getByText('testing')).toBeInTheDocument();
	});

	it('plays media', async () => {
		const mockPlayer = setPlayerMock();

		await renderComponent({
			props: {
				children: (
					<ContextUser
						func={(c) => {
							c.load({
								id: 'the_recording_id',
								title: 'the_recording_title',
								videoFiles: [
									{
										url: 'the_video_url',
										filesize: 'the_video_size',
										mimeType: 'the_video_type',
									},
								],
								audioFiles: [],
								videoStreams: [],
							});
							c.play();
						}}
					/>
				),
			},
		});

		await waitFor(() => expect(mockPlayer.play).toBeCalled());
	});

	it('loads recording', async () => {
		const { getByText } = await renderComponent({
			props: {
				children: (
					<ContextUser
						func={(c) => {
							c.load({ title: 'the_recording_title' } as any);
						}}
					/>
				),
			},
		});

		expect(getByText('the_recording_title')).toBeInTheDocument();
	});
});

// TODO:
// does not show miniplayer if no recording loaded
// displays recording in portal if matching portal provided
// start using react-router so that media can continue playing while navigating
