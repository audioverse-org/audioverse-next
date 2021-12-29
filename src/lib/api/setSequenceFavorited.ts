import { sequenceFavorite } from './sequenceFavorite.generated';
import { sequenceUnfavorite } from './sequenceUnfavorite.generated';

export async function setSequenceFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? sequenceFavorite : sequenceUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
