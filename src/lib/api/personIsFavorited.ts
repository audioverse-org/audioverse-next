import { personIsFavorited as _personIsFavorited } from './__generated__/personIsFavorited';
import { Scalars } from '@src/__generated__/graphql';

export function personIsFavorited(id: Scalars['ID']): Promise<boolean> {
	return _personIsFavorited({ id }).then(
		({ person }) => !!person?.viewerHasFavorited
	);
}
