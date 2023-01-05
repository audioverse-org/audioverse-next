import { RenderOptions, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cookies from 'js-cookie';
import { __loadRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { QueryClient } from 'react-query';

import withAuthGuard from '@components/HOCs/withAuthGuard';
import { __load } from '@lib/api/fetchApi';
import {
	GetWithAuthGuardDataDocument,
	RegisterSocialDocument,
} from '@lib/generated/graphql';
import renderWithProviders from '@lib/test/renderWithProviders';
import { beforeEach, describe, expect, it, vi } from 'vitest';

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
		__load(GetWithAuthGuardDataDocument, {
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
		Cookies.get = vi.fn().mockReturnValue({ avSession: 'abc123' });

		const { getByText, queryByText } = await render();

		await waitFor(() =>
			expect(queryByText('hello world')).not.toBeInTheDocument()
		);

		__load(RegisterSocialDocument, {
			loginSocial: {
				errors: [],
				authenticatedUser: {
					sessionToken: 'the_token',
				},
			},
		});

		__load(GetWithAuthGuardDataDocument, {
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
