import * as Types from '../generated/graphql';

import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type PersonIsFavoritedQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type PersonIsFavoritedQuery = {
	__typename?: 'Query';
	person:
		| { __typename?: 'Person'; viewerHasFavorited: boolean }
		| null
		| undefined;
};

export const PersonIsFavoritedDocument = `
    query personIsFavorited($id: ID!) {
  person(id: $id) {
    viewerHasFavorited
  }
}
    `;
export const usePersonIsFavoritedQuery = <
	TData = PersonIsFavoritedQuery,
	TError = unknown
>(
	variables: PersonIsFavoritedQueryVariables,
	options?: UseQueryOptions<PersonIsFavoritedQuery, TError, TData>
) =>
	useQuery<PersonIsFavoritedQuery, TError, TData>(
		['personIsFavorited', variables],
		graphqlFetcher<PersonIsFavoritedQuery, PersonIsFavoritedQueryVariables>(
			PersonIsFavoritedDocument,
			variables
		),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function personIsFavorited<T>(
	variables: ExactAlt<T, PersonIsFavoritedQueryVariables>
): Promise<PersonIsFavoritedQuery> {
	return fetchApi(PersonIsFavoritedDocument, { variables });
}
