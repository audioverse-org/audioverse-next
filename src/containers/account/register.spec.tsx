import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import Cookie from 'js-cookie';

import { fetchApi } from '~lib/api/fetchApi';
import { buildRenderer } from '~lib/test/buildRenderer';
import Register from '~pages/[language]/account/register';

import {
	RegisterDocument,
	RegisterSocialDocument,
} from './__generated__/register';
//import { __setFacebookResponse } from 'react-facebook-login/dist/facebook-login-render-props';
const __setFacebookResponse = (arg: {}) => {};

jest.mock('js-cookie');
jest.mock('react-google-login');

const renderPage = buildRenderer(Register);

describe('register page', () => {
	beforeEach(() => {
		Cookie.get = jest.fn().mockReturnValue({});
	});

	it('renders email field', async () => {
		const { getByPlaceholderText } = await renderPage();

		expect(getByPlaceholderText('jane@example.com')).toBeInTheDocument();
	});

	it('renders password field', async () => {
		const { getByPlaceholderText } = await renderPage();

		expect(getByPlaceholderText('∗∗∗∗∗∗∗')).toBeInTheDocument();
	});

	it('renders sign up button', async () => {
		const { getByText } = await renderPage();

		expect(getByText('Sign up')).toBeInTheDocument();
	});

	it('resets errors on click', async () => {
		const { getByText, getByPlaceholderText, queryByText } = await renderPage();

		await userEvent.click(getByText('Sign up'));

		await userEvent.type(getByPlaceholderText('∗∗∗∗∗∗∗'), 'pass');

		await userEvent.click(getByText('Sign up'));

		expect(queryByText('please type password twice')).not.toBeInTheDocument();
	});

	it('renders missing email error', async () => {
		const { getByText } = await renderPage();

		await userEvent.click(getByText('Sign up'));

		expect(getByText('email is required')).toBeInTheDocument();
	});

	it('registers user', async () => {
		const { getByText, getByPlaceholderText } = await renderPage();

		await userEvent.type(getByPlaceholderText('Jane'), 'Matthew');
		await userEvent.type(getByPlaceholderText('Doe'), 'Leffler');
		await userEvent.type(getByPlaceholderText('jane@example.com'), 'email');
		await userEvent.type(getByPlaceholderText('∗∗∗∗∗∗∗'), 'pass');

		await userEvent.click(getByText('Sign up'));

		await waitFor(() => {
			expect(fetchApi).toBeCalledWith(RegisterDocument, {
				variables: {
					email: 'email',
					password: 'pass',
					firstName: 'Matthew',
					lastName: 'Leffler',
				},
			});
		});
	});

	it('displays loading state', async () => {
		const { getByText, getByPlaceholderText } = await renderPage();

		await userEvent.type(getByPlaceholderText('jane@example.com'), 'email');
		await userEvent.type(getByPlaceholderText('∗∗∗∗∗∗∗'), 'pass');

		await userEvent.click(getByText('Sign up'));

		await waitFor(() => {
			expect(getByText('loading...')).toBeInTheDocument();
		});
	});

	it('displays returned errors', async () => {
		when(fetchApi)
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

		await userEvent.type(getByPlaceholderText('jane@example.com'), 'email');
		await userEvent.type(getByPlaceholderText('∗∗∗∗∗∗∗'), 'pass');
		await userEvent.click(getByText('Sign up'));

		expect(await screen.findByText('the_error_message')).toBeInTheDocument();
	});

	it('displays success message', async () => {
		const { getByText, getByPlaceholderText } = await renderPage();

		await userEvent.type(getByPlaceholderText('jane@example.com'), 'email');
		await userEvent.type(getByPlaceholderText('∗∗∗∗∗∗∗'), 'pass');

		await userEvent.click(getByText('Sign up'));

		await waitFor(() => {
			expect(getByText('loading...')).toBeInTheDocument();
		});
	});

	it('renders continue with Facebook', async () => {
		await renderPage();

		expect(
			await screen.findByText('Sign up with Facebook'),
		).toBeInTheDocument();
	});

	it('renders continue with Google', async () => {
		const { getByText } = await renderPage();

		expect(getByText('Sign up with Google')).toBeInTheDocument();
	});

	xit('renders google signon errors', async () => {
		when(fetchApi)
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

		await userEvent.click(getByText('Sign up with Google'));

		await waitFor(() => {
			expect(getByText('the_error_message')).toBeInTheDocument();
		});
	});

	xit('renders facebook signon errors', async () => {
		when(fetchApi)
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

		await userEvent.click(await screen.findByText('Sign up with Facebook'));

		await waitFor(() => {
			expect(getByText('the_error_message')).toBeInTheDocument();
		});
	});

	xit('renders social login success', async () => {
		const { getByText } = await renderPage();

		await userEvent.click(await screen.findByText('Sign up with Facebook'));

		await waitFor(() => {
			expect(getByText('success')).toBeInTheDocument();
		});
	});

	xit('hits api with facebook registration', async () => {
		await renderPage();

		await userEvent.click(await screen.findByText('Sign up with Facebook'));

		await waitFor(() => {
			expect(fetchApi).toBeCalledWith(RegisterSocialDocument, {
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

	xit('saves facebook login session token', async () => {
		when(fetchApi)
			.calledWith(RegisterSocialDocument, expect.anything())
			.mockResolvedValue({
				loginSocial: {
					authenticatedUser: {
						sessionToken: 'the_token',
					},
				},
			});

		await renderPage();

		await userEvent.click(await screen.findByText('Sign up with Facebook'));

		await waitFor(() => {
			expect(Cookie.set).toBeCalledWith('avSession', 'the_token', {
				expires: 14,
			});
		});
	});

	xit('does not register failed login', async () => {
		__setFacebookResponse({
			status: 300,
		});

		await renderPage();

		await userEvent.click(await screen.findByText('Sign up with Facebook'));

		await screen.findByText(/300/);

		expect(fetchApi).not.toBeCalledWith(
			RegisterSocialDocument,
			expect.anything(),
		);
	});

	xit('displays facebook login error', async () => {
		__setFacebookResponse({
			status: 300,
			statusText: 'FAILED',
		});

		const { getByText } = await renderPage();

		await userEvent.click(await screen.findByText('Sign up with Facebook'));

		await waitFor(() => {
			expect(
				getByText('300: Failed to login with Facebook'),
			).toBeInTheDocument();
		});
	});

	it('does not display form if user logged in', async () => {
		Cookie.get = jest.fn().mockReturnValue({ avSession: 'abc123' });

		const { queryByPlaceholderText } = await renderPage();

		expect(queryByPlaceholderText('email')).not.toBeInTheDocument();
	});

	xit('sends Google login data to API', async () => {
		const { getByText } = await renderPage();

		await userEvent.click(getByText('Sign up with Google'));

		await waitFor(() => {
			expect(fetchApi).toBeCalledWith(RegisterSocialDocument, {
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

	it('pops modal on guest info click', async () => {
		const { getByText, getByTestId } = await renderPage();

		await userEvent.click(getByTestId('guest-info-button2'));

		expect(getByText('Sign Up')).toBeInTheDocument();
	});
});

// link to login form on registration success
// doesn't attempt facebook login if login failed
// convert to dumb static page (not generated)
// display google client failure errors
