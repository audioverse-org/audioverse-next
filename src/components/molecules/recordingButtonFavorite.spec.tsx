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
import { resolveWithDelay } from '@lib/test/resolveWithDelay';

jest.mock('@lib/api/recordingIsFavorited');
jest.mock('@lib/api/setRecordingFavorited');
jest.mock('js-cookie');

function getButton() {
	return screen.getByLabelText(/favorite/i);
}

const renderComponent = async () => {
	const view = await renderWithProviders(
		<RecordingButtonFavorite id="-1" backgroundColor={BaseColors.WHITE} />,
		undefined
	);
	return {
		...view,
		button: getButton(),
	};
};

const mockRecordingIsFavorited = recordingIsFavorited as jest.Mock;
const mockSetRecordingFavorited = setRecordingFavorited as jest.Mock;

describe('recording favorite button', () => {
	beforeEach(() => {
		__loadRouter({
			pathname: '/en/discover',
		});
		Cookie.get = jest.fn().mockReturnValue({ avSession: 'abc123' });
		mockRecordingIsFavorited.mockResolvedValue(false);
	});

	it('shows favorite button', async () => {
		await renderComponent();

		expect(screen.getByLabelText('Favorite')).toBeInTheDocument();
	});

	it('shows unfavorite button', async () => {
		mockRecordingIsFavorited.mockResolvedValue(true);

		await renderComponent();

		await expect(
			screen.findByLabelText('Unfavorite')
		).resolves.toBeInTheDocument();
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
		const { button } = await renderComponent();

		mockRecordingIsFavorited.mockResolvedValue(true);
		mockSetRecordingFavorited.mockResolvedValue(true);

		userEvent.click(button);

		await expect(
			screen.findByLabelText('Unfavorite')
		).resolves.toBeInTheDocument();
	});

	it('rolls back state if API fails', async () => {
		await withMutedReactQueryLogger(async () => {
			const { button } = await renderComponent();

			resolveWithDelay(mockSetRecordingFavorited, { resolve: false });

			userEvent.click(button);

			await expect(
				screen.findByLabelText('Unfavorite')
			).resolves.toBeInTheDocument();
			await expect(
				screen.findByLabelText('Favorite')
			).resolves.toBeInTheDocument();
		});
	});

	it('does not roll back state if API succeeds', async () => {
		const isFavoritedSpy = mockRecordingIsFavorited;
		mockSetRecordingFavorited.mockResolvedValue(true);

		isFavoritedSpy.mockResolvedValue(false);

		const { button } = await renderComponent();

		isFavoritedSpy.mockResolvedValue(true);

		userEvent.click(button);

		await expect(
			screen.findByLabelText('Unfavorite')
		).resolves.toBeInTheDocument();
		await expect(screen.findByLabelText('Favorite')).rejects.toThrow();
	});

	it('sets aria-pressed=false', async () => {
		await renderComponent();

		expect(screen.getByLabelText('Favorite')).not.toHaveAttribute(
			'aria-pressed',
			'true'
		);
	});

	it('sets aria-pressed=true', async () => {
		mockRecordingIsFavorited.mockResolvedValue(true);

		await renderComponent();

		await expect(screen.findByLabelText('Unfavorite')).resolves.toHaveAttribute(
			'aria-pressed',
			'true'
		);
	});

	it('uses favorite icon', async () => {
		await renderComponent();

		expect(screen.getByTestId('favorite-icon')).toBeInTheDocument();
	});

	it('uses unfavorite icon', async () => {
		mockRecordingIsFavorited.mockResolvedValue(true);

		await renderComponent();

		await waitFor(() => {
			expect(screen.getByTestId('unfavorite-icon')).toBeInTheDocument();
		});
	});
});
