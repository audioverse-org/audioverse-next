import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import Cookie from 'js-cookie';
import get from 'lodash/get';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { hydrate, QueryClient } from 'react-query';

import { login } from '@lib/api/login';
import { storeRequest } from '@lib/api/storeRequest';
import {
	GetProfileDataDocument,
	UpdateProfileDataDocument,
} from '@lib/generated/graphql';
import { buildServerRenderer } from '@lib/test/buildServerRenderer';
import { mockedFetchApi } from '@lib/test/helpers';
import { loadAuthGuardData } from '@lib/test/loadAuthGuardData';
import renderWithProviders from '@lib/test/renderWithProviders';
import Profile, { getServerSideProps } from '@pages/[language]/account/profile';

import { _loadRouter } from '../../__mocks__/next/router';

jest.mock('@lib/api/login');
jest.mock('@lib/api/storeRequest');
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

	when(mockedFetchApi)
		.calledWith(GetProfileDataDocument, expect.anything())
		.mockResolvedValue({
			me: {
				user: userBefore,
			},
		});

	when(mockedFetchApi)
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
	});

	it('dehydrates user', async () => {
		mockedFetchApi.mockResolvedValue({
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
		mockedFetchApi.mockResolvedValue({
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
		const { getByPlaceholderText, getByText } = await renderPage();

		const emailField = getByPlaceholderText('jane@example.com');
		const passwordField = getByPlaceholderText('∗∗∗∗∗∗∗');
		const loginButton = getByText('Login');

		await userEvent.type(emailField, 'the_email');
		await userEvent.type(passwordField, 'the_password');
		loginButton.click();

		expect(login).toHaveBeenCalledWith('the_email', 'the_password');
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

		const { getByText } = await renderPage();

		const loginButton = getByText('Login');

		loginButton.click();

		expect(getByText('Login failed')).toBeInTheDocument();
	});

	it('prevents default form submission', async () => {
		const { getByTestId } = await renderPage();

		const event = {
			preventDefault: jest.fn(),
		};

		ReactTestUtils.Simulate.submit(getByTestId('loginForm'), event);

		await waitFor(() => expect(event.preventDefault).toHaveBeenCalled());
	});

	it('invalidates cache on successful login', async () => {
		mockedLogin.mockResolvedValue(true);

		const { getByText, findByText } = await renderPage();

		userEvent.click(getByText('Login'));

		mockedFetchApi.mockResolvedValueOnce({
			me: {
				user: {
					givenName: 'first',
					email: 'the_email',
				},
			},
		});

		await findByText('First name');
	});

	it('logs in with email and password', async () => {
		const { getByText, getByPlaceholderText, findByPlaceholderText } =
			await renderPage();

		await findByPlaceholderText('jane@example.com');

		await userEvent.type(getByPlaceholderText('jane@example.com'), 'the_email');
		await userEvent.type(getByPlaceholderText('∗∗∗∗∗∗∗'), 'the_password');

		userEvent.click(getByText('Login'));

		expect(login).toBeCalledWith('the_email', 'the_password');
	});

	it('does not fetch profile data if not logged in', async () => {
		_loadRouter({
			query: {},
		});
		Cookie.get = jest.fn().mockReturnValue({});

		await renderWithProviders(<Profile />, undefined);

		expect(mockedFetchApi).not.toBeCalledWith(
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

		userEvent.type(getByLabelText('Email'), '123');
		userEvent.click(getByText('Save changes'));

		await waitFor(() => {
			expect(mockedFetchApi).toBeCalledWith(UpdateProfileDataDocument, {
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
			expect(mockedFetchApi).toBeCalledWith(UpdateProfileDataDocument, {
				variables: {
					...userBefore,
					password: 'the_password',
				},
			});
		});
	});

	it('loads mutated email on success', async () => {
		loadData();

		when(mockedFetchApi)
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

		userEvent.click(getByText('Save changes'));

		await waitFor(() => {
			expect(getByDisplayValue('the_new_email')).toBeInTheDocument();
		});
	});

	it('loads mutated name on success', async () => {
		loadData();

		when(mockedFetchApi)
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

		userEvent.click(getByText('Save changes'));

		await waitFor(() => {
			expect(getByDisplayValue('the_new_given_name')).toBeInTheDocument();
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

		userEvent.click(getByText('Save changes'));

		await waitFor(() => {
			expect(mockedFetchApi).toBeCalledWith(UpdateProfileDataDocument, {
				variables: {
					password: null,
					...userBefore,
				},
			});
		});
	});
});
