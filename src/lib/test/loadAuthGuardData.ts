import { when } from 'jest-when';
import Cookie from 'js-cookie';

import { fetchApi } from '@lib/api/fetchApi';
import { GetWithAuthGuardDataDocument } from '@lib/generated/graphql';

export function loadAuthGuardData(email: any = 'the_email'): void {
	Cookie.get = jest.fn().mockReturnValue({ avSession: 'abc123' });

	when(fetchApi)
		.calledWith(GetWithAuthGuardDataDocument, expect.anything())
		.mockResolvedValue({
			me: {
				user: {
					email,
				},
			},
		});
}
