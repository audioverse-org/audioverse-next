import { recordingFavorite } from './__generated__/recordingFavorite';
import { recordingUnfavorite } from './__generated__/recordingUnfavorite';

export function setRecordingFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? recordingFavorite : recordingUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
