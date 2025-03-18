import { useQuery } from '@tanstack/react-query';

import getVersions from '~src/services/bibles/getVersions';

export function useVersions() {
	return useQuery({
		queryKey: ['bibleVersions'],
		queryFn: () => getVersions(),
	});
}
