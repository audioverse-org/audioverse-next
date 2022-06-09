import { when } from 'jest-when';
import Cookie from 'js-cookie';

import { GetWithAuthGuardDataDocument } from '@components/HOCs/withAuthGuard.gql';
import { fetchApi } from '@lib/api/fetchApi';

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
