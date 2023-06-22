import { hydrate } from '@tanstack/react-query';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import Cookie from 'js-cookie';
import get from 'lodash/get';
import { GetServerSidePropsContext } from 'next';
import { __loadRouter } from 'next/router';
import React from 'react';
import ReactTestUtils, { act } from 'react-dom/test-utils';

import { fetchApi } from '~lib/api/fetchApi';
import { login } from '~lib/api/login';
import { storeRequest } from '~lib/api/storeRequest';
import { buildServerRenderer } from '~lib/test/buildServerRenderer';
import { loadAuthGuardData } from '~lib/test/loadAuthGuardData';
import renderWithProviders from '~lib/test/renderWithProviders';
import Profile, { getServerSideProps } from '~pages/[language]/account/profile';
import makeQueryClient from '~src/lib/makeQueryClient';

import {
	GetProfileDataDocument,
	UpdateProfileDataDocument,
} from './__generated__/profile';

jest.mock('~lib/api/login');
jest.mock('~lib/api/storeRequest');
jest.mock('js-cookie');

const renderPage = buildServerRenderer(Profile, getServerSideProps);

const mockedLogin = login as jest.Mock;

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

	when(fetchApi)
		.calledWith(GetProfileDataDocument, expect.anything())
		.mockResolvedValue({
			me: {
				user: userBefore,
			},
		});

	when(fetchApi)
		.calledWith(UpdateProfileDataDocument, expect.anything())
		.mockResolvedValue({
			updateMyProfile: {
				authenticatedUser: {
					user: userAfter,
				},
			},
		});
}

describe('profile page', () => {
	beforeEach(() => {
		Cookie.get = jest.fn().mockReturnValue({ avSession: 'abc123' });
		try {
			(fetchApi as jest.Mock).mockReset();
		} catch {
			// ignore
		}
	});

	it('dehydrates user', async () => {
		jest.mocked(fetchApi).mockResolvedValue({
			me: {
				user: {
					givenName: 'the_name',
				},
			},
		});

		const { props } = (await getServerSideProps({
			req: {} as any,
		} as GetServerSidePropsContext)) as any;

		const queryClient = makeQueryClient();

		hydrate(queryClient, props.dehydratedState);

		const key = ['getProfileData', {}];
		const data = queryClient.getQueryData(key);

		expect(get(data, 'me.user.givenName')).toEqual('the_name');
	});

	it('includes first name', async () => {
		(fetchApi as jest.Mock).mockResolvedValue({
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
		await renderPage();

		expect(
			await screen.findByPlaceholderText('jane@example.com')
		).toBeInTheDocument();
	});

	it('makes login request', async () => {
		mockedLogin.mockRejectedValue(false);

		await renderPage();

		const emailField = await screen.findByPlaceholderText('jane@example.com');
		const passwordField = await screen.findByPlaceholderText('∗∗∗∗∗∗∗');
		const loginButton = await screen.findByText('Login');

		await userEvent.type(emailField, 'the_email');
		await userEvent.type(passwordField, 'the_password');

		await userEvent.click(loginButton);

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

		await userEvent.click(loginButton);

		expect(await screen.findByText('Login failed')).toBeInTheDocument();
	});

	it('prevents default form submission', async () => {
		const { getByTestId } = await renderPage();

		const event = {
			preventDefault: jest.fn(),
		};

		await act(async () => {
			ReactTestUtils.Simulate.submit(getByTestId('loginForm'), event);
		});

		await waitFor(() => expect(event.preventDefault).toHaveBeenCalled());
	});

	it('invalidates cache on successful login', async () => {
		mockedLogin.mockResolvedValue(true);

		await renderPage();

		loadData();

		await userEvent.click(await screen.findByText('Login'));

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

		await userEvent.click(getByText('Login'));

		expect(login).toBeCalledWith('the_email', 'the_password');

		await screen.findByText('Login failed');
	});

	it('does not fetch profile data if not logged in', async () => {
		__loadRouter({
			query: {},
		});
		Cookie.get = jest.fn().mockReturnValue({});
		(fetchApi as jest.Mock).mockResolvedValue({});

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

		const { getByDisplayValue } = await renderPage();

		await waitFor(() => {
			expect(getByDisplayValue('the_email')).toBeInTheDocument();
		});
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

		await userEvent.type(getByLabelText('Email'), '123');
		await userEvent.click(getByText('Save changes'));

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

		await userEvent.type(getByLabelText('Password'), 'the_password');
		await userEvent.click(getByText('Save changes'));

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

		when(fetchApi)
			.calledWith(GetProfileDataDocument, expect.anything())
			.mockResolvedValue({
				me: {
					user: {
						givenName: 'the_new_given_name',
						surname: 'the_new_surname',
						email: 'the_new_email',
					},
				},
			});

		const { getByText, getByDisplayValue } = await renderPage();

		await userEvent.click(getByText('Save changes'));

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

		when(fetchApi)
			.calledWith(GetProfileDataDocument, expect.anything())
			.mockResolvedValue({
				me: {
					user: {
						givenName: 'the_new_given_name',
						surname: 'the_new_surname',
						email: 'the_new_email',
					},
				},
			});

		const { getByText, getByDisplayValue } = await renderPage();

		await userEvent.click(getByText('Save changes'));

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

		const { getByText, getByDisplayValue } = await renderPage();

		await waitFor(() => {
			expect(getByDisplayValue('the_email')).toBeInTheDocument();
		});

		await userEvent.click(getByText('Save changes'));

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
