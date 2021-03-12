import _ from 'lodash';

import useRouterQuery from '@lib/useRouterQuery';

export function useQueryString(key: string): string | undefined {
	const query = useRouterQuery();
	const raw = _.get(query, key);

	if (!raw) return undefined;

	return raw.toString();
}
