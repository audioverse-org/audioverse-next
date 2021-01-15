import { QueryKey, useMutation, useQueryClient } from 'react-query';

import { setPlaylistMembership } from '@lib/api/setPlaylistMembership';

interface MutateVariables {
	recordingId: string;
	playlistId: string;
	add: boolean;
}

type ReturnType = (
	recordingId: string,
	playlistId: string,
	add: boolean
) => void;

export function useSetPlaylistMembership(
	cacheKey: QueryKey | undefined = undefined
): ReturnType {
	const queryClient = useQueryClient();
	const { mutate } = useMutation(
		(variables: MutateVariables): Promise<boolean> => {
			const { recordingId, playlistId, add } = variables;
			return setPlaylistMembership(recordingId, playlistId, add);
		},
		{
			onSettled: async () => {
				await queryClient.invalidateQueries(cacheKey);
			},
		}
	);

	return (recordingId: string, playlistId: string, add: boolean) =>
		mutate({ recordingId, playlistId, add });
}
