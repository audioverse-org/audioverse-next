import useRouterQuery from '@lib/useRouterQuery';
import _ from 'lodash';

export function useQueryString(key: string): string | undefined {
	const query = useRouterQuery();
	const raw = _.get(query, key);

	if (!raw) return undefined;

	return raw.toString();
}
