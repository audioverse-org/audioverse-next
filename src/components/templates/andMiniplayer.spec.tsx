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
				children: <ContextUser func={(c) => c.play()} />,
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
							c.load({ title: 'the_recording_title' });
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
