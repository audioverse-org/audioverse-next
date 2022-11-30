import { fetchApi } from '@lib/api/fetchApi';

export function graphqlFetcher<
	TData,
	TVariables extends Record<string, unknown>
>(query: string, variables: TVariables | undefined): () => Promise<TData> {
	return () => fetchApi(query, { variables });
}
