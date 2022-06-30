import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { fetchApi } from '@lib/api/fetchApi';
import { sleep } from '@lib/sleep';
import { buildRenderer } from '@lib/test/buildRenderer';
import withMutedReactQueryLogger from '@lib/test/withMutedReactQueryLogger';
import Reset from '@pages/[language]/account/reset';
import { ResetPasswordDocument } from '@containers/account/__generated__/reset';
import { LoginDocument } from '@lib/api/__generated__/login';

const renderPage = buildRenderer(Reset);

function loadResetPasswordResponse({
	success = true,
	errors = [],
}: { success?: boolean; errors?: { message: string }[] } = {}) {
	when(fetchApi)
		.calledWith(ResetPasswordDocument, expect.anything())
		.mockResolvedValue({
			userReset: {
				success,
				errors,
			},
		});
	when(fetchApi)
		.calledWith(LoginDocument, expect.anything())
		.mockResolvedValue({
			login: {
				authenticatedUser: {},
			},
		});
}

describe('password reset page', () => {
	beforeEach(() => {
		loadResetPasswordResponse();
		__loadQuery({
			token: 'the_token',
		});
	});

	it('renders password field', async () => {
		await renderPage();

		expect(screen.getByPlaceholderText('New password')).toBeInTheDocument();
	});

	it('renders password confirm field', async () => {
		await renderPage();

		expect(
			screen.getByPlaceholderText('Confirm new password')
		).toBeInTheDocument();
	});

	it('renders submit button', async () => {
		await renderPage();

		expect(screen.getByText('Login')).toBeInTheDocument();
	});

	it('submits password change', async () => {
		await renderPage();

		userEvent.type(screen.getByPlaceholderText('New password'), 'new_pass');
		userEvent.type(
			screen.getByPlaceholderText('Confirm new password'),
			'new_pass'
		);
		userEvent.click(screen.getByText('Login'));

		await waitFor(() => {
			expect(fetchApi).toBeCalledWith(ResetPasswordDocument, {
				variables: {
					token: 'the_token',
					password: 'new_pass',
				},
			});
		});
	});

	it('does not submit mismatched password', async () => {
		await renderPage();

		userEvent.type(screen.getByPlaceholderText('New password'), 'pass_one');
		userEvent.type(
			screen.getByPlaceholderText('Confirm new password'),
			'pass_two'
		);
		userEvent.click(screen.getByText('Login'));

		await sleep();

		expect(fetchApi).not.toBeCalled();
	});

	it('displays password mismatch error', async () => {
		await renderPage();

		userEvent.type(screen.getByPlaceholderText('New password'), 'pass_one');
		userEvent.type(
			screen.getByPlaceholderText('Confirm new password'),
			'pass_two'
		);
		userEvent.click(screen.getByText('Login'));

		await waitFor(() => {
			expect(screen.getByText('Passwords must match')).toBeInTheDocument();
		});
	});

	it('requires password input', async () => {
		await renderPage();

		userEvent.click(screen.getByText('Login'));

		await waitFor(() => {
			expect(
				screen.getByText('Please type password twice')
			).toBeInTheDocument();
		});
	});

	it('requires password confirm input', async () => {
		await renderPage();

		userEvent.type(screen.getByPlaceholderText('New password'), 'the_pass');
		userEvent.click(screen.getByText('Login'));

		await waitFor(() => {
			expect(
				screen.getByText('Please type password twice')
			).toBeInTheDocument();
		});
	});

	it('displays api errors', async () => {
		loadResetPasswordResponse({
			success: false,
			errors: [{ message: 'the_error' }],
		});

		await renderPage();

		userEvent.type(screen.getByPlaceholderText('New password'), 'new_pass');
		userEvent.type(
			screen.getByPlaceholderText('Confirm new password'),
			'new_pass'
		);
		userEvent.click(screen.getByText('Login'));

		await waitFor(() => {
			expect(screen.getByText('the_error')).toBeInTheDocument();
		});
	});

	it('displays generic error on http error', async () => {
		await withMutedReactQueryLogger(async () => {
			when(fetchApi)
				.calledWith(ResetPasswordDocument, expect.anything())
				.mockRejectedValue('oops');

			await renderPage();

			userEvent.type(screen.getByPlaceholderText('New password'), 'new_pass');
			userEvent.type(
				screen.getByPlaceholderText('Confirm new password'),
				'new_pass'
			);
			userEvent.click(screen.getByText('Login'));

			await waitFor(() => {
				expect(
					screen.getByText(
						'Something went wrong while trying to reset your password'
					)
				).toBeInTheDocument();
			});
		});
	});

	it('displays success message', async () => {
		loadResetPasswordResponse({
			success: true,
			errors: [],
		});

		await renderPage();

		userEvent.type(screen.getByPlaceholderText('New password'), 'new_pass');
		userEvent.type(
			screen.getByPlaceholderText('Confirm new password'),
			'new_pass'
		);
		userEvent.click(screen.getByText('Login'));

		await waitFor(() => {
			expect(
				screen.getByText('Your password was successfully changed')
			).toBeInTheDocument();
		});
	});

	it('does not display success message if not successful', async () => {
		loadResetPasswordResponse({
			success: false,
			errors: [],
		});

		await renderPage();

		await userEvent.type(
			screen.getByPlaceholderText('New password'),
			'new_pass'
		);
		await userEvent.type(
			screen.getByPlaceholderText('Confirm new password'),
			'new_pass'
		);
		userEvent.click(screen.getByText('Login'));

		await waitFor(() => {
			expect(fetchApi).toBeCalledWith(LoginDocument, expect.anything());
		});

		expect(
			screen.queryByText('Your password was successfully changed')
		).not.toBeInTheDocument();
	});

	it('hides form on success', async () => {
		loadResetPasswordResponse({
			success: true,
			errors: [],
		});
		__loadQuery({
			token: 'the_token',
		});

		await renderPage();

		userEvent.type(screen.getByPlaceholderText('New password'), 'new_pass');
		userEvent.type(
			screen.getByPlaceholderText('Confirm new password'),
			'new_pass'
		);
		userEvent.click(screen.getByText('Login'));

		await waitFor(() => {
			expect(
				screen.getByText('Your password was successfully changed')
			).toBeInTheDocument();
		});

		expect(
			screen.queryByPlaceholderText('New password')
		).not.toBeInTheDocument();
	});
});
