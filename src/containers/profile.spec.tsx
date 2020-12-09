import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import _ from 'lodash';
import React from 'react';
import { QueryCache } from 'react-query';
import { hydrate } from 'react-query/hydration';

import * as api from '@lib/api';
import Profile, { getServerProps } from '@pages/[language]/profile';
import MyApp from '@pages/_app';

jest.mock('@lib/api/getMe');
jest.mock('@lib/api/login');

async function renderPage() {
	const { props } = await getServerProps();
	return render(<MyApp Component={Profile} pageProps={props} />);
}

describe('profile page', () => {
	beforeEach(() => jest.resetAllMocks());

	it('renders', async () => {
		await renderPage();
	});

	it('dehydrates user', async () => {
		jest.spyOn(api, 'getMe').mockResolvedValue({
			name: 'the_name',
		});

		const { props } = await getServerProps();

		const queryCache = new QueryCache();

		hydrate(queryCache, props.dehydratedState);

		const me = queryCache.getQueryData('me');

		expect(_.get(me, 'name')).toEqual('the_name');
	});

	it('includes first name', async () => {
		jest.spyOn(api, 'getMe').mockResolvedValue({
			givenName: 'first',
		});

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
});
