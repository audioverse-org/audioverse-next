import { FacebookLoginClient } from '@greatsumini/react-facebook-login';
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

jest.mock('js-cookie');
jest.mock('@leecheuk/react-google-login');

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

	it('registers user', async () => {
		const { getByText, getByPlaceholderText } = await renderPage();

		await userEvent.type(getByPlaceholderText('Jane'), 'Matthew');
		await userEvent.type(getByPlaceholderText('Doe'), 'Leffler');
		await userEvent.type(
			getByPlaceholderText('jane@example.com'),
			'hello@example.com',
		);
		await userEvent.type(getByPlaceholderText('∗∗∗∗∗∗∗'), '123456');

		await userEvent.click(getByText('Sign up'));

		await waitFor(() => {
			expect(fetchApi).toBeCalledWith(RegisterDocument, {
				variables: {
					email: 'hello@example.com',
					password: '123456',
					firstName: 'Matthew',
					lastName: 'Leffler',
				},
			});
		});
	});

	it('displays loading state', async () => {
		const { getByText, getByPlaceholderText } = await renderPage();

		await userEvent.type(getByPlaceholderText('Jane'), 'Matthew');
		await userEvent.type(getByPlaceholderText('Doe'), 'Leffler');
		await userEvent.type(
			getByPlaceholderText('jane@example.com'),
			'hello@example.com',
		);
		await userEvent.type(getByPlaceholderText('∗∗∗∗∗∗∗'), '123456');

		await userEvent.click(getByText('Sign up'));

		await waitFor(() => {
			expect(getByText('Successfully registered!')).toBeInTheDocument();
		});
	});

	it('displays returned errors', async () => {
		when(fetchApi)
			.calledWith(RegisterDocument, expect.anything())
			.mockResolvedValue({
				signup: {
					errors: [
						{
							message: 'Some error occurred',
						},
					],
				},
			});

		const { getByText, getByPlaceholderText, container } = await renderPage();

		await userEvent.type(getByPlaceholderText('Jane'), 'Matthew');
		await userEvent.type(getByPlaceholderText('Doe'), 'Leffler');
		await userEvent.type(
			getByPlaceholderText('jane@example.com'),
			'hello@example.com',
		);
		await userEvent.type(getByPlaceholderText('∗∗∗∗∗∗∗'), '123456');

		await userEvent.click(getByText('Sign up'));

		await waitFor(() => {
			const alert = container.querySelector('[role="alert"]');
			expect(alert).toBeInTheDocument();
		});
	});

	it('displays success message', async () => {
		const { getByText, getByPlaceholderText } = await renderPage();

		await userEvent.type(getByPlaceholderText('Jane'), 'Matthew');
		await userEvent.type(getByPlaceholderText('Doe'), 'Leffler');
		await userEvent.type(
			getByPlaceholderText('jane@example.com'),
			'hello@example.com',
		);
		await userEvent.type(getByPlaceholderText('∗∗∗∗∗∗∗'), '123456');

		await userEvent.click(getByText('Sign up'));

		await waitFor(() => {
			expect(getByText('Successfully registered!')).toBeInTheDocument();
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

		const { getByText } = await renderPage();

		await userEvent.click(getByText('Sign up with Google'));

		await waitFor(() => {
			expect(getByText('the_error_message')).toBeInTheDocument();
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

		const { getByText } = await renderPage();

		await userEvent.click(await screen.findByText('Sign up with Facebook'));

		await waitFor(() => {
			expect(getByText('the_error_message')).toBeInTheDocument();
		});
	});

	it('renders social login success', async () => {
		const { getByText } = await renderPage();

		when(fetchApi)
			.calledWith(RegisterSocialDocument, expect.anything())
			.mockResolvedValue({
				loginSocial: {
					authenticatedUser: {
						sessionToken: 'the_token',
						user: {
							id: 1,
						},
					},
				},
			});

		await userEvent.click(await screen.findByText('Sign up with Facebook'));

		await waitFor(() => {
			expect(getByText('success')).toBeInTheDocument();
		});
	});

	it('hits api with facebook registration', async () => {
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

	it('saves facebook login session token', async () => {
		when(fetchApi)
			.calledWith(RegisterSocialDocument, expect.anything())
			.mockResolvedValue({
				loginSocial: {
					authenticatedUser: {
						sessionToken: 'the_token',
						user: {
							id: 1,
						},
					},
				},
			});

		await renderPage();

		await userEvent.click(await screen.findByText('Sign up with Facebook'));

		await waitFor(() => {
			expect(Cookie.set).toBeCalledWith('session_token', 'the_token', {
				expires: 14,
			});
		});
	});

	it('does not register failed login', async () => {
		FacebookLoginClient.login = jest
			.fn()
			.mockImplementation((cb) => cb({ status: 'not_authorized' }));

		await renderPage();

		await userEvent.click(await screen.findByText('Sign up with Facebook'));

		await screen.findByText('not_authorized', { exact: false });

		expect(fetchApi).not.toBeCalledWith(
			RegisterSocialDocument,
			expect.anything(),
		);
	});

	it('displays facebook login error', async () => {
		FacebookLoginClient.login = jest
			.fn()
			.mockImplementation((cb) => cb({ status: 'not_authorized' }));

		const { getByText } = await renderPage();

		await userEvent.click(await screen.findByText('Sign up with Facebook'));

		await waitFor(() => {
			expect(
				getByText(`not_authorized: Failed to login with Facebook`),
			).toBeInTheDocument();
		});
	});

	it('does not display form if user logged in', async () => {
		Cookie.get = jest.fn().mockReturnValue({ session_token: 'abc123' });

		const { queryByPlaceholderText } = await renderPage();

		expect(queryByPlaceholderText('email')).not.toBeInTheDocument();
	});

	it('sends Google login data to API', async () => {
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
