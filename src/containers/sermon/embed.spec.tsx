import { buildRenderer } from '@lib/test/buildRenderer';
import SermonEmbed from '@containers/sermon/embed';
import { screen } from '@testing-library/react';
import { RecordingContentType } from '@lib/generated/graphql';
import AndPlaybackContext from '@components/templates/andPlaybackContext';
import React from 'react';

const renderComponent = buildRenderer(
	(p) => (
		<AndPlaybackContext>
			<SermonEmbed {...p} />
		</AndPlaybackContext>
	),
	{
		defaultProps: {
			recording: {
				title: 'the_title',
				contentType: RecordingContentType.Sermon,
				speakers: [],
			},
		},
	}
);

describe('SermonEmbed', () => {
	it('renders video', async () => {
		await renderComponent();

		await expect(
			screen.findByTestId('video-element')
		).resolves.toBeInTheDocument();
	});
});
