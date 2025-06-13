import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import { __loadRouter } from 'next/router';
import React from 'react';

import Login from '~components/molecules/login';
import { fetchApi } from '~lib/api/fetchApi';
import renderWithProviders from '~lib/test/renderWithProviders';

import { LoginForgotPasswordDocument } from './__generated__/login';

function loadForgotPasswordResponse({
	success = true,
	errors = [],
}: { success?: boolean; errors?: { message: string }[] } = {}) {
	when(fetchApi)
		.calledWith(LoginForgotPasswordDocument, expect.anything())
		.mockResolvedValue({
			userRecover: {
				success,
				errors,
			},
		});
}

describe('login form', () => {
	beforeEach(() => __loadRouter({ query: {} }));
	it('renders forgot password link', async () => {
		const { getByText } = await renderWithProviders(<Login />, undefined);

		expect(getByText('Forgot password?'));
	});

	it('triggers forgot password email', async () => {
		loadForgotPasswordResponse();

		const { getByText } = await renderWithProviders(<Login />, undefined);

		await userEvent.click(getByText('Forgot password?'));

		const resetPasswordForm = screen.getByTestId('resetPasswordForm');
		await userEvent.type(
			within(resetPasswordForm).getByPlaceholderText('jane@example.com'),
			'helloo@example.com',
		);
		await userEvent.click(getByText('Send reset link'));
		await waitFor(() => {
			expect(fetchApi).toBeCalledWith(LoginForgotPasswordDocument, {
				variables: {
					email: 'helloo@example.com',
				},
			});
		});
	});

	it('shows forgot password success message', async () => {
		loadForgotPasswordResponse();

		const { getByText } = await renderWithProviders(<Login />, undefined);

		await userEvent.click(getByText('Forgot password?'));
		const resetPasswordForm = screen.getByTestId('resetPasswordForm');
		await userEvent.type(
			within(resetPasswordForm).getByPlaceholderText('jane@example.com'),
			'hello@example.com',
		);
		await userEvent.click(getByText('Send reset link'));

		expect(
			await screen.findByText(
				/Reset link sent. Check your email and use the link to reset your password./,
			),
		).toBeInTheDocument();
	});

	it('modal stays open if invalid email is entered', async () => {
		loadForgotPasswordResponse({
			success: false,
			errors: [{ message: 'the_error' }],
		});

		const { getByText } = await renderWithProviders(<Login />, undefined);

		await userEvent.click(getByText('Forgot password?'));

		const resetPasswordForm = screen.getByTestId('resetPasswordForm');
		await userEvent.type(
			within(resetPasswordForm).getByPlaceholderText('jane@example.com'),
			'invalid_email',
		);
		await userEvent.click(getByText('Send reset link'));

		await waitFor(() => {
			expect(getByText('Send reset link')).toBeInTheDocument();
		});
	});

	it('modal stays open if no email is entered', async () => {
		loadForgotPasswordResponse({
			success: false,
			errors: [{ message: 'the_error' }],
		});

		const { getByText } = await renderWithProviders(<Login />, undefined);

		await userEvent.click(getByText('Forgot password?'));
		const resetPasswordForm = screen.getByTestId('resetPasswordForm');
		await userEvent.type(
			within(resetPasswordForm).getByPlaceholderText('jane@example.com'),
			' ',
		);
		await userEvent.click(getByText('Send reset link'));

		expect(getByText('Send reset link')).toBeInTheDocument();
	});
});
