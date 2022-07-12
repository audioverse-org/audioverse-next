import { buildRenderer } from '@lib/test/buildRenderer';
import SermonEmbed, { SermonEmbedProps } from '@containers/sermon/embed';
import { screen } from '@testing-library/react';
import { RecordingContentType } from '@src/__generated__/graphql';
import AndVjs from '@components/templates/andVjs';
import React from 'react';

const renderComponent = buildRenderer<SermonEmbedProps>(
	(p) => (
		<AndVjs>
			<SermonEmbed {...p} />
		</AndVjs>
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
