// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { CollectionPivotFragmentDoc } from './pivot.gql';
import { CardPersonFragmentDoc } from '../../components/molecules/card/person.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetCollectionPresentersPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
	offset?: Types.InputMaybe<Types.Scalars['Int']>;
	first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetCollectionPresentersPageDataQuery = {
	__typename?: 'Query';
	collection?: {
		__typename?: 'Collection';
		id: string;
		title: string;
		canonicalPath: string;
		contentType: Types.CollectionContentType;
		persons: {
			__typename?: 'PersonConnection';
			nodes?: Array<{
				__typename?: 'Person';
				id: string;
				name: string;
				canonicalPath: string;
				image?: { __typename?: 'Image'; id: string; url: any } | null;
				recordings: {
					__typename?: 'RecordingConnection';
					aggregate?: { __typename?: 'Aggregate'; count: number } | null;
				};
			}> | null;
			aggregate?: { __typename?: 'Aggregate'; count: number } | null;
		};
	} | null;
};

export const GetCollectionPresentersPageDataDocument = `
    query getCollectionPresentersPageData($id: ID!, $offset: Int, $first: Int) {
  collection(id: $id) {
    id
    ...collectionPivot
    persons(
      role: SPEAKER
      offset: $offset
      first: $first
      orderBy: [{field: NAME, direction: ASC}]
    ) {
      nodes {
        ...cardPerson
      }
      aggregate {
        count
      }
    }
  }
}
    ${CollectionPivotFragmentDoc}
${CardPersonFragmentDoc}`;
export const useGetCollectionPresentersPageDataQuery = <
	TData = GetCollectionPresentersPageDataQuery,
	TError = unknown
>(
	variables: GetCollectionPresentersPageDataQueryVariables,
	options?: UseQueryOptions<GetCollectionPresentersPageDataQuery, TError, TData>
) =>
	useQuery<GetCollectionPresentersPageDataQuery, TError, TData>(
		['getCollectionPresentersPageData', variables],
		graphqlFetcher<
			GetCollectionPresentersPageDataQuery,
			GetCollectionPresentersPageDataQueryVariables
		>(GetCollectionPresentersPageDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getCollectionPresentersPageData<T>(
	variables: ExactAlt<T, GetCollectionPresentersPageDataQueryVariables>
): Promise<GetCollectionPresentersPageDataQuery> {
	return fetchApi(GetCollectionPresentersPageDataDocument, { variables });
}
