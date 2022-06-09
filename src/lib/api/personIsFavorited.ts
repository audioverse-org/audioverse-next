import { personIsFavorited as _personIsFavorited } from './personIsFavorited.gql';

export function personIsFavorited(id: Scalars['ID']): Promise<boolean> {
	return _personIsFavorited({ id }).then(
		({ person }) => !!person?.viewerHasFavorited
	);
}
