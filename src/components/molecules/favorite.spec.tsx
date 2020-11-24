import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Favorite from '@components/molecules/favorite';

const renderComponent = () => {
	return render(<Favorite />);
};

describe('favorite button', () => {
	it('can render', async () => {
		await renderComponent();
	});

	it('includes button', async () => {
		const { getByText } = await renderComponent();

		expect(getByText('Favorite')).toBeInTheDocument();
	});

	it('toggles button', async () => {
		const { getByText } = await renderComponent();

		const button = getByText('Favorite');

		userEvent.click(button);

		expect(getByText('Unfavorite')).toBeInTheDocument();
	});
});
