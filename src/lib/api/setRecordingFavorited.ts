import { recordingFavorite } from '@lib/api/recordingFavorite.gql';
import { recordingUnfavorite } from '@lib/api/recordingUnfavorite.gql';

export function setRecordingFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? recordingFavorite : recordingUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
