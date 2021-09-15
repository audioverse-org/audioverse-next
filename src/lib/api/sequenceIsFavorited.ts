import {
	sequenceIsFavorited as _sequenceIsFavorited,
	Scalars,
} from '@lib/generated/graphql';

export function sequenceIsFavorited(id: Scalars['ID']): Promise<boolean> {
	return _sequenceIsFavorited({ id }).then(
		({ sequence }) => !!sequence?.viewerHasFavorited
	);
}
