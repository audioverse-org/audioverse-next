import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { queryCache } from 'react-query';

import Favorite from '@components/molecules/favorite';
import { isFavorited, setFavorited } from '@lib/api';
import * as api from '@lib/api';

jest.mock('@lib/api/isFavorited');
jest.mock('@lib/api/setFavorited');

const renderComponent = () => {
	const result = render(<Favorite id={'-1'} />),
		button = result.queryByText('Favorite') || result.queryByText('Unfavorite');

	if (!button) {
		throw new Error("Can't find button");
	}

	return {
		...result,
		button,
	};
};

describe('favorite button', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		queryCache.clear();
	});

	it('can render', async () => {
		await renderComponent();
	});

	it('includes button', async () => {
		const { button } = await renderComponent();

		expect(button).toBeInTheDocument();
	});

	it('shows favorite button', async () => {
		const { getByText } = await renderComponent();

		expect(getByText('Favorite')).toBeInTheDocument();
	});

	it('shows unfavorite button', async () => {
		jest.spyOn(api, 'isFavorited').mockResolvedValue(true);

		const { findByText } = await renderComponent();

		await expect(findByText('Unfavorite')).resolves.toBeInTheDocument();
	});

	it('gets favorited status', async () => {
		await renderComponent();

		expect(isFavorited).toBeCalled();
	});

	it('triggers mutation', async () => {
		const { button } = await renderComponent();

		userEvent.click(button);

		await waitFor(() => expect(setFavorited).toBeCalledWith('-1', true));
	});

	it('updates button when clicked', async () => {
		const { findByText, button } = await renderComponent();

		jest.spyOn(api, 'isFavorited').mockResolvedValue(true);
		jest.spyOn(api, 'setFavorited').mockResolvedValue('success');

		userEvent.click(button);

		await expect(findByText('Unfavorite')).resolves.toBeInTheDocument();
	});

	it('rolls back state if API fails', async () => {
		const { button, findByText } = await renderComponent();

		jest.spyOn(api, 'setFavorited').mockRejectedValue('error');

		userEvent.click(button);

		await expect(findByText('Unfavorite')).resolves.toBeInTheDocument();
		await expect(findByText('Favorite')).resolves.toBeInTheDocument();
	});

	it('does not roll back state if API succeeds', async () => {
		const isFavoritedSpy = jest.spyOn(api, 'isFavorited');
		jest.spyOn(api, 'setFavorited').mockResolvedValue('success');

		isFavoritedSpy.mockResolvedValue(false);

		const { button, findByText } = await renderComponent();

		isFavoritedSpy.mockResolvedValue(true);

		userEvent.click(button);

		await expect(findByText('Unfavorite')).resolves.toBeInTheDocument();
		await expect(findByText('Favorite')).rejects.toThrow();
	});
});
