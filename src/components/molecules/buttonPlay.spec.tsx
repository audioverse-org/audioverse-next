import { buildRenderer } from '@lib/test/buildRenderer';
import ButtonPlay, { ButtonPlayProps } from '@components/molecules/buttonPlay';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import AndVjs from '@components/templates/andVjs';
import React from 'react';

const renderComponent = buildRenderer<ButtonPlayProps>(
	(p) => {
		return (
			<AndVjs>
				<ButtonPlay {...p} />
			</AndVjs>
		);
	},
	{
		defaultProps: {
			recording: {
				id: 'recording-id',
			},
		},
	}
);

describe('buttonPlay', () => {
	it('switches states', async () => {
		await renderComponent();

		userEvent.click(screen.getByRole('button'));

		await expect(screen.findByLabelText('pause')).resolves.toBeInTheDocument();
	});
});
