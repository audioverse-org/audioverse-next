import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import React from 'react';

import SocialLogin from '@components/molecules/socialLogin';
import { RegisterSocialDocument } from '@lib/generated/graphql';
import { mockedFetchApi } from '@lib/test/helpers';
import renderWithProviders from '@lib/test/renderWithProviders';

describe('social login', () => {
	it('does not run onSuccess callback if errors', async () => {
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

		let didCallbackRun = false;

		const { getByText } = await renderWithProviders(
			<SocialLogin onSuccess={() => (didCallbackRun = true)} />,
			undefined
		);

		userEvent.click(getByText('Login with Facebook'));

		await waitFor(() => expect(mockedFetchApi).toBeCalled());

		expect(didCallbackRun).toBeFalsy();
	});
});
