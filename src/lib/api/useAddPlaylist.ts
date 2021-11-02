import _ from 'lodash';
import { QueryKey, useQueryClient } from 'react-query';

import { useAddPlaylistMutation } from '@lib/generated/graphql';
import { useLanguageId } from '@lib/useLanguageId';

interface MutateVariables {
	title: string;
	options?: {
		isPublic?: boolean;
		recordingIds?: string[];
	};
}

type AddPlaylist = (
	title: string,
	options?: {
		isPublic?: boolean;
		recordingIds?: string[];
	}
) => void;

interface Context {
	key?: QueryKey;
	snapshot?: unknown;
}

export function useAddPlaylist(
	cacheKey: QueryKey | undefined = undefined,
	updatePath: string | undefined = undefined
): AddPlaylist {
	const queryClient = useQueryClient();
	const languageId = useLanguageId();

	const { mutate } = useAddPlaylistMutation({
		onMutate: async (variables: MutateVariables) => {
			// TODO: Finish implementing optimistic updates using
			//  react-query docs guide

			if (!cacheKey) return {};

			await queryClient.cancelQueries(cacheKey);

			if (!updatePath) return {};

			const snapshot = _.cloneDeep(queryClient.getQueryData(cacheKey));

			queryClient.setQueryData(cacheKey, (old) => {
				old = old || {};
				const prev = _.get(old, updatePath) || [];
				const newPlaylist = {
					id: '',
					title: variables.title,
					hasRecording: true,
				};
				const value = [...prev, newPlaylist];

				// TODO: Does `as [type]` introduce errors?
				return _.set(old as Record<string, unknown>, updatePath, value);
			});

			// TODO: optimistically add playlist to base playlists cache, too, once
			//  we're actually using such a cache

			return { key: cacheKey, snapshot };
		},
		onError: (err, variables, context: Context | undefined) => {
			const { key = undefined, snapshot = undefined } = context || {};

			if (!key) return;

			queryClient.setQueryData(key, snapshot);
		},
		onSettled: () => queryClient.invalidateQueries(cacheKey),
	});

	// TODO: add options type
	return (title: string, options = {}): void =>
		mutate({
			language: languageId,
			title: title,
			isPublic: options?.isPublic || false,
			recordingIds: options?.recordingIds || [],
		});
}
