import {
	collectionIsFavorited as _collectionIsFavorited,
	Scalars,
} from '@lib/generated/graphql';

export function collectionIsFavorited(id: Scalars['ID']): Promise<boolean> {
	return _collectionIsFavorited({ id }).then(
		({ collection }) => !!collection?.viewerHasFavorited
	);
}
