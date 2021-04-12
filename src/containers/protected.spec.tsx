import { when } from 'jest-when';
import React from 'react';

import Protected from '@containers/protected';
import { GetProtectedDataDocument } from '@lib/generated/graphql';
import { mockedFetchApi, renderWithIntl } from '@lib/test/helpers';

describe('protected', () => {
	it('displays login if no email', async () => {
		when(mockedFetchApi)
			.calledWith(GetProtectedDataDocument, expect.anything())
			.mockResolvedValue({
				me: {
					user: {
						email: null,
					},
				},
			});

		const { getByPlaceholderText } = await renderWithIntl(Protected, {
			children: <>hello world</>,
		});

		expect(getByPlaceholderText('password')).toBeInTheDocument();
	});
});
