import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cookie from 'js-cookie';
import get from 'lodash/get';
import { GetServerSidePropsContext } from 'next';
import { __loadRouter } from 'next/router';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { hydrate, QueryClient } from 'react-query';

import { __load, fetchApi } from '@lib/api/fetchApi';
import { login } from '@lib/api/login';
import { storeRequest } from '@lib/api/storeRequest';
import {
	GetProfileDataDocument,
	UpdateProfileDataDocument,
} from '@lib/generated/graphql';
import { buildServerRenderer } from '@lib/test/buildServerRenderer';
import { loadAuthGuardData } from '@lib/test/loadAuthGuardData';
import renderWithProviders from '@lib/test/renderWithProviders';
import Profile, { getServerSideProps } from '@pages/[language]/account/profile';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

vi.mock('@lib/api/login');
vi.mock('@lib/api/storeRequest');
vi.mock('js-cookie');

const renderPage = buildServerRenderer(Profile, getServerSideProps);

const mockedLogin = login as Mock;

const userBefore = {
	givenName: 'the_given_name',
	surname: 'the_surname',
	email: 'the_email',
};

const userAfter = {
	givenName: 'the_new_given_name',
	surname: 'the_new_surname',
	email: 'the_new_email',
};

function loadData() {
	loadAuthGuardData();

	__load(GetProfileDataDocument, {
		me: {
			user: userBefore,
		},
	});

	__load(UpdateProfileDataDocument, {
		updateMyProfile: {
			authenticatedUser: {
				user: userAfter,
			},
		},
	});
}

