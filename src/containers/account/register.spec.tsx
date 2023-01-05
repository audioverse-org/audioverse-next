import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cookie from 'js-cookie';
import { __setFacebookResponse } from 'react-facebook-login/dist/facebook-login-render-props';

import { __load, fetchApi } from '@lib/api/fetchApi';
import {
	RegisterDocument,
	RegisterSocialDocument,
} from '@lib/generated/graphql';
import { buildRenderer } from '@lib/test/buildRenderer';
import Register from '@pages/[language]/account/register';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import withMutedReactQueryLogger from '@lib/test/withMutedReactQueryLogger';
import { buildLoader } from '@lib/test/buildLoader';

vi.mock('js-cookie');
vi.mock('react-google-login');

const renderPage = buildRenderer(Register);
const router = { push: () => vi.fn().mockResolvedValue(true) } as any;
const loadRegisterData = buildLoader(RegisterDocument, {
	signup: {
		errors: [],
	},
});
const loadRegisterSocialData = buildLoader(RegisterSocialDocument, {});

describe('register page', () => {
	beforeEach(() => {
		Cookie.get = vi.fn().mockReturnValue({});
		loadRegisterData();
		loadRegisterSocialData();
	});

	it('renders', async () => {
		await renderPage({ router });
	});

	it('renders email field', async () => {
		const { getByPlaceholderText } = await renderPage({ router });

		expect(getByPlaceholderText('jane@example.com')).toBeInTheDocument();
	});

	it('renders password field', async () => {
		const { getByPlaceholderText } = await renderPage({ router });

		expect(getByPlaceholderText('∗∗∗∗∗∗∗')).toBeInTheDocument();
	});

	it('renders sign up button', async () => {
		const { getByText } = await renderPage({ router });

		expect(getByText('Sign up')).toBeInTheDocument();
	});

	it('resets errors on click', async () => {
		const { getByText, getByPlaceholderText, queryByText } = await renderPage({
			router,
		});

		userEvent.click(getByText('Sign up'));

		userEvent.type(getByPlaceholderText('∗∗∗∗∗∗∗'), 'pass');

		userEvent.click(getByText('Sign up'));

		expect(queryByText('please type password twice')).not.toBeInTheDocument();
	});

	it('renders missing email error', async () => {
		const { getByText } = await renderPage({ router });

		userEvent.click(getByText('Sign up'));

		expect(getByText('email is required')).toBeInTheDocument();
	});

	it('registers user', async () => {
		const { getByText, getByPlaceholderText } = await renderPage({ router });

		userEvent.type(getByPlaceholderText('Jane'), 'Matthew');
		userEvent.type(getByPlaceholderText('Doe'), 'Leffler');
		userEvent.type(getByPlaceholderText('jane@example.com'), 'email');
		userEvent.type(getByPlaceholderText('∗∗∗∗∗∗∗'), 'pass');

		userEvent.click(getByText('Sign up'));

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
		await renderPage({ router });

		userEvent.type(screen.getByPlaceholderText('jane@example.com'), 'email');
		userEvent.type(screen.getByPlaceholderText('∗∗∗∗∗∗∗'), 'pass');
		userEvent.click(screen.getByText('Sign up'));

		expect(await screen.findByText('loading...')).toBeInTheDocument();
	});

	it('displays returned errors', async () => {
		__load(RegisterDocument, {
			signup: {
				errors: [
					{
						message: 'the_error_message',
					},
				],
			},
		});

		const { getByText, getByPlaceholderText } = await renderPage({ router });

		userEvent.type(getByPlaceholderText('jane@example.com'), 'email');
		userEvent.type(getByPlaceholderText('∗∗∗∗∗∗∗'), 'pass');
		userEvent.click(getByText('Sign up'));

		expect(await screen.findByText('the_error_message')).toBeInTheDocument();
	});

	it('displays success message', async () => {
		const { getByText, getByPlaceholderText } = await renderPage({ router });

		userEvent.type(getByPlaceholderText('jane@example.com'), 'email');
		userEvent.type(getByPlaceholderText('∗∗∗∗∗∗∗'), 'pass');

		userEvent.click(getByText('Sign up'));

		await waitFor(() => {
			expect(getByText('loading...')).toBeInTheDocument();
		});
	});

	it('renders continue with Facebook', async () => {
		await renderPage({ router });

		expect(
			await screen.findByText('Sign up with Facebook')
		).toBeInTheDocument();
	});

	it('renders continue with Google', async () => {
		const { getByText } = await renderPage({ router });

		expect(getByText('Sign up with Google')).toBeInTheDocument();
	});

	it('renders google signon errors', async () => {
		__load(RegisterSocialDocument, {
			loginSocial: {
				errors: [
					{
						message: 'the_error_message',
					},
				],
			},
		});

		const { getByText } = await renderPage({ router });

		userEvent.click(getByText('Sign up with Google'));

		await waitFor(() => {
			expect(getByText('the_error_message')).toBeInTheDocument();
		});
	});

	it('renders facebook signon errors', async () => {
		await withMutedReactQueryLogger(async () => {
			__load(RegisterSocialDocument, {
				loginSocial: {
					errors: [
						{
							message: 'the_error_message',
						},
					],
				},
			});

			const { getByText } = await renderPage({ router });

			userEvent.click(await screen.findByText('Sign up with Facebook'));

			await waitFor(() => {
				expect(getByText('the_error_message')).toBeInTheDocument();
			});
		});
	});

	it('renders social login success', async () => {
		__load(RegisterSocialDocument, {
			loginSocial: {
				authenticatedUser: {
					sessionToken: 'the_token',
				},
			},
		});

		const { getByText } = await renderPage({ router });

		userEvent.click(await screen.findByText('Sign up with Facebook'));

		await waitFor(() => {
			expect(getByText('success')).toBeInTheDocument();
		});
	});

	it('hits api with facebook registration', async () => {
		__load(RegisterSocialDocument, {
			loginSocial: {
				authenticatedUser: {
					sessionToken: 'the_token',
				},
			},
		});

		await renderPage({ router });

		userEvent.click(await screen.findByText('Sign up with Facebook'));

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
		__load(RegisterSocialDocument, {
			loginSocial: {
				authenticatedUser: {
					sessionToken: 'the_token',
				},
			},
		});

		await renderPage({ router });

		userEvent.click(await screen.findByText('Sign up with Facebook'));

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

		await renderPage({ router });

		userEvent.click(await screen.findByText('Sign up with Facebook'));

		await screen.findByText(/300/);

		expect(fetchApi).not.toBeCalledWith(
			RegisterSocialDocument,
			expect.anything()
		);
	});

	it('displays facebook login error', async () => {
		__setFacebookResponse({
			status: 300,
			statusText: 'FAILED',
		});

		const { getByText } = await renderPage({ router });

		userEvent.click(await screen.findByText('Sign up with Facebook'));

		await waitFor(() => {
			expect(getByText('300: FAILED')).toBeInTheDocument();
		});
	});

	it('does not display form if user logged in', async () => {
		Cookie.get = vi.fn().mockReturnValue({ avSession: 'abc123' });

		const { queryByPlaceholderText } = await renderPage({ router });

		expect(queryByPlaceholderText('email')).not.toBeInTheDocument();
	});

	it('sends Google login data to API', async () => {
		__load(RegisterSocialDocument, {
			loginSocial: {
				authenticatedUser: {
					sessionToken: 'the_token',
				},
			},
		});

		const { getByText } = await renderPage({ router });

		userEvent.click(getByText('Sign up with Google'));

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

		userEvent.click(getByTestId('guest-info-button'));

		expect(getByText('Continue as guest?')).toBeInTheDocument();
	});
});

// link to login form on registration success
// doesn't attempt facebook login if login failed
// convert to dumb static page (not generated)
// display google client failure errors
