import router from 'next/router';
import { useEffect, useState } from 'react';

import { useGetAccountPreferencesDataQuery } from '~src/components/organisms/__generated__/preferencesForm';

import { LANGUAGES } from '../constants';
import { getSessionToken } from '../cookies';
import { useGetIsAuthenticatedQuery } from './__generated__/useIsAuthenticated';

type LanguageKey = keyof typeof LANGUAGES;

export default function useIsAuthenticated(): {
	isUserLoggedIn: boolean;
	isFetching: boolean;
	user?: { name: string; email: string };
} {
	const hasSessionToken = !!getSessionToken();
	const prefData = useGetAccountPreferencesDataQuery();
	const { data, isFetching } = useGetIsAuthenticatedQuery(
		{},
		{ retry: false, enabled: hasSessionToken },
	);
	const [loadedDefault, setLoadedDefault] = useState(false);
	useEffect(() => {
		const user = data?.me?.user;
		const prefLang: LanguageKey = prefData?.data?.me?.user
			.language as LanguageKey;
		const baseLang = LANGUAGES[prefLang]?.base_urls;
		if (user?.email && router.pathname.includes('[language]')) {
			const newPath = router.pathname.replace('[language]', baseLang[0]);
			const currentPath = router.asPath;

			if (!currentPath.startsWith(`/${baseLang[0]}`) && !loadedDefault) {
				router.push(newPath);
				setLoadedDefault(true);
			}
		}
	}, [data, prefData, loadedDefault]);

	return {
		isUserLoggedIn: !!data?.me?.user.email,
		isFetching,
		user: data?.me?.user,
	};
}
