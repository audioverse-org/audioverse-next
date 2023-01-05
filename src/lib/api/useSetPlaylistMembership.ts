import { QueryKey, useMutation, useQueryClient } from 'react-query';

import { setPlaylistMembership } from '@/lib/api/setPlaylistMembership';
import { Scalars } from '@/lib/generated/graphql';

interface MutateVariables {
	recordingId: Scalars['ID'];
	playlistId: Scalars['ID'];
	add: boolean;
}

type ReturnType = (
	recordingId: Scalars['ID'],
	playlistId: Scalars['ID'],
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

	return (
		recordingId: Scalars['ID'],
		playlistId: Scalars['ID'],
		add: boolean
	) => mutate({ recordingId, playlistId, add });
}
