import { screen } from '@testing-library/react';
import React from 'react';

import CardSermon, {
	CardSermonProps,
} from '@/components/molecules/card/sermon';
import AndMiniplayer from '@/components/templates/andMiniplayer';
import { buildRenderer } from '@/lib/test/buildRenderer';
import { describe, expect, it } from 'vitest';

const Page = (props: CardSermonProps): JSX.Element => {
	return (
		<AndMiniplayer>
			<CardSermon {...props} />
		</AndMiniplayer>
	);
};

const renderComponent = buildRenderer(Page, {
	defaultProps: {
		recording: {
			id: 'the_sermon_id',
			canonicalPath: 'the_sermon_path',
			persons: [],
		},
	},
});

describe('card sermon', () => {
	it('links card', async () => {
		await renderComponent({
			props: {
				recording: {
					id: 'the_id',
					title: 'the_title',
					canonicalPath: 'the_path',
					persons: [],
				},
			},
		});

		expect(
			screen.getByText('the_title').parentElement?.parentElement
		).toHaveAttribute('href', 'the_path');
	});

	it('has play button', async () => {
		const { getByLabelText } = await renderComponent();

		expect(getByLabelText('play')).toBeInTheDocument();
	});

	// TODO: fix when usePlaybackSession returns server-side progress
	// it('disables progress bar interactivity', async () => {
	// 	const { getByLabelText } = await renderComponent();

	// 	expect(getByLabelText('progress')).toBeDisabled();
	// });

	it('does not render 0 if 0 duration', async () => {
		const { queryByText } = await renderComponent({
			props: {
				recording: {
					id: 'the_recording_id',
					canonicalPath: 'the_sermon_path',
					persons: [],
				},
				duration: 0,
			},
		});

		expect(queryByText('0')).not.toBeInTheDocument();
	});

	it('does not render progress if no progress', async () => {
		const { queryByLabelText } = await renderComponent({
			props: {
				recording: {
					id: 'the_recording_id',
					canonicalPath: 'the_sermon_path',
					persons: [],
				},
				progress: 0,
			},
		});

		expect(queryByLabelText('progress')).not.toBeInTheDocument();
	});

	it('has favorite button', async () => {
		const { getByLabelText } = await renderComponent();

		expect(getByLabelText('Favorite')).toBeInTheDocument();
	});

	// it('displays progress bar when recording starts playing', async () => {
	// 	const { getByLabelText, getAllByLabelText } = await renderComponent({
	// 		props: {
	// 			recording: {
	// 				id: 'the_sermon_id',
	// 			},
	// 			progress: 0,
	// 		},
	// 	});
	//
	// 	userEvent.click(getByLabelText('play'));
	//
	// 	await waitFor(() => {
	// 		expect(getAllByLabelText('progress')).toHaveLength(2);
	// 	});
	// });
});
