import { useCallback } from 'react';

import { getSessionToken } from '../cookies';

export default function useRequireUser() {
	const sessionToken = getSessionToken();
	const requireUser = useCallback(
		(callback: () => void) => (): void => {
			if (!sessionToken) {
				return;
			}
			callback();
		},
		[sessionToken]
	);

	return requireUser;
}
