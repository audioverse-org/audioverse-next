import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Favorite from '@components/molecules/favorite';
import { isRecordingFavorited, setRecordingFavorited } from '@lib/api';
import * as api from '@lib/api';
import {
	renderWithQueryProvider,
	withMutedReactQueryLogger,
} from '@lib/test/helpers';

jest.mock('@lib/api/isRecordingFavorited');
jest.mock('@lib/api/setRecordingFavorited');
jest.mock('@lib/api/fetchApi');

const renderComponent = async () => {
	const result = await renderWithQueryProvider(<Favorite id={'-1'} />),
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
		jest.spyOn(api, 'isRecordingFavorited').mockResolvedValue(true);

		const { findByText } = await renderComponent();

		await expect(findByText('Unfavorite')).resolves.toBeInTheDocument();
	});

	it('gets favorited status', async () => {
		await renderComponent();

		expect(isRecordingFavorited).toBeCalled();
	});

	it('triggers mutation', async () => {
		const { button } = await renderComponent();

		userEvent.click(button);

		await waitFor(() =>
			expect(setRecordingFavorited).toBeCalledWith('-1', true)
		);
	});

	it('updates button when clicked', async () => {
		const { findByText, button } = await renderComponent();

		jest.spyOn(api, 'isRecordingFavorited').mockResolvedValue(true);
		jest.spyOn(api, 'setRecordingFavorited').mockResolvedValue('success');

		userEvent.click(button);

		await expect(findByText('Unfavorite')).resolves.toBeInTheDocument();
	});

	it('rolls back state if API fails', async () => {
		await withMutedReactQueryLogger(async () => {
			const { button, findByText } = await renderComponent();

			jest.spyOn(api, 'setRecordingFavorited').mockRejectedValue('error');

			userEvent.click(button);

			await expect(findByText('Unfavorite')).resolves.toBeInTheDocument();
			await expect(findByText('Favorite')).resolves.toBeInTheDocument();
		});
	});

	it('does not roll back state if API succeeds', async () => {
		const isFavoritedSpy = jest.spyOn(api, 'isRecordingFavorited');
		jest.spyOn(api, 'setRecordingFavorited').mockResolvedValue('success');

		isFavoritedSpy.mockResolvedValue(false);

		const { button, findByText } = await renderComponent();

		isFavoritedSpy.mockResolvedValue(true);

		userEvent.click(button);

		await expect(findByText('Unfavorite')).resolves.toBeInTheDocument();
		await expect(findByText('Favorite')).rejects.toThrow();
	});
});
