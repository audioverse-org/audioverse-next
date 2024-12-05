import { useEffect, useState } from 'react';

import { getSessionToken } from '../cookies';

export default function useIsLoggedIn() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		setIsLoggedIn(!!getSessionToken());
	}, []);

	return isLoggedIn;
}
