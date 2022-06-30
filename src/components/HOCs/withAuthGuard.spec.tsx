import {
	RenderOptions,
	RenderResult,
	screen,
	waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import Cookies from 'js-cookie';
import { __loadRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { QueryClient } from 'react-query';

import withAuthGuard from '@components/HOCs/withAuthGuard';
import { fetchApi } from '@lib/api/fetchApi';
import renderWithProviders from '@lib/test/renderWithProviders';
import { GetWithAuthGuardDataDocument } from '@components/HOCs/__generated__/withAuthGuard';
import { RegisterSocialDocument } from '@containers/account/__generated__/register';

function render() {
	const Comp = withAuthGuard(() => <>hello world</>);
	return (async function (
		ui: ReactElement,
		renderOptions?: RenderOptions
	): Promise<RenderResult & { queryClient: QueryClient }> {
		return renderWithProviders(ui, renderOptions);
	})(<Comp />);
}

describe('withAuthGuard', () => {
	beforeEach(() => __loadRouter({ query: {} }));
	it('displays login if no email', async () => {
		when(fetchApi)
			.calledWith(GetWithAuthGuardDataDocument, expect.anything())
			.mockResolvedValue({
				me: {
					user: {
						email: null,
					},
				},
			});

		await render();

		expect(screen.getByPlaceholderText('jane@example.com')).toBeInTheDocument();
	});

	it('offers social login', async () => {
		await render();

		expect(screen.getByText('Login with Google')).toBeInTheDocument();
	});

	it('displays content on successful social login', async () => {
		Cookies.get = jest.fn().mockReturnValue({ avSession: 'abc123' });

		await render();

		await waitFor(() =>
			expect(screen.queryByText('hello world')).not.toBeInTheDocument()
		);

		when(fetchApi)
			.calledWith(RegisterSocialDocument, expect.anything())
			.mockResolvedValue({
				loginSocial: {
					errors: [],
					authenticatedUser: {
						sessionToken: 'the_token',
					},
				},
			});

		when(fetchApi)
			.calledWith(GetWithAuthGuardDataDocument, expect.anything())
			.mockResolvedValue({
				me: {
					user: {
						email: 'the_email',
					},
				},
			});

		userEvent.click(screen.getByText('Login with Google'));

		await waitFor(() => {
			expect(screen.getByText('hello world')).toBeInTheDocument();
		});
	});
});
