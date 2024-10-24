import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import React from 'react';

import SocialLogin from '~components/molecules/socialLogin';
import { RegisterSocialDocument } from '~containers/account/__generated__/register';
import { fetchApi } from '~lib/api/fetchApi';
import renderWithProviders from '~lib/test/renderWithProviders';

describe('social login', () => {
	it('does not run onSuccess callback if errors', async () => {
		const user = userEvent.setup();

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
			undefined,
		);

		const button = screen.getByText('Login with Facebook');

		await user.click(button);

		await screen.findByText('the_error_message');

		expect(didCallbackRun).toBeFalsy();
	});
});
