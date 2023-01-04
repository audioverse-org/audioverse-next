import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import SocialLogin from '@components/molecules/socialLogin';
import { fetchApi, __load } from '@lib/api/fetchApi';
import { RegisterSocialDocument } from '@lib/generated/graphql';
import renderWithProviders from '@lib/test/renderWithProviders';
import withMutedReactQueryLogger from '@lib/test/withMutedReactQueryLogger';
import { describe, it, expect, vi } from 'vitest';

describe('social login', () => {
	it('does not run onSuccess callback if errors', async () => {
		withMutedReactQueryLogger(async () => {
			__load(RegisterSocialDocument, {
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
				<SocialLogin onSuccess={() => (didCallbackRun = true)} />
			);

			userEvent.click(getByText('Login with Facebook'));

			await waitFor(() => expect(fetchApi).toBeCalled());

			expect(didCallbackRun).toBeFalsy();

			await screen.findByText(/the_error_message/);
		});
	});
});
