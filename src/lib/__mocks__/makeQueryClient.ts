import { QueryClient } from '@tanstack/react-query';

export default function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});
}
