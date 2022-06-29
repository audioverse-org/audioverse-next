import { QueryClient } from 'react-query';
import { IS_TEST } from '@lib/constants';

const DEBUG = false;

export default function makeQueryClient() {
	const client = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				// WORKAROUND: https://react-query.tanstack.com/guides/testing#set-cachetime-to-infinity-with-jest
				cacheTime: IS_TEST ? Infinity : undefined,
				staleTime: IS_TEST ? Infinity : undefined,
			},
		},
	});

	if (DEBUG) {
		client.getQueryCache().subscribe(() => {
			console.log('query event');
		});
	}

	return client;
}
