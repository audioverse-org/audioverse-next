import { sequenceFavorite, sequenceUnfavorite } from '@/lib/generated/graphql';

export async function setSequenceFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? sequenceFavorite : sequenceUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
