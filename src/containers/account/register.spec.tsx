import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import Cookie from 'js-cookie';
// @ts-ignore because this is a helper function in manual mock
import { __setFacebookResponse } from 'react-facebook-login';

import {
	RegisterDocument,
	RegisterIsLoggedInDocument,
	RegisterSocialDocument,
} from '@lib/generated/graphql';
import { buildServerRenderer, mockedFetchApi, sleep } from '@lib/test/helpers';
import Register, {
	getServerSideProps,
} from '@pages/[language]/account/register';

jest.mock('js-cookie');
jest.mock('react-google-login');

const renderPage = buildServerRenderer(Register, getServerSideProps, {
	language: 'en',
});

describe('register page', () => {
	it('renders', async () => {
		await renderPage();
	});

	it('renders email field', async () => {
		const { getByPlaceholderText } = await renderPage();

		expect(getByPlaceholderText('email')).toBeInTheDocument();
	});

	it('renders password field', async () => {
		const { getByPlaceholderText } = await renderPage();

		expect(getByPlaceholderText('password')).toBeInTheDocument();
	});

	it('renders confirm password field', async () => {
		const { getByPlaceholderText } = await renderPage();

		expect(getByPlaceholderText('confirm password')).toBeInTheDocument();
	});

	it('renders sign up button', async () => {
		const { getByText } = await renderPage();

		expect(getByText('sign up')).toBeInTheDocument();
	});

	it('renders password mismatch error', async () => {
		const { getByText, getByPlaceholderText } = await renderPage();

		userEvent.type(getByPlaceholderText('password'), 'pass');
		userEvent.click(getByText('sign up'));

		expect(getByText('passwords do not match')).toBeInTheDocument();
	});

	it('does not render mismatch error if no mismatch', async () => {
		const { queryByText, getByText } = await renderPage();

		userEvent.click(getByText('sign up'));

		expect(queryByText('passwords do not match')).not.toBeInTheDocument();
	});

	it('renders missing passwords error', async () => {
		const { getByText } = await renderPage();

		userEvent.click(getByText('sign up'));

		expect(getByText('please type password twice')).toBeInTheDocument();
	});

	it('resets errors on click', async () => {
		const { getByText, getByPlaceholderText, queryByText } = await renderPage();

		userEvent.click(getByText('sign up'));

		userEvent.type(getByPlaceholderText('password'), 'pass');
		userEvent.type(getByPlaceholderText('confirm password'), 'pass');

		userEvent.click(getByText('sign up'));

		expect(queryByText('please type password twice')).not.toBeInTheDocument();
	});

	it('renders missing email error', async () => {
		const { getByText } = await renderPage();

		userEvent.click(getByText('sign up'));

		expect(getByText('email is required')).toBeInTheDocument();
	});

	it('registers user', async () => {
		const { getByText, getByPlaceholderText } = await renderPage();

		userEvent.type(getByPlaceholderText('email'), 'email');
		userEvent.type(getByPlaceholderText('password'), 'pass');
		userEvent.type(getByPlaceholderText('confirm password'), 'pass');

		userEvent.click(getByText('sign up'));

		await waitFor(() => {
			expect(mockedFetchApi).toBeCalledWith(RegisterDocument, {
				variables: {
					email: 'email',
					password: 'pass',
				},
			});
		});
	});

	it('displays loading state', async () => {
		const { getByText, getByPlaceholderText } = await renderPage();

		userEvent.type(getByPlaceholderText('email'), 'email');
		userEvent.type(getByPlaceholderText('password'), 'pass');
		userEvent.type(getByPlaceholderText('confirm password'), 'pass');

		userEvent.click(getByText('sign up'));

		await waitFor(() => {
			expect(getByText('loading...')).toBeInTheDocument();
		});
	});

	it('displays returned errors', async () => {
		when(mockedFetchApi)
			.calledWith(RegisterDocument, expect.anything())
			.mockResolvedValue({
				signup: {
					errors: [
						{
							message: 'the_error_message',
						},
					],
				},
			});

		const { getByText, getByPlaceholderText } = await renderPage();

		userEvent.type(getByPlaceholderText('email'), 'email');
		userEvent.type(getByPlaceholderText('password'), 'pass');
		userEvent.type(getByPlaceholderText('confirm password'), 'pass');

		userEvent.click(getByText('sign up'));

		await waitFor(() => {
			expect(getByText('the_error_message')).toBeInTheDocument();
		});
	});

	it('displays success message', async () => {
		const { getByText, getByPlaceholderText } = await renderPage();

		userEvent.type(getByPlaceholderText('email'), 'email');
		userEvent.type(getByPlaceholderText('password'), 'pass');
		userEvent.type(getByPlaceholderText('confirm password'), 'pass');

		userEvent.click(getByText('sign up'));

		await waitFor(() => {
			expect(getByText('success')).toBeInTheDocument();
		});
	});

	it('renders continue with Facebook', async () => {
		const { getByText } = await renderPage();

		expect(getByText('continue with Facebook')).toBeInTheDocument();
	});

	it('renders continue with Google', async () => {
		const { getByText } = await renderPage();

		expect(getByText('continue with Google')).toBeInTheDocument();
	});

	it('renders google signon errors', async () => {
		when(mockedFetchApi)
			.calledWith(RegisterSocialDocument, expect.anything())
			.mockResolvedValue({
				loginSocial: {
					errors: [
						{
							message: 'the_error_message',
						},
					],
				},
			});

		const { getByText } = await renderPage();

		userEvent.click(getByText('continue with Google'));

		await waitFor(() => {
			expect(getByText('the_error_message')).toBeInTheDocument();
		});
	});

	it('renders facebook signon errors', async () => {
		when(mockedFetchApi)
			.calledWith(RegisterSocialDocument, expect.anything())
			.mockResolvedValue({
				loginSocial: {
					errors: [
						{
							message: 'the_error_message',
						},
					],
				},
			});

		const { getByText } = await renderPage();

		userEvent.click(getByText('continue with Facebook'));

		await waitFor(() => {
			expect(getByText('the_error_message')).toBeInTheDocument();
		});
	});

	it('renders social login success', async () => {
		const { getByText } = await renderPage();

		userEvent.click(getByText('continue with Facebook'));

		await waitFor(() => {
			expect(getByText('success')).toBeInTheDocument();
		});
	});

	it('hits api with facebook registration', async () => {
		const { getByText } = await renderPage();

		userEvent.click(getByText('continue with Facebook'));

		await waitFor(() => {
			expect(mockedFetchApi).toBeCalledWith(RegisterSocialDocument, {
				variables: {
					socialId: 'the_user_id',
					socialName: 'FACEBOOK',
					socialToken: 'the_access_token',
					givenName: 'First',
					surname: 'Last',
				},
			});
		});
	});

	it('saves facebook login session token', async () => {
		when(mockedFetchApi)
			.calledWith(RegisterSocialDocument, expect.anything())
			.mockResolvedValue({
				loginSocial: {
					authenticatedUser: {
						sessionToken: 'the_token',
					},
				},
			});

		const { getByText } = await renderPage();

		userEvent.click(getByText('continue with Facebook'));

		await waitFor(() => {
			expect(Cookie.set).toBeCalledWith('avSession', 'the_token');
		});
	});

	it('does not register failed login', async () => {
		__setFacebookResponse({
			status: 'FAILED',
		});

		const { getByText } = await renderPage();

		userEvent.click(getByText('continue with Facebook'));

		await sleep();

		expect(mockedFetchApi).not.toBeCalledWith(
			RegisterSocialDocument,
			expect.anything()
		);
	});

	it('displays facebook login error', async () => {
		__setFacebookResponse({
			status: 'FAILED',
		});

		const { getByText } = await renderPage();

		userEvent.click(getByText('continue with Facebook'));

		await waitFor(() => {
			expect(getByText('FAILED')).toBeInTheDocument();
		});
	});

	it('does not display form if user logged in', async () => {
		when(mockedFetchApi)
			.calledWith(RegisterIsLoggedInDocument, expect.anything())
			.mockResolvedValue({
				me: {
					user: {
						email: 'the_email',
					},
				},
			});

		const { queryByPlaceholderText } = await renderPage();

		expect(queryByPlaceholderText('email')).not.toBeInTheDocument();
	});

	it('sends Google login data to API', async () => {
		const { getByText } = await renderPage();

		userEvent.click(getByText('continue with Google'));

		await waitFor(() => {
			expect(mockedFetchApi).toBeCalledWith(RegisterSocialDocument, {
				variables: {
					socialId: 'the_user_id',
					socialName: 'GOOGLE',
					socialToken: 'the_access_token',
					givenName: 'First',
					surname: 'Last',
				},
			});
		});
	});
});

// link to login form on registration success
// doesn't attempt facebook login if login failed
// convert to dumb static page (not generated)
// display google client failure errors
