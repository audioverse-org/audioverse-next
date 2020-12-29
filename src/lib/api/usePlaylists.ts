import { useQuery } from 'react-query';

import { getPlaylists } from '@lib/api/getPlaylists';
import { useLanguageId } from '@lib/useLanguageId';

import { Playlist } from '../../../types';

export function usePlaylists(
	options: {
		recordingId?: string;
	} = {}
): Playlist[] | undefined {
	const languageId = useLanguageId();
	const { recordingId } = options;

	const { data } = useQuery(['playlists', 'withRecording', recordingId], () =>
		getPlaylists(languageId, options)
	);

	return data;
}
