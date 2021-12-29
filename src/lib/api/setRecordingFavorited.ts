import { recordingFavorite } from './recordingFavorite.generated';
import { recordingUnfavorite } from './recordingUnfavorite.generated';

export function setRecordingFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? recordingFavorite : recordingUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
