import { useMutation, useQueryCache } from 'react-query';

import { addPlaylist } from '@lib/api/addPlaylist';
import { useLanguageId } from '@lib/useLanguageId';

interface MutateVariables {
	title: string;
	isPublic: boolean;
}

export function useAddPlaylist(): (title: string, isPublic: boolean) => void {
	const queryCache = useQueryCache();
	const languageId = useLanguageId();

	const [mutate] = useMutation(
		(variables: MutateVariables): Promise<boolean> => {
			const { title, isPublic } = variables;
			return addPlaylist(languageId, title, isPublic);
		},
		{
			onSettled: async () => {
				await queryCache.invalidateQueries('playlists');
			},
		}
	);

	return (title: string, isPublic: boolean) => mutate({ title, isPublic });
}
