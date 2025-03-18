import { useQuery } from '@tanstack/react-query';

import getBible from '~src/services/bibles/getBible';

export function useVersion(versionId: string) {
	return useQuery({
		queryKey: ['bibleVersion', versionId],
		queryFn: () => getBible(versionId),
		enabled: !!versionId,
	});
}
