import { QueryClient } from '@tanstack/react-query';
import { RenderOptions, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import Cookies from 'js-cookie';
import { __loadRouter } from 'next/router';
import React, { ReactElement } from 'react';

import { RegisterSocialDocument } from '~containers/account/__generated__/register';
import { fetchApi } from '~lib/api/fetchApi';
import { GetIsAuthenticatedDocument } from '~lib/hooks/__generated__/useIsAuthenticated';
import renderWithProviders from '~lib/test/renderWithProviders';
import AndAuthGuard from '~src/components/templates/andAuthGuard';

function render() {
	const Comp = () => <>hello world</>;
	return (async function (
		ui: ReactElement,
		renderOptions?: RenderOptions,
	): Promise<RenderResult & { queryClient: QueryClient }> {
		return renderWithProviders(ui, renderOptions);
	})(
		<AndAuthGuard>
			<Comp />
		</AndAuthGuard>,
	);
}

describe('andAuthGuard', () => {
	beforeEach(() => __loadRouter({ query: {} }));
	it('displays login if no email', async () => {
		when(fetchApi)
			.calledWith(GetIsAuthenticatedDocument, expect.anything())
			.mockResolvedValue({
				me: {
					user: {
						email: null,
					},
				},
			});

		const { getByPlaceholderText } = await render();

		expect(getByPlaceholderText('jane@example.com')).toBeInTheDocument();
	});

	it('offers social login', async () => {
		const { getByText } = await render();

		expect(getByText('Login with Google')).toBeInTheDocument();
	});

	it('displays content on successful social login', async () => {
		Cookies.get = jest.fn().mockReturnValue({ session_token: 'abc123' });

		const { getByText, queryByText } = await render();

		await waitFor(() =>
			expect(queryByText('hello world')).not.toBeInTheDocument(),
		);

		when(fetchApi)
			.calledWith(RegisterSocialDocument, expect.anything())
			.mockResolvedValue({
				loginSocial: {
					errors: [],
					authenticatedUser: {
						sessionToken: 'the_token',
						user: {
							id: 1,
							givenName: 'test',
							surname: 'test',
							email: 'test@test.com',
						},
					},
				},
			});

		when(fetchApi)
			.calledWith(GetIsAuthenticatedDocument, expect.anything())
			.mockResolvedValue({
				me: {
					user: {
						email: 'the_email',
					},
				},
			});

		await userEvent.click(getByText('Login with Google'));

		await waitFor(() => {
			expect(getByText('hello world')).toBeInTheDocument();
		});
	});
});
