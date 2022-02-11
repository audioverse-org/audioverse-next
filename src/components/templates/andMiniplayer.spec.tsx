import { waitFor } from '@testing-library/react';
import React, { useContext, useEffect, useState } from 'react';

import AndMiniplayer from '@components/templates/andMiniplayer';
import AndPlaybackContext, {
	PlaybackContext,
	PlaybackContextType,
} from '@components/templates/andPlaybackContext';
import { SequenceContentType } from '@lib/generated/graphql';
import { buildRenderer, setPlayerMock } from '@lib/test/helpers';

const renderComponent = buildRenderer(AndPlaybackContext);

function ContextUser({
	func,
}: {
	func: (context: PlaybackContextType, setText: (t: string) => void) => void;
}): JSX.Element {
	const playbackContext = useContext(PlaybackContext);
	const hasPlayer = playbackContext.hasPlayer();
	const [text, setText] = useState<string>('child');

	useEffect(() => {
		func(playbackContext, setText);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasPlayer]);

	return <>{text}</>;
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
					<AndMiniplayer>
						<ContextUser
							func={(c) => {
								c.loadRecording({
									id: 'the_recording_id',
									title: 'the_recording_title',
									canonicalPath: 'the_recording_path',
									duration: 60,
									sequence: {
										contentType: SequenceContentType.Series,
										title: 'the_sequence_title',
									},
									videoFiles: [
										{
											url: 'the_video_url',
											filesize: 'the_video_size',
											mimeType: 'the_video_type',
											duration: 1234,
										},
									],
									audioFiles: [],
									videoStreams: [],
								});
								c.play();
							}}
						/>
					</AndMiniplayer>
				),
			},
		});

		await waitFor(() => expect(mockPlayer.play).toBeCalled());
	});

	it('loads recording', async () => {
		setPlayerMock();

		const { findByText } = await renderComponent({
			props: {
				children: (
					<AndMiniplayer>
						<ContextUser
							func={(c) => {
								c.loadRecording({
									title: 'the_recording_title',
									canonicalPath: 'the_recording_path',
								} as any);
							}}
						/>
					</AndMiniplayer>
				),
			},
		});

		await findByText('the_recording_title');
	});
});

// TODO:
// does not show miniplayer if no recording loaded
// displays recording in portal if matching portal provided
// start using react-router so that media can continue playing while navigating
