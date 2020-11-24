import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Favorite from '@components/molecules/favorite';

const renderComponent = () => {
	const result = render(<Favorite />);

	return {
		...result,
		button: result.getByText('Favorite'),
	};
};

describe('favorite button', () => {
	it('can render', async () => {
		await renderComponent();
	});

	it('includes button', async () => {
		const { button } = await renderComponent();

		expect(button).toBeInTheDocument();
	});

	it('toggles button', async () => {
		const { getByText, button } = await renderComponent();

		userEvent.click(button);

		expect(getByText('Unfavorite')).toBeInTheDocument();
	});

	it('supports init > fav > no-fav', async () => {
		const { getByText, button } = await renderComponent();

		userEvent.click(button);
		userEvent.click(button);

		expect(getByText('Favorite')).toBeInTheDocument();
	});

	it('supports init > fav > no-fav > fav', async () => {
		const { getByText, button } = await renderComponent();

		userEvent.click(button);
		userEvent.click(button);
		userEvent.click(button);

		expect(getByText('Unfavorite')).toBeInTheDocument();
	});
});
