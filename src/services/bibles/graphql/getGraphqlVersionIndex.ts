import { manageAsyncFunction } from '~src/lib/manageAsyncFunction';

import { doGetGraphqlVersionIndex } from './__generated__/getGraphqlVersionIndex';

/**
 * Gets the version index for a given version ID
 * @param versionId The version ID
 * @returns The version index or null if not found
 */
export const getGraphqlVersionIndex = manageAsyncFunction(
	async (versionId: string | number) => {
		const result = await doGetGraphqlVersionIndex({ collectionId: versionId });
		return result.collection;
	},
);
