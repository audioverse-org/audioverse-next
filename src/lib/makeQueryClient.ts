import { QueryClient } from 'react-query';
import { IS_TEST } from '@lib/constants';

export default function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				// WORKAROUND: https://react-query.tanstack.com/guides/testing#set-cachetime-to-infinity-with-jest
				cacheTime: IS_TEST ? Infinity : undefined,
				staleTime: IS_TEST ? Infinity : undefined,
			},
		},
	});
}
