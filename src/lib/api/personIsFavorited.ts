import type { Scalars } from '@lib/generated/graphql';

import { personIsFavorited as _personIsFavorited } from './personIsFavorited.generated';

export function personIsFavorited(id: Scalars['ID']): Promise<boolean> {
	return _personIsFavorited({ id }).then(
		({ person }) => !!person?.viewerHasFavorited
	);
}
