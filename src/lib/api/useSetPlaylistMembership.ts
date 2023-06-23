import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';

import { setPlaylistMembership } from '~lib/api/setPlaylistMembership';
import { Scalars } from '~src/__generated__/graphql';

interface MutateVariables {
	recordingId: Scalars['ID']['output'];
	playlistId: Scalars['ID']['output'];
	add: boolean;
}

type ReturnType = (
	recordingId: Scalars['ID']['output'],
	playlistId: Scalars['ID']['output'],
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
		recordingId: Scalars['ID']['output'],
		playlistId: Scalars['ID']['output'],
		add: boolean
	) => mutate({ recordingId, playlistId, add });
}
