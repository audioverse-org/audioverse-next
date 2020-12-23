import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import _ from 'lodash';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { QueryCache } from 'react-query';
import { hydrate } from 'react-query/hydration';

import * as api from '@lib/api';
import { getMe } from '@lib/api';
import { storeRequest } from '@lib/api/fetchApi';
import Profile, { getServerSideProps } from '@pages/[language]/profile';
import MyApp from '@pages/_app';

jest.mock('@lib/api/getMe');
jest.mock('@lib/api/login');
jest.mock('@lib/api/fetchApi');

async function renderPage() {
	const { props } = (await getServerSideProps({
		req: {} as any,
	} as GetServerSidePropsContext)) as any;
	return render(<MyApp Component={Profile as any} pageProps={props} />);
}

describe('profile page', () => {
	beforeEach(() => jest.resetAllMocks());

	it('renders', async () => {
		await renderPage();
	});

	it('dehydrates user', async () => {
		jest.spyOn(api, 'getMe').mockResolvedValue({
			name: 'the_name',
		} as any);

		const { props } = (await getServerSideProps({
			req: {} as any,
		} as GetServerSidePropsContext)) as any;

		const queryCache = new QueryCache();

		hydrate(queryCache, props.dehydratedState);

		const me = queryCache.getQueryData('me');

		expect(_.get(me, 'name')).toEqual('the_name');
	});

	it('includes first name', async () => {
		jest.spyOn(api, 'getMe').mockResolvedValue({
			givenName: 'first',
		} as any);

		const { getByDisplayValue } = await renderPage();

		expect(getByDisplayValue('first')).toBeInTheDocument();
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
		jest.spyOn(api, 'login').mockResolvedValue(true);

		const { getByText, getByDisplayValue } = await renderPage();

		jest.spyOn(api, 'getMe').mockResolvedValue({
			givenName: 'first',
		} as any);

		userEvent.click(getByText('login'));

		await waitFor(() => expect(getByDisplayValue('first')).toBeInTheDocument());
	});

	it('uses language id when getting me', async () => {
		await renderPage();

		expect(getMe).toBeCalledWith('ENGLISH');
	});
});
