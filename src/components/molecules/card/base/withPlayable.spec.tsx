import React from 'react';

import CardWithPlayable, {
	CardWithPlayableProps,
} from '@components/molecules/card/base/withPlayable';
import AndMiniplayer from '@components/templates/andMiniplayer';
import { buildRenderer } from '@lib/test/helpers';

const Page = (props: CardWithPlayableProps): JSX.Element => {
	return (
		<AndMiniplayer>
			<CardWithPlayable {...props} />
		</AndMiniplayer>
	);
};

const renderComponent = buildRenderer(Page, {
	defaultProps: {
		recording: {
			id: 'the_sermon_id',
		},
		progress: 0.3,
	},
});

describe('card playable', () => {
	it('has play button', async () => {
		const { getByLabelText } = await renderComponent();

		expect(getByLabelText('play')).toBeInTheDocument();
	});

	it('disables progress bar interactivity', async () => {
		const { getByLabelText } = await renderComponent();

		expect(getByLabelText('progress')).toBeDisabled();
	});

	it('does not render 0 if 0 duration', async () => {
		const { queryByText } = await renderComponent({
			props: {
				recording: {
					id: 'the_recording_id',
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
	// 	console.log('clicking play');
	//
	// 	userEvent.click(getByLabelText('play'));
	//
	// 	await waitFor(() => {
	// 		expect(getAllByLabelText('progress')).toHaveLength(2);
	// 	});
	// });
});
