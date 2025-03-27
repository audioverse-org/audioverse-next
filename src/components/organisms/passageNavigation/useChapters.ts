import { useQuery, UseQueryResult } from '@tanstack/react-query';

import isServerSide from '~src/lib/isServerSide';
import getChapters from '~src/services/bibles/getChapters';

interface Chapter {
	id: string | number;
	title: string;
}

export default function useChapters(
	versionId: string | number,
	bookId: string,
): UseQueryResult<Chapter[] | undefined, Error> {
	return useQuery({
		queryKey: ['bibleChapters', versionId, bookId],
		queryFn: () => getChapters(versionId.toString(), bookId),
		enabled: !isServerSide(),
	});
}
