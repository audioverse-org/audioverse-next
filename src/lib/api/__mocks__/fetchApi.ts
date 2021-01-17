export const storeRequest = jest.fn();

export const fetchApi = jest.fn();

// Copied from @lib/api/fetchApi.ts
export function graphqlFetcher<TData, TVariables>(
	query: string,
	variables: TVariables | undefined
): () => Promise<TData> {
	return () => fetchApi(query, { variables });
}
