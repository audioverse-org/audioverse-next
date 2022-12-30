import Cookie from 'js-cookie';

import { __load } from '@lib/api/fetchApi';
import { GetWithAuthGuardDataDocument } from '@lib/generated/graphql';

export function loadAuthGuardData(email: any = 'the_email'): void {
	Cookie.get = vi.fn().mockReturnValue({ avSession: 'abc123' });

	__load(GetWithAuthGuardDataDocument, {
		me: {
			user: {
				email,
			},
		},
	});
}
