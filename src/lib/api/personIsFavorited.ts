import { Scalars } from '@src/__generated__/graphql';

import { personIsFavorited as _personIsFavorited } from './__generated__/personIsFavorited';

export function personIsFavorited(id: Scalars['ID']): Promise<boolean> {
	return _personIsFavorited({ id }).then(
		({ person }) => !!person?.viewerHasFavorited
	);
}
