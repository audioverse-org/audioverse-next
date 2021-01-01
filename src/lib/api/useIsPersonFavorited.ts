import { useQuery } from 'react-query';

import { isPersonFavorited as _isPersonFavorited } from '@lib/api/isPersonFavorited';

export function useIsPersonFavorited(
	id: string
): {
	isPersonFavorited: boolean | undefined;
} {
	const { data: isPersonFavorited } = useQuery(['isPersonFavorited', id], () =>
		_isPersonFavorited(id)
	);

	return { isPersonFavorited };
}
