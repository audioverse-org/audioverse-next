import { fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import _ from 'lodash';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { QueryClient } from 'react-query';
import { hydrate } from 'react-query/hydration';

import * as api from '@lib/api';
import { login } from '@lib/api';
import { storeRequest } from '@lib/api/fetchApi';
import * as graphql from '@lib/generated/graphql';
import { mockedFetchApi, renderWithQueryProvider } from '@lib/test/helpers';
import Profile, { getServerSideProps } from '@pages/[language]/profile';

jest.mock('@lib/api/login');

async function renderPage() {
	const { props } = (await getServerSideProps({
		req: {} as any,
	} as GetServerSidePropsContext)) as any;

	return renderWithQueryProvider(<Profile {...props} />);
}

describe('profile page', () => {
	beforeEach(() => jest.resetAllMocks());

	it('renders', async () => {
		await renderPage();
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

		expect(_.get(data, 'me.user.givenName')).toEqual('the_name');
	});

	it('includes first name', async () => {
		mockedFetchApi.mockResolvedValue({
			me: {
				user: {
					givenName: 'first',
				},
			},
		});

		const { getByDisplayValue } = await renderPage();

		await waitFor(() => expect(getByDisplayValue('first')).toBeInTheDocument());
	});

	it('displays email field if unauthenticated', async () => {
		const { getByPlaceholderText } = await renderPage();

		expect(getByPlaceholderText('email')).toBeInTheDocument();
	});

	it('displays password field if unauthenticated', async () => {
		const { getByPlaceholderText } = await renderPage();

		expect(getByPlaceholderText('password')).toBeInTheDocument();
	});

	it('makes login request', async () => {
		jest.spyOn(api, 'login');

		const { getByPlaceholderText, getByText } = await renderPage();

		const emailField = getByPlaceholderText('email');
		const passwordField = getByPlaceholderText('password');
		const loginButton = getByText('login');

		await userEvent.type(emailField, 'the_email');
		await userEvent.type(passwordField, 'the_password');
		loginButton.click();

		expect(api.login).toHaveBeenCalledWith('the_email', 'the_password');
	});

	it('stores request', async () => {
		await getServerSideProps({
			req: 'the_request' as any,
		} as GetServerSidePropsContext);

		expect(storeRequest).toBeCalledWith('the_request');
	});

	it('catches login errors', async () => {
		jest.spyOn(api, 'login').mockImplementation(() => {
			throw new Error();
		});

		const { getByText } = await renderPage();

		const loginButton = getByText('login');

		loginButton.click();

		expect(getByText('Login failed')).toBeInTheDocument();
	});

	it('prevents default form submission', async () => {
		const { getByTestId } = await renderPage();

		const form = getByTestId('loginForm');

		const event = new Event('submit');
		Object.assign(event, { preventDefault: jest.fn() });

		fireEvent(form, event);

		expect(event.preventDefault).toHaveBeenCalled();
	});

	it('invalidates cache on successful login', async () => {
		mockedFetchApi.mockResolvedValue({
			me: {
				user: {
					givenName: 'first',
				},
			},
		});

		jest.spyOn(api, 'login').mockResolvedValue(true);

		const { getByText, getByDisplayValue } = await renderPage();

		userEvent.click(getByText('login'));

		await waitFor(() => expect(getByDisplayValue('first')).toBeInTheDocument());
	});

	it('logs in with email and password', async () => {
		jest.spyOn(graphql, 'useGetProfileDataQuery').mockReturnValue({
			data: undefined,
		} as any);

		const { getByText, getByPlaceholderText } = await renderPage();

		await userEvent.type(getByPlaceholderText('email'), 'the_email');
		await userEvent.type(getByPlaceholderText('password'), 'the_password');

		userEvent.click(getByText('login'));

		expect(login).toBeCalledWith('the_email', 'the_password');
	});
});
