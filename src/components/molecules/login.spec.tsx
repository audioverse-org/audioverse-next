import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { __loadRouter } from 'next/router';
import React from 'react';

import Login from '@/components/molecules/login';
import { __load, __loadReject, fetchApi } from '@/lib/api/fetchApi';
import { LoginForgotPasswordDocument } from '@/lib/generated/graphql';
import renderWithProviders from '@/lib/test/renderWithProviders';
import withMutedReactQueryLogger from '@/lib/test/withMutedReactQueryLogger';
import { beforeEach, describe, expect, it } from 'vitest';

function loadForgotPasswordResponse({
	success = true,
	errors = [],
}: { success?: boolean; errors?: { message: string }[] } = {}) {
	__load(LoginForgotPasswordDocument, {
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

		const { getByText, getByPlaceholderText } = await renderWithProviders(
			<Login />,
			undefined
		);

		userEvent.click(getByText('Forgot password?'));

		userEvent.type(getByPlaceholderText('Email address'), 'the_email');
		userEvent.click(getByText('Send reset link'));
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

		const { getByText, getByPlaceholderText } = await renderWithProviders(
			<Login />,
			undefined
		);

		userEvent.click(getByText('Forgot password?'));
		userEvent.type(getByPlaceholderText('Email address'), 'the_email');
		userEvent.click(getByText('Send reset link'));

		expect(await screen.findByText(/Reset link sent/)).toBeInTheDocument();

		await screen.findByText('Check your email for a password reset link');
	});

	it('shows API error', async () => {
		loadForgotPasswordResponse({
			success: false,
			errors: [{ message: 'the_error' }],
		});

		const { getByText, getByPlaceholderText } = await renderWithProviders(
			<Login />,
			undefined
		);

		userEvent.click(getByText('Forgot password?'));

		userEvent.type(getByPlaceholderText('Email address'), 'the_email');
		userEvent.click(getByText('Send reset link'));

		await waitFor(() => {
			expect(getByText('the_error'));
		});
	});

	it('does not show success message if not success', async () => {
		loadForgotPasswordResponse({
			success: false,
			errors: [{ message: 'the_error' }],
		});

		const { getByText, getByPlaceholderText, queryByText } =
			await renderWithProviders(<Login />, undefined);

		userEvent.click(getByText('Forgot password?'));

		userEvent.type(getByPlaceholderText('Email address'), 'the_email');
		userEvent.click(getByText('Send reset link'));

		await waitFor(() => {
			expect(getByText('the_error'));
		});

		expect(
			queryByText('Check your email for a password reset link')
		).not.toBeInTheDocument();
	});

	it('displays generic error on fetch error', async () => {
		await withMutedReactQueryLogger(async () => {
			__loadReject(LoginForgotPasswordDocument, 'oops');

			const { getByText, getByPlaceholderText } = await renderWithProviders(
				<Login />,
				undefined
			);

			userEvent.click(getByText('Forgot password?'));

			userEvent.type(getByPlaceholderText('Email address'), 'the_email');
			userEvent.click(getByText('Send reset link'));

			await waitFor(() => {
				expect(
					getByText(
						'Something went wrong while trying to send a password reset link'
					)
				);
			});
		});
	});

	it('displays multiple errors', async () => {
		loadForgotPasswordResponse({
			success: false,
			errors: [{ message: 'error_one' }, { message: 'error_two' }],
		});

		const { getByText, getByPlaceholderText } = await renderWithProviders(
			<Login />,
			undefined
		);

		userEvent.click(getByText('Forgot password?'));

		userEvent.type(getByPlaceholderText('Email address'), 'the_email');
		userEvent.click(getByText('Send reset link'));

		await waitFor(() => {
			expect(getByText('error_two'));
		});
	});
});
