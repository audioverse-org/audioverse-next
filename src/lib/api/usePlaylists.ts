import { useQuery } from 'react-query';

import { getPlaylists } from '@lib/api/getPlaylists';
import { useLanguageId } from '@lib/useLanguageId';

import { Playlist } from '../../../types';

export function usePlaylists(
	options: {
		recordingId?: string | number;
	} = {}
): Playlist[] | undefined {
	const languageId = useLanguageId();

	const { data } = useQuery('playlists', () =>
		getPlaylists(languageId, options)
	);

	return data;
}
