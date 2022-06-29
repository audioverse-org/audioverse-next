import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import { __loadRouter } from 'next/router';
import React from 'react';

import Login from '@components/molecules/login';
import { fetchApi } from '@lib/api/fetchApi';
import { LoginForgotPasswordDocument } from '@lib/generated/graphql';
import renderWithProviders from '@lib/test/renderWithProviders';
import withMutedReactQueryLogger from '@lib/test/withMutedReactQueryLogger';

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
		await renderWithProviders(<Login />, undefined);

		expect(screen.getByText('Forgot password?')).toBeInTheDocument();
	});

	it('triggers forgot password email', async () => {
		loadForgotPasswordResponse();

		await renderWithProviders(<Login />, undefined);

		userEvent.click(screen.getByText('Forgot password?'));

		userEvent.type(screen.getByPlaceholderText('Email address'), 'the_email');
		userEvent.click(screen.getByText('Send reset link'));
		await waitFor(() => {
			expect(fetchApi).toBeCalledWith(LoginForgotPasswordDocument, {
				variables: {
					email: 'the_email',
				},
			});
		});
	});

	it('shows forgot password success message', async () => {
		loadForgotPasswordResponse();

		await renderWithProviders(<Login />, undefined);

		userEvent.click(screen.getByText('Forgot password?'));

		userEvent.type(screen.getByPlaceholderText('Email address'), 'the_email');
		userEvent.click(screen.getByText('Send reset link'));

		await expect(
			screen.findByText(
				'Reset link sent. Check your email and use the link to reset your password.'
			)
		).resolves.toBeInTheDocument();

		await expect(
			screen.findByText('Check your email for a password reset link')
		).resolves.toBeInTheDocument();
	});

	it('shows API error', async () => {
		loadForgotPasswordResponse({
			success: false,
			errors: [{ message: 'the_error' }],
		});

		await renderWithProviders(<Login />, undefined);

		userEvent.click(screen.getByText('Forgot password?'));

		userEvent.type(screen.getByPlaceholderText('Email address'), 'the_email');
		userEvent.click(screen.getByText('Send reset link'));

		await waitFor(() => {
			expect(screen.getByText('the_error')).toBeInTheDocument();
		});
	});

	it('does not show success message if not success', async () => {
		loadForgotPasswordResponse({
			success: false,
			errors: [{ message: 'the_error' }],
		});

		await renderWithProviders(<Login />, undefined);

		userEvent.click(screen.getByText('Forgot password?'));

		userEvent.type(screen.getByPlaceholderText('Email address'), 'the_email');
		userEvent.click(screen.getByText('Send reset link'));

		await waitFor(() => {
			expect(screen.getByText('the_error')).toBeInTheDocument();
		});

		expect(
			screen.queryByText('Check your email for a password reset link')
		).not.toBeInTheDocument();
	});

	it('displays generic error on fetch error', async () => {
		await withMutedReactQueryLogger(async () => {
			when(fetchApi)
				.calledWith(LoginForgotPasswordDocument, expect.anything())
				.mockRejectedValue('oops');

			await renderWithProviders(<Login />, undefined);

			userEvent.click(screen.getByText('Forgot password?'));

			userEvent.type(screen.getByPlaceholderText('Email address'), 'the_email');
			userEvent.click(screen.getByText('Send reset link'));

			await waitFor(() => {
				expect(
					screen.getByText(
						'Something went wrong while trying to send a password reset link'
					)
				).toBeInTheDocument();
			});
		});
	});

	it('displays multiple errors', async () => {
		loadForgotPasswordResponse({
			success: false,
			errors: [{ message: 'error_one' }, { message: 'error_two' }],
		});

		await renderWithProviders(<Login />, undefined);

		userEvent.click(screen.getByText('Forgot password?'));

		userEvent.type(screen.getByPlaceholderText('Email address'), 'the_email');
		userEvent.click(screen.getByText('Send reset link'));

		await waitFor(() => {
			expect(screen.getByText('error_two')).toBeInTheDocument();
		});
	});
});
