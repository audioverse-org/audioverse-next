import { QueryClient } from '@tanstack/react-query';

export default function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				staleTime: 1000 * 60 * 5,
			},
		},
	});
}
