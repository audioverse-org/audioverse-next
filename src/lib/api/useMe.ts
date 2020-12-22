import { useQuery } from 'react-query';

import { getMe } from '@lib/api/getMe';
import { useLanguageId } from '@lib/useLanguageId';
import { User } from 'types';

export function useMe(): User | undefined {
	const languageId = useLanguageId();
	const { data: me } = useQuery('me', () => getMe(languageId));
	return me;
}
