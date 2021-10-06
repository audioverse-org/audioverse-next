import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cookie from 'js-cookie';
import React from 'react';

import RecordingButtonFavorite from '@components/molecules/recordingButtonFavorite';
import { recordingIsFavorited, setRecordingFavorited } from '@lib/api';
import * as api from '@lib/api';
import { BaseColors } from '@lib/constants';
import {
	loadRouter,
	renderWithIntl,
	withMutedReactQueryLogger,
} from '@lib/test/helpers';

jest.mock('@lib/api/recordingIsFavorited');
jest.mock('@lib/api/setRecordingFavorited');
jest.mock('@lib/api/fetchApi');
jest.mock('js-cookie');

const renderComponent = async () => {
	const result = await renderWithIntl(
		<RecordingButtonFavorite id="-1" backgroundColor={BaseColors.WHITE} />
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

describe('recording favorite button', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		loadRouter({
			pathname: '/en/discover',
		});
		Cookie.get = jest.fn().mockReturnValue({ avSession: 'abc123' });
	});

	it('shows favorite button', async () => {
		const { getByLabelText } = await renderComponent();

		expect(getByLabelText('Favorite')).toBeInTheDocument();
	});

	it('shows unfavorite button', async () => {
		jest.spyOn(api, 'recordingIsFavorited').mockResolvedValue(true);

		const { findByLabelText } = await renderComponent();

		await expect(findByLabelText('Unfavorite')).resolves.toBeInTheDocument();
	});

	it('gets favorited status', async () => {
		await renderComponent();

		expect(recordingIsFavorited).toBeCalled();
	});

	it('triggers mutation', async () => {
		const { button } = await renderComponent();

		userEvent.click(button);

		await waitFor(() =>
			expect(setRecordingFavorited).toBeCalledWith('-1', true)
		);
	});

	it('updates button when clicked', async () => {
		const { findByLabelText, button } = await renderComponent();

		jest.spyOn(api, 'recordingIsFavorited').mockResolvedValue(true);
		jest.spyOn(api, 'setRecordingFavorited').mockResolvedValue(true);

		userEvent.click(button);

		await expect(findByLabelText('Unfavorite')).resolves.toBeInTheDocument();
	});

	it('rolls back state if API fails', async () => {
		await withMutedReactQueryLogger(async () => {
			const { button, findByLabelText } = await renderComponent();

			jest.spyOn(api, 'setRecordingFavorited').mockRejectedValue('error');

			userEvent.click(button);

			await expect(findByLabelText('Unfavorite')).resolves.toBeInTheDocument();
			await expect(findByLabelText('Favorite')).resolves.toBeInTheDocument();
		});
	});

	it('does not roll back state if API succeeds', async () => {
		const isFavoritedSpy = jest.spyOn(api, 'recordingIsFavorited');
		jest.spyOn(api, 'setRecordingFavorited').mockResolvedValue(true);

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
		jest.spyOn(api, 'recordingIsFavorited').mockResolvedValue(true);

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
		jest.spyOn(api, 'recordingIsFavorited').mockResolvedValue(true);

		const { findByTestId } = await renderComponent();

		await expect(findByTestId('unfavorite-icon')).resolves.toBeInTheDocument();
	});
});
