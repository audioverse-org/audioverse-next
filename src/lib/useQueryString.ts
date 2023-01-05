import get from 'lodash/get';

import useRouterQuery from '@/lib/useRouterQuery';

export function useQueryString(key: string): string | undefined {
	const query = useRouterQuery();
	const raw = get(query, key);

	if (!raw) return undefined;

	return raw.toString();
}
