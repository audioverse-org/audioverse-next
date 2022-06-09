import { sequenceFavorite } from '@lib/api/sequenceFavorite.gql';
import { sequenceUnfavorite } from '@lib/api/sequenceUnfavorite.gql';

export async function setSequenceFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? sequenceFavorite : sequenceUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
