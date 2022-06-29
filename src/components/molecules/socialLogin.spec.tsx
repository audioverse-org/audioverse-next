import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import React from 'react';

import SocialLogin from '@components/molecules/socialLogin';
import { fetchApi } from '@lib/api/fetchApi';
import { RegisterSocialDocument } from '@lib/generated/graphql';
import renderWithProviders from '@lib/test/renderWithProviders';

describe('social login', () => {
	it('does not run onSuccess callback if errors', async () => {
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

		let didCallbackRun = false;

		await renderWithProviders(
			<SocialLogin onSuccess={() => (didCallbackRun = true)} />,
			undefined
		);

		userEvent.click(screen.getByText('Login with Facebook'));

		await waitFor(() => expect(fetchApi).toBeCalled());

		expect(didCallbackRun).toBeFalsy();
	});
});
