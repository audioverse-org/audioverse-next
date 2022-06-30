import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import Cookie from 'js-cookie';
import { __setFacebookResponse } from 'react-facebook-login/dist/facebook-login-render-props';

import { fetchApi } from '@lib/api/fetchApi';
import { sleep } from '@lib/sleep';
import { buildRenderer } from '@lib/test/buildRenderer';
import Register from '@pages/[language]/account/register';
import { useGoogleLogin } from 'react-google-login';
import { __loadRouter } from 'next/router';
import {
	RegisterDocument,
	RegisterSocialDocument,
} from '@containers/account/__generated__/register';

jest.mock('js-cookie');

const renderPage = buildRenderer(Register);

const router = { push: () => jest.fn().mockResolvedValue(true) } as any;

const mockUseGoogleLogin = useGoogleLogin as jest.Mock;

describe('register page', () => {
	beforeEach(() => {
		Cookie.get = jest.fn().mockReturnValue({});
		__loadRouter(router);
	});

	it('renders email field', async () => {
		await renderPage();

		expect(screen.getByPlaceholderText('jane@example.com')).toBeInTheDocument();
	});

	it('renders password field', async () => {
		await renderPage();

		expect(screen.getByPlaceholderText('∗∗∗∗∗∗∗')).toBeInTheDocument();
	});

	it('renders sign up button', async () => {
		await renderPage();

		expect(screen.getByText('Sign up')).toBeInTheDocument();
	});

	it('resets errors on click', async () => {
		await renderPage();

		userEvent.click(screen.getByText('Sign up'));

		userEvent.type(screen.getByPlaceholderText('∗∗∗∗∗∗∗'), 'pass');

		userEvent.click(screen.getByText('Sign up'));

		expect(
			screen.queryByText('please type password twice')
		).not.toBeInTheDocument();
	});

	it('renders missing email error', async () => {
		await renderPage();

		userEvent.click(screen.getByText('Sign up'));

		expect(screen.getByText('email is required')).toBeInTheDocument();
	});

	it('registers user', async () => {
		await renderPage();

		userEvent.type(screen.getByPlaceholderText('Jane'), 'Matthew');
		userEvent.type(screen.getByPlaceholderText('Doe'), 'Leffler');
		userEvent.type(screen.getByPlaceholderText('jane@example.com'), 'email');
		userEvent.type(screen.getByPlaceholderText('∗∗∗∗∗∗∗'), 'pass');

		userEvent.click(screen.getByText('Sign up'));

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
		await renderPage();

		userEvent.type(screen.getByPlaceholderText('jane@example.com'), 'email');
		userEvent.type(screen.getByPlaceholderText('∗∗∗∗∗∗∗'), 'pass');

		userEvent.click(screen.getByText('Sign up'));

		await waitFor(() => {
			expect(screen.getByText('loading...')).toBeInTheDocument();
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

		await renderPage();

		userEvent.type(screen.getByPlaceholderText('jane@example.com'), 'email');
		userEvent.type(screen.getByPlaceholderText('∗∗∗∗∗∗∗'), 'pass');

		userEvent.click(screen.getByText('Sign up'));

		await waitFor(() => {
			expect(screen.getByText('the_error_message')).toBeInTheDocument();
		});
	});

	it('renders continue with Facebook', async () => {
		await renderPage();

		expect(screen.getByText('Sign up with Facebook')).toBeInTheDocument();
	});

	it('renders continue with Google', async () => {
		await renderPage();

		expect(screen.getByText('Sign up with Google')).toBeInTheDocument();
	});

	it('renders google signon errors', async () => {
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

		await renderPage();

		userEvent.click(screen.getByText('Sign up with Google'));

		await waitFor(() => {
			expect(screen.getByText('the_error_message')).toBeInTheDocument();
		});
	});

	it('renders facebook signon errors', async () => {
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

		await renderPage();

		userEvent.click(screen.getByText('Sign up with Facebook'));

		await waitFor(() => {
			expect(screen.getByText('the_error_message')).toBeInTheDocument();
		});
	});

	it('renders social login success', async () => {
		await renderPage();

		userEvent.click(screen.getByText('Sign up with Facebook'));

		await waitFor(() => {
			expect(screen.getByText('success')).toBeInTheDocument();
		});
	});

	it('hits api with facebook registration', async () => {
		await renderPage();

		userEvent.click(screen.getByText('Sign up with Facebook'));

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

	it('saves facebook login session token', async () => {
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

		userEvent.click(screen.getByText('Sign up with Facebook'));

		await waitFor(() => {
			expect(Cookie.set).toBeCalledWith('avSession', 'the_token', {
				expires: 14,
			});
		});
	});

	it('does not register failed login', async () => {
		__setFacebookResponse({
			status: 300,
		});

		await renderPage();

		await waitFor(() => {
			expect(screen.getByText('Sign up with Facebook')).toBeInTheDocument();
		});

		userEvent.click(screen.getByText('Sign up with Facebook'));

		await sleep();

		expect(fetchApi).not.toBeCalledWith(
			RegisterSocialDocument,
			expect.anything()
		);
	});

	it('displays facebook login error', async () => {
		__setFacebookResponse({
			status: 300,
		});

		await renderPage();

		userEvent.click(screen.getByText('Sign up with Facebook'));

		await waitFor(() => {
			expect(
				screen.getByText('300: Facebook login was unsuccessful')
			).toBeInTheDocument();
		});
	});

	it('does not display form if user logged in', async () => {
		Cookie.get = jest.fn().mockReturnValue({ avSession: 'abc123' });

		await renderPage();

		expect(screen.queryByPlaceholderText('email')).not.toBeInTheDocument();
	});

	it('sends Google login data to API', async () => {
		await renderPage();

		userEvent.click(screen.getByText('Sign up with Google'));

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
		await renderPage();

		userEvent.click(screen.getByTestId('guest-info-button'));

		expect(screen.getByText('Continue as guest?')).toBeInTheDocument();
	});

	it('displays Google login error', async () => {
		await renderPage();

		await expect(useGoogleLogin).toBeCalled();

		act(() => {
			mockUseGoogleLogin.mock.calls[0][0].onFailure();
		});

		expect(
			screen.getByText('Error: Google login was unsuccessful')
		).toBeInTheDocument();
	});

	it('displays Google login error when offline', async () => {
		await renderPage();

		await expect(useGoogleLogin).toBeCalled();

		act(() => {
			mockUseGoogleLogin.mock.calls[0][0].onSuccess({});
		});

		expect(
			screen.getByText('Error: Google login was unsuccessful')
		).toBeInTheDocument();
	});
});

// link to login form on registration success
// doesn't attempt facebook login if login failed
// convert to dumb static page (not generated)
// display google client failure errors
