import { useMutation, useQueryCache } from 'react-query';

import { addPlaylist } from '@lib/api/addPlaylist';
import { useLanguageId } from '@lib/useLanguageId';

interface MutateVariables {
	title: string;
	isPublic: boolean;
}

type UseAddPlaylistReturn = Promise<string | false | undefined>;

export function useAddPlaylist(): (
	title: string,
	isPublic: boolean
) => UseAddPlaylistReturn {
	const queryCache = useQueryCache();
	const languageId = useLanguageId();

	const [mutate] = useMutation(
		(variables: MutateVariables): Promise<string | false> => {
			const { title, isPublic } = variables;
			return addPlaylist(languageId, title, isPublic);
		},
		{
			onSettled: async () => {
				await queryCache.invalidateQueries('playlists');
			},
		}
	);

	return (title: string, isPublic: boolean): UseAddPlaylistReturn =>
		mutate({ title, isPublic });
}
