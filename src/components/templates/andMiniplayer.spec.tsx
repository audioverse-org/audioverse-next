import React, { useContext, useEffect, useState } from 'react';

import AndMiniplayer from '@components/templates/andMiniplayer';
import AndPlaybackContext, {
	PlaybackContext,
	PlaybackContextType,
} from '@components/templates/andPlaybackContext';

import { buildRenderer } from '@lib/test/buildRenderer';
import setPlayerMock from '@lib/test/setPlayerMock';
import { SequenceContentType } from '@src/__generated__/graphql';

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
									collection: null,
								});
								c.play();
							}}
						/>
					</AndMiniplayer>
				),
			},
		});

		expect(mockPlayer.play).toBeCalled();
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

	it('sets class on body when miniplayer loaded', async () => {
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

		expect(document.body).toHaveClass('body--with-miniplayer');
	});
});
