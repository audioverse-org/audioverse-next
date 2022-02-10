import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';

import { LoginDocument, ResetPasswordDocument } from '@lib/generated/graphql';
import { sleep } from '@lib/sleep';
import {
	buildRenderer,
	mockedFetchApi,
	withMutedReactQueryLogger,
} from '@lib/test/helpers';
import Reset from '@pages/[language]/account/reset';

const renderPage = buildRenderer(Reset);

function loadResetPasswordResponse({
	success = true,
	errors = [],
}: { success?: boolean; errors?: { message: string }[] } = {}) {
	when(mockedFetchApi)
		.calledWith(ResetPasswordDocument, expect.anything())
		.mockResolvedValue({
			userReset: {
				success,
				errors,
			},
		});
	when(mockedFetchApi)
		.calledWith(LoginDocument, expect.anything())
		.mockResolvedValue({
			login: {
				authenticatedUser: {},
			},
		});
}

const router = { push: () => Promise.resolve(true) };

describe('password reset page', () => {
	beforeEach(() => {
		loadResetPasswordResponse();
	});

	it('renders', async () => {
		await renderPage({ router });
	});

	it('renders password field', async () => {
		const { getByPlaceholderText } = await renderPage({ router });

		expect(getByPlaceholderText('New password')).toBeInTheDocument();
	});

	it('renders password confirm field', async () => {
		const { getByPlaceholderText } = await renderPage({ router });

		expect(getByPlaceholderText('Confirm new password')).toBeInTheDocument();
	});

	it('renders submit button', async () => {
		const { getByText } = await renderPage({ router });

		expect(getByText('Login'));
	});

	it('submits password change', async () => {
		const { getByPlaceholderText, getByText } = await renderPage({
			params: {
				token: 'the_token',
			},
			router,
		});

		userEvent.type(getByPlaceholderText('New password'), 'new_pass');
		userEvent.type(getByPlaceholderText('Confirm new password'), 'new_pass');
		userEvent.click(getByText('Login'));

		await waitFor(() => {
			expect(mockedFetchApi).toBeCalledWith(ResetPasswordDocument, {
				variables: {
					token: 'the_token',
					password: 'new_pass',
				},
			});
		});
	});

	it('does not submit mismatched password', async () => {
		const { getByPlaceholderText, getByText } = await renderPage({
			params: {
				token: 'the_token',
			},
			router,
		});

		userEvent.type(getByPlaceholderText('New password'), 'pass_one');
		userEvent.type(getByPlaceholderText('Confirm new password'), 'pass_two');
		userEvent.click(getByText('Login'));

		await sleep();

		expect(mockedFetchApi).not.toBeCalled();
	});

	it('displays password mismatch error', async () => {
		const { getByPlaceholderText, getByText } = await renderPage({
			params: {
				token: 'the_token',
			},
			router,
		});

		userEvent.type(getByPlaceholderText('New password'), 'pass_one');
		userEvent.type(getByPlaceholderText('Confirm new password'), 'pass_two');
		userEvent.click(getByText('Login'));

		await waitFor(() => {
			expect(getByText('Passwords must match')).toBeInTheDocument();
		});
	});

	it('requires password input', async () => {
		const { getByText } = await renderPage({
			params: {
				token: 'the_token',
			},
			router,
		});

		userEvent.click(getByText('Login'));

		await waitFor(() => {
			expect(getByText('Please type password twice')).toBeInTheDocument();
		});
	});

	it('requires password confirm input', async () => {
		const { getByPlaceholderText, getByText } = await renderPage({
			params: {
				token: 'the_token',
			},
			router,
		});

		userEvent.type(getByPlaceholderText('New password'), 'the_pass');
		userEvent.click(getByText('Login'));

		await waitFor(() => {
			expect(getByText('Please type password twice')).toBeInTheDocument();
		});
	});

	it('displays api errors', async () => {
		loadResetPasswordResponse({
			success: false,
			errors: [{ message: 'the_error' }],
		});

		const { getByPlaceholderText, getByText } = await renderPage({
			params: {
				token: 'the_token',
			},
			router,
		});

		userEvent.type(getByPlaceholderText('New password'), 'new_pass');
		userEvent.type(getByPlaceholderText('Confirm new password'), 'new_pass');
		userEvent.click(getByText('Login'));

		await waitFor(() => {
			expect(getByText('the_error')).toBeInTheDocument();
		});
	});

	it('displays generic error on http error', async () => {
		await withMutedReactQueryLogger(async () => {
			when(mockedFetchApi)
				.calledWith(ResetPasswordDocument, expect.anything())
				.mockRejectedValue('oops');

			const { getByPlaceholderText, getByText } = await renderPage({
				params: {
					token: 'the_token',
				},
				router,
			});

			userEvent.type(getByPlaceholderText('New password'), 'new_pass');
			userEvent.type(getByPlaceholderText('Confirm new password'), 'new_pass');
			userEvent.click(getByText('Login'));

			await waitFor(() => {
				expect(
					getByText('Something went wrong while trying to reset your password')
				).toBeInTheDocument();
			});
		});
	});

	it('displays success message', async () => {
		await act(async () => {
			loadResetPasswordResponse({
				success: true,
				errors: [],
			});

			const { getByPlaceholderText, getByText } = await renderPage({
				params: {
					token: 'the_token',
				},
				router,
			});

			userEvent.type(getByPlaceholderText('New password'), 'new_pass');
			userEvent.type(getByPlaceholderText('Confirm new password'), 'new_pass');
			userEvent.click(getByText('Login'));

			await waitFor(() => {
				expect(
					getByText('Your password was successfully changed')
				).toBeInTheDocument();
			});
		});
	});

	it('does not display success message if not successful', async () => {
		await act(async () => {
			loadResetPasswordResponse({
				success: false,
				errors: [],
			});

			const { getByPlaceholderText, getByText, queryByText } = await renderPage(
				{
					params: {
						token: 'the_token',
					},
					router,
				}
			);

			userEvent.type(getByPlaceholderText('New password'), 'new_pass');
			userEvent.type(getByPlaceholderText('Confirm new password'), 'new_pass');
			userEvent.click(getByText('Login'));

			await sleep();

			expect(
				queryByText('Your password was successfully changed')
			).not.toBeInTheDocument();
		});
	});

	it('hides form on success', async () => {
		await act(async () => {
			loadResetPasswordResponse({
				success: true,
				errors: [],
			});

			const { getByPlaceholderText, getByText, queryByPlaceholderText } =
				await renderPage({
					params: {
						token: 'the_token',
					},
					router,
				});

			userEvent.type(getByPlaceholderText('New password'), 'new_pass');
			userEvent.type(getByPlaceholderText('Confirm new password'), 'new_pass');
			userEvent.click(getByText('Login'));

			await waitFor(() => {
				expect(
					getByText('Your password was successfully changed')
				).toBeInTheDocument();
			});

			expect(queryByPlaceholderText('New password')).not.toBeInTheDocument();
		});
	});
});
