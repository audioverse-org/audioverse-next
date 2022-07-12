import React, { useContext, useEffect, useState } from 'react';

import AndMiniplayer from '@components/templates/andMiniplayer';
import AndVjs, {
	VjsContext,
	VjsContextType,
} from '@components/templates/andVjs';
import { SequenceContentType } from '@src/__generated__/graphql';
import { buildRenderer } from '@lib/test/buildRenderer';
import { screen, waitFor } from '@testing-library/react';
import { __loadMockPlayer } from 'video.js';

const renderComponent = buildRenderer(AndVjs);

function ContextUser({
	func,
}: {
	func: (context: VjsContextType, setText: (t: string) => void) => void;
}): JSX.Element {
	const playbackContext = useContext(VjsContext);
	const hasPlayer = playbackContext.hasPlayer();
	const [text, setText] = useState<string>('child');

	useEffect(() => {
		func(playbackContext, setText);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasPlayer]);

	return <>{text}</>;
}

describe('andMiniplayer', () => {
	it('renders children', async () => {
		await renderComponent({
			props: {
				children: <p>testing</p>,
			},
		});

		expect(screen.getByText('testing')).toBeInTheDocument();
	});

	it('plays media', async () => {
		const mockPlayer = __loadMockPlayer();

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

		await waitFor(() => {
			expect(mockPlayer.play).toBeCalled();
		});
	});

	it('loads recording', async () => {
		__loadMockPlayer();

		await renderComponent({
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

		await expect(
			screen.findByText('the_recording_title')
		).resolves.toBeInTheDocument();
	});

	it('sets class on body when miniplayer loaded', async () => {
		__loadMockPlayer();

		await renderComponent({
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

		await screen.findByText('the_recording_title');

		expect(document.body).toHaveClass('body--with-miniplayer');
	});
});
