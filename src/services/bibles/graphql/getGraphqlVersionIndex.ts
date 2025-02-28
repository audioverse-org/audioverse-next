import { graphqlVersionIndices } from './__generated__/indices';

/**
 * Checks if a version ID is a valid key in the graphqlVersionIndices object
 * @param key The version ID to check
 * @returns True if the version ID is a valid key, false otherwise
 */
function isKey(
	key: string | number,
): key is keyof typeof graphqlVersionIndices {
	return typeof key === 'string' && key in graphqlVersionIndices;
}
/**
 * Gets the version index for a given version ID
 * @param versionId The version ID
 * @returns The version index or null if not found
 */
export function getGraphqlVersionIndex(versionId: string | number) {
	if (!isKey(versionId)) {
		return null;
	}

	return graphqlVersionIndices[versionId];
}
