import { when } from 'jest-when';
import Cookie from 'js-cookie';

import { fetchApi } from '~lib/api/fetchApi';
import { GetIsAuthenticatedDocument } from '~lib/hooks/__generated__/useIsAuthenticated';

export function loadAuthGuardData(email: any = 'the_email'): void {
	Cookie.get = jest.fn().mockReturnValue({ avSession: 'abc123' });

	when(fetchApi)
		.calledWith(GetIsAuthenticatedDocument, expect.anything())
		.mockResolvedValue({
			me: {
				user: {
					email,
				},
			},
		});
}