describe('profile page', () => {
	beforeEach(() => {
		Cookie.get = vi.fn().mockReturnValue({ avSession: 'abc123' });
	});

	it('dehydrates user', async () => {
		(fetchApi as Mock).mockResolvedValue({
			me: {
				user: {
					givenName: 'the_name',
				},
			},
		});

		const { props } = (await getServerSideProps({
			req: {} as any,
		} as GetServerSidePropsContext)) as any;

		const queryClient = new QueryClient();

		hydrate(queryClient, props.dehydratedState);

		const data = queryClient.getQueryData('getProfileData');

		expect(get(data, 'me.user.givenName')).toEqual('the_name');
	});

	it('includes first name', async () => {
		(fetchApi as Mock).mockResolvedValue({
			me: {
				user: {
					givenName: 'first',
					email: 'the_email',
				},
			},
		});

		const { findByDisplayValue } = await renderPage();

		await findByDisplayValue('first');
	});

	it('displays email field if unauthenticated', async () => {
		const { getByPlaceholderText } = await renderPage();

		expect(getByPlaceholderText('jane@example.com')).toBeInTheDocument();
	});

	it('displays password field if unauthenticated', async () => {
		const { getByPlaceholderText } = await renderPage();

		expect(getByPlaceholderText('∗∗∗∗∗∗∗')).toBeInTheDocument();
	});

	it('makes login request', async () => {
		mockedLogin.mockRejectedValue(false);

		const { getByPlaceholderText, getByText } = await renderPage();

		const emailField = getByPlaceholderText('jane@example.com');
		const passwordField = getByPlaceholderText('∗∗∗∗∗∗∗');
		const loginButton = getByText('Login');

		userEvent.type(emailField, 'the_email');
		userEvent.type(passwordField, 'the_password');

		userEvent.click(loginButton);

		expect(login).toHaveBeenCalledWith('the_email', 'the_password');

		await screen.findByText('Login failed');
	});

	it('stores request', async () => {
		await getServerSideProps({
			req: 'the_request' as any,
		} as GetServerSidePropsContext);

		expect(storeRequest).toBeCalledWith('the_request');
	});

	it('catches login errors', async () => {
		mockedLogin.mockImplementation(() => {
			throw new Error();
		});

		await renderPage();

		const loginButton = screen.getByText('Login');

		userEvent.click(loginButton);

		expect(await screen.findByText('Login failed')).toBeInTheDocument();
	});

	it('prevents default form submission', async () => {
		await renderPage();

		const loginForm = screen.getByTestId('loginForm');

		const event = {
			preventDefault: vi.fn(),
		};

		ReactTestUtils.Simulate.submit(loginForm, event);

		await waitFor(() => expect(event.preventDefault).toHaveBeenCalled());
	});

	it('invalidates cache on successful login', async () => {
		mockedLogin.mockResolvedValue(true);

		const { getByText } = await renderPage();

		loadData();

		userEvent.click(getByText('Login'));

		await waitFor(() =>
			expect(screen.getByLabelText('First name')).toHaveValue('the_given_name')
		);
	});

	it('logs in with email and password', async () => {
		mockedLogin.mockRejectedValue('the_error');

		const { getByText, getByPlaceholderText, findByPlaceholderText } =
			await renderPage();

		await findByPlaceholderText('jane@example.com');

		await userEvent.type(getByPlaceholderText('jane@example.com'), 'the_email');
		await userEvent.type(getByPlaceholderText('∗∗∗∗∗∗∗'), 'the_password');

		userEvent.click(getByText('Login'));

		expect(login).toBeCalledWith('the_email', 'the_password');

		await screen.findByText('Login failed');
	});

	it('does not fetch profile data if not logged in', async () => {
		__loadRouter({
			query: {},
		});
		Cookie.get = vi.fn().mockReturnValue({});
		(fetchApi as Mock).mockResolvedValue({});

		await renderWithProviders(<Profile />, undefined);

		expect(fetchApi).not.toBeCalledWith(
			GetProfileDataDocument,
			expect.anything()
		);
	});

	it('renders email field', async () => {
		loadData();

		const { getByLabelText } = await renderPage();

		expect(getByLabelText('Email')).toBeInTheDocument();
	});

	it('loads user email', async () => {
		loadData();

		await renderPage();

		expect(await screen.findByDisplayValue('the_email')).toBeInTheDocument();
	});

	it('renders password field', async () => {
		loadData();

		const { getByLabelText } = await renderPage();

		expect(getByLabelText('Password')).toBeInTheDocument();
	});

	it('submits email change', async () => {
		loadData();

		const { getByLabelText, getByText, getByDisplayValue } = await renderPage();

		await waitFor(() => {
			expect(getByDisplayValue('the_email')).toBeInTheDocument();
		});

		userEvent.type(getByLabelText('Email'), '123');
		userEvent.click(getByText('Save changes'));

		await waitFor(() => {
			expect(fetchApi).toBeCalledWith(UpdateProfileDataDocument, {
				variables: {
					...userBefore,
					email: 'the_email123',
					password: null,
				},
			});
		});
	});

	it('submits password', async () => {
		loadData();

		const { getByLabelText, getByText, getByDisplayValue } = await renderPage();

		await waitFor(() => {
			expect(getByDisplayValue('the_email')).toBeInTheDocument();
		});

		userEvent.type(getByLabelText('Password'), 'the_password');
		userEvent.click(getByText('Save changes'));

		await waitFor(() => {
			expect(fetchApi).toBeCalledWith(UpdateProfileDataDocument, {
				variables: {
					...userBefore,
					password: 'the_password',
				},
			});
		});
	});

	it('loads mutated email on success', async () => {
		loadData();

		__load(GetProfileDataDocument, {
			me: {
				user: {
					givenName: 'the_new_given_name',
					surname: 'the_new_surname',
					email: 'the_new_email',
				},
			},
		});

		const { getByText, getByDisplayValue } = await renderPage();

		userEvent.click(getByText('Save changes'));

		await waitFor(() => {
			expect(getByDisplayValue('the_new_email')).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(fetchApi).toBeCalledWith(
				UpdateProfileDataDocument,
				expect.anything()
			);
		});
	});

	it('loads mutated name on success', async () => {
		loadData();

		__load(GetProfileDataDocument, {
			me: {
				user: {
					givenName: 'the_new_given_name',
					surname: 'the_new_surname',
					email: 'the_new_email',
				},
			},
		});

		const { getByText, getByDisplayValue } = await renderPage();

		userEvent.click(getByText('Save changes'));

		await waitFor(() => {
			expect(getByDisplayValue('the_new_given_name')).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(fetchApi).toBeCalledWith(
				UpdateProfileDataDocument,
				expect.anything()
			);
		});
	});

	it('sets email input type to email', async () => {
		loadData();

		const { getByDisplayValue } = await renderPage();

		await waitFor(() => {
			expect(getByDisplayValue('the_email')).toHaveAttribute('type', 'email');
		});
	});

	it('renders surname', async () => {
		loadData();

		const { getByDisplayValue } = await renderPage();

		await waitFor(() => {
			expect(getByDisplayValue('the_surname')).toBeInTheDocument();
		});
	});

	it('all initial user data', async () => {
		loadData();

		const { getByDisplayValue } = await renderPage();

		await waitFor(() => {
			Object.values(userBefore).map((v) => {
				expect(getByDisplayValue(v)).toBeInTheDocument();
			});
		});
	});

	it('saves all form data', async () => {
		loadData();

		const { getByText } = await renderPage();

		await screen.findByDisplayValue('the_email');

		userEvent.click(getByText('Save changes'));

		await waitFor(() => {
			expect(fetchApi).toBeCalledWith(UpdateProfileDataDocument, {
				variables: {
					password: null,
					...userBefore,
				},
			});
		});
	});
});
