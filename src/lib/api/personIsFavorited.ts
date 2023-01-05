import {
	personIsFavorited as _personIsFavorited,
	Scalars,
} from '@/lib/generated/graphql';

export function personIsFavorited(id: Scalars['ID']): Promise<boolean> {
	return _personIsFavorited({ id }).then(
		({ person }) => !!person?.viewerHasFavorited
	);
}
