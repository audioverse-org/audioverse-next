import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cookie from 'js-cookie';
import { __loadRouter } from 'next/router';
import React from 'react';

import RecordingButtonFavorite from '@components/molecules/recordingButtonFavorite';
import { recordingIsFavorited } from '@lib/api/recordingIsFavorited';
import { setRecordingFavorited } from '@lib/api/setRecordingFavorited';
import { BaseColors } from '@lib/constants';
import renderWithProviders from '@lib/test/renderWithProviders';
import withMutedReactQueryLogger from '@lib/test/withMutedReactQueryLogger';
import loadControlledPromise from '@lib/test/loadControlledPromise';

vi.mock('@lib/api/recordingIsFavorited');
vi.mock('@lib/api/setRecordingFavorited');
vi.mock('js-cookie');

const renderComponent = async () => {
	const result = await renderWithProviders(
		<RecordingButtonFavorite id="-1" backgroundColor={BaseColors.WHITE} />,
		undefined
	);
	const button =
		result.queryByLabelText('Favorite') ||
		result.queryByLabelText('Unfavorite');

	if (!button) {
		throw new Error("Can't find button");
	}

	return {
		...result,
		button,
	};
};

const mockRecordingIsFavorited = recordingIsFavorited as vi.Mock;
const mockSetRecordingFavorited = setRecordingFavorited as vi.Mock;

describe('recording favorite button', () => {
	beforeEach(() => {
		__loadRouter({
			pathname: '/en/discover',
		});
		Cookie.get = vi.fn().mockReturnValue({ avSession: 'abc123' });
		mockRecordingIsFavorited.mockResolvedValue(false);
	});

	it('shows favorite button', async () => {
		const { getByLabelText } = await renderComponent();

		expect(getByLabelText('Favorite')).toBeInTheDocument();
	});

	it('shows unfavorite button', async () => {
		mockRecordingIsFavorited.mockResolvedValue(true);

		const { findByLabelText } = await renderComponent();

		await expect(findByLabelText('Unfavorite')).resolves.toBeInTheDocument();
	});

	it('gets favorited status', async () => {
		await renderComponent();

		expect(recordingIsFavorited).toBeCalled();
	});

	it('triggers mutation', async () => {
		mockSetRecordingFavorited.mockResolvedValue(true);

		const { button } = await renderComponent();

		userEvent.click(button);

		await waitFor(() =>
			expect(setRecordingFavorited).toBeCalledWith('-1', true)
		);
	});

	it('updates button when clicked', async () => {
		const { findByLabelText, button } = await renderComponent();

		mockRecordingIsFavorited.mockResolvedValue(true);
		mockSetRecordingFavorited.mockResolvedValue(true);

		userEvent.click(button);

		await expect(findByLabelText('Unfavorite')).resolves.toBeInTheDocument();
	});

	it('rolls back state if API fails', async () => {
		await withMutedReactQueryLogger(async () => {
			const { button, findByLabelText } = await renderComponent();

			const { reject } = loadControlledPromise(mockSetRecordingFavorited);

			userEvent.click(button);

			await expect(findByLabelText('Unfavorite')).resolves.toBeInTheDocument();

			reject();

			await expect(findByLabelText('Favorite')).resolves.toBeInTheDocument();
		});
	});

	it('does not roll back state if API succeeds', async () => {
		const isFavoritedSpy = mockRecordingIsFavorited;
		mockSetRecordingFavorited.mockResolvedValue(true);

		isFavoritedSpy.mockResolvedValue(false);

		const { button, findByLabelText } = await renderComponent();

		isFavoritedSpy.mockResolvedValue(true);

		userEvent.click(button);

		await expect(findByLabelText('Unfavorite')).resolves.toBeInTheDocument();
		await expect(findByLabelText('Favorite')).rejects.toThrow();
	});

	it('sets aria-pressed=false', async () => {
		const { getByLabelText } = await renderComponent();

		expect(getByLabelText('Favorite')).not.toHaveAttribute(
			'aria-pressed',
			'true'
		);
	});

	it('sets aria-pressed=true', async () => {
		mockRecordingIsFavorited.mockResolvedValue(true);

		const { findByLabelText } = await renderComponent();

		await expect(findByLabelText('Unfavorite')).resolves.toHaveAttribute(
			'aria-pressed',
			'true'
		);
	});

	it('uses favorite icon', async () => {
		const { getByTestId } = await renderComponent();

		expect(getByTestId('favorite-icon')).toBeInTheDocument();
	});

	it('uses unfavorite icon', async () => {
		mockRecordingIsFavorited.mockResolvedValue(true);

		await renderComponent();

		await waitFor(() => {
			expect(screen.getByTestId('unfavorite-icon')).toBeInTheDocument();
		});
	});
});
