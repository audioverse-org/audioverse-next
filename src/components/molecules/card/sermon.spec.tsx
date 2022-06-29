import { screen } from '@testing-library/react';
import React from 'react';

import CardSermon, { CardSermonProps } from '@components/molecules/card/sermon';
import AndMiniplayer from '@components/templates/andMiniplayer';
import { buildRenderer } from '@lib/test/buildRenderer';

jest.mock('@components/molecules/helpWidget');

const Page = (props: CardSermonProps): JSX.Element => {
	return (
		<AndMiniplayer>
			<CardSermon {...props} />
		</AndMiniplayer>
	);
};

const renderComponent = buildRenderer<CardSermonProps>(Page, {
	defaultProps: {
		recording: {
			id: 'the_sermon_id',
			title: 'the_title',
			canonicalPath: '/the_sermon_path',
			persons: [],
		},
	},
});

describe('card sermon', () => {
	it('links card', async () => {
		await renderComponent();

		expect(await screen.findByRole('link')).toHaveAttribute(
			'href',
			'/the_sermon_path'
		);
	});

	it('has play button', async () => {
		const { getByLabelText } = await renderComponent();

		expect(getByLabelText('play')).toBeInTheDocument();
	});

	it('has favorite button', async () => {
		const { getByLabelText } = await renderComponent();

		expect(getByLabelText('Favorite')).toBeInTheDocument();
	});
});
