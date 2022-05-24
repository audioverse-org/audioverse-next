import { RenderOptions, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import Cookies from 'js-cookie';
import React, { ReactElement } from 'react';
import { QueryClient } from 'react-query';

import withAuthGuard from '@components/HOCs/withAuthGuard';
import {
	GetWithAuthGuardDataDocument,
	RegisterSocialDocument,
} from '@lib/generated/graphql';
import { loadRouter, mockedFetchApi } from '@lib/test/helpers';
import renderWithProviders from '@lib/test/renderWithProviders';

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
	beforeEach(() => loadRouter({ query: {} }));
	it('displays login if no email', async () => {
		when(mockedFetchApi)
			.calledWith(GetWithAuthGuardDataDocument, expect.anything())
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
		Cookies.get = jest.fn().mockReturnValue({ avSession: 'abc123' });

		const { getByText, queryByText } = await render();

		await waitFor(() =>
			expect(queryByText('hello world')).not.toBeInTheDocument()
		);

		when(mockedFetchApi)
			.calledWith(RegisterSocialDocument, expect.anything())
			.mockResolvedValue({
				loginSocial: {
					errors: [],
					authenticatedUser: {
						sessionToken: 'the_token',
					},
				},
			});

		when(mockedFetchApi)
			.calledWith(GetWithAuthGuardDataDocument, expect.anything())
			.mockResolvedValue({
				me: {
					user: {
						email: 'the_email',
					},
				},
			});

		userEvent.click(getByText('Login with Google'));

		await waitFor(() => {
			expect(getByText('hello world')).toBeInTheDocument();
		});
	});
});
