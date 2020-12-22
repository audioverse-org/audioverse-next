import { useQuery } from 'react-query';

import { getMe } from '@lib/api/getMe';
import { User } from 'types';

export function useMe(): User | undefined {
	const { data: me } = useQuery('me', getMe);
	return me;
}
