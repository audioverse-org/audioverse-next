import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';

import { RegisterDocument } from '@lib/generated/graphql';
import { buildServerRenderer, mockedFetchApi } from '@lib/test/helpers';
import Register, {
	getServerSideProps,
} from '@pages/[language]/account/register';

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
});

// displays registration errors
// displays success message
