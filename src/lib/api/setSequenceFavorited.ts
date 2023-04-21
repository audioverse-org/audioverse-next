import { sequenceFavorite } from './__generated__/sequenceFavorite';
import { sequenceUnfavorite } from './__generated__/sequenceUnfavorite';

export async function setSequenceFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? sequenceFavorite : sequenceUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
