import { useQuery } from '@tanstack/react-query';

import isServerSide from '~src/lib/isServerSide';
import getVersions from '~src/services/bibles/getVersions';

export function useVersions() {
	return useQuery({
		queryKey: ['bibleVersions'],
		queryFn: () => getVersions(),
		enabled: !isServerSide(),
	});
}
