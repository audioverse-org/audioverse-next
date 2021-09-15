import { recordingFavorite, recordingUnfavorite } from '@lib/generated/graphql';

export function setRecordingFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? recordingFavorite : recordingUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
