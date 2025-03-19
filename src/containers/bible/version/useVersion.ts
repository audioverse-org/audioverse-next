import { useQuery } from '@tanstack/react-query';

import isServerSide from '~src/lib/isServerSide';
import getVersion from '~src/services/bibles/getVersion';

export function useVersion(versionId: string) {
	return useQuery({
		queryKey: ['bibleVersion', versionId],
		queryFn: () => getVersion(versionId),
		enabled: !!versionId && !isServerSide(),
	});
}
