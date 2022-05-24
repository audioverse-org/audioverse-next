import { when } from 'jest-when';
import Cookie from 'js-cookie';

import { GetWithAuthGuardDataDocument } from '@lib/generated/graphql';
import { mockedFetchApi } from '@lib/test/helpers';

export function loadAuthGuardData(email: any = 'the_email'): void {
	Cookie.get = jest.fn().mockReturnValue({ avSession: 'abc123' });

	when(mockedFetchApi)
		.calledWith(GetWithAuthGuardDataDocument, expect.anything())
		.mockResolvedValue({
			me: {
				user: {
					email,
				},
			},
		});
}
