// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetPresenterListPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
	startsWith?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type GetPresenterListPageDataQuery = {
	__typename?: 'Query';
	persons: {
		__typename?: 'PersonConnection';
		nodes?: Array<{
			__typename?: 'Person';
			canonicalPath: string;
			givenName: string;
			surname: string;
			summary: string;
			image?: { __typename?: 'Image'; url: any } | null;
		}> | null;
	};
	personLetterCounts: Array<{
		__typename?: 'LetterCount';
		letter: string;
		count: number;
	}>;
};

export type GetPresenterListPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetPresenterListPathsDataQuery = {
	__typename?: 'Query';
	personLetterCounts: Array<{
		__typename?: 'LetterCount';
		letter: string;
		count: number;
	}>;
};

export const GetPresenterListPageDataDocument = `
    query getPresenterListPageData($language: Language!, $startsWith: String) {
  persons(
    language: $language
    startsWith: $startsWith
    first: 1500
    orderBy: [{field: NAME, direction: ASC}]
  ) {
    nodes {
      canonicalPath(useFuturePath: true)
      givenName
      surname
      image {
        url(size: 128)
      }
      summary
    }
  }
  personLetterCounts(language: $language) {
    letter
    count
  }
}
    `;
export const useGetPresenterListPageDataQuery = <
	TData = GetPresenterListPageDataQuery,
	TError = unknown
>(
	variables: GetPresenterListPageDataQueryVariables,
	options?: UseQueryOptions<GetPresenterListPageDataQuery, TError, TData>
) =>
	useQuery<GetPresenterListPageDataQuery, TError, TData>(
		['getPresenterListPageData', variables],
		graphqlFetcher<
			GetPresenterListPageDataQuery,
			GetPresenterListPageDataQueryVariables
		>(GetPresenterListPageDataDocument, variables),
		options
	);
export const GetPresenterListPathsDataDocument = `
    query getPresenterListPathsData($language: Language!) {
  personLetterCounts(language: $language) {
    letter
    count
  }
}
    `;
export const useGetPresenterListPathsDataQuery = <
	TData = GetPresenterListPathsDataQuery,
	TError = unknown
>(
	variables: GetPresenterListPathsDataQueryVariables,
	options?: UseQueryOptions<GetPresenterListPathsDataQuery, TError, TData>
) =>
	useQuery<GetPresenterListPathsDataQuery, TError, TData>(
		['getPresenterListPathsData', variables],
		graphqlFetcher<
			GetPresenterListPathsDataQuery,
			GetPresenterListPathsDataQueryVariables
		>(GetPresenterListPathsDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getPresenterListPageData<T>(
	variables: ExactAlt<T, GetPresenterListPageDataQueryVariables>
): Promise<GetPresenterListPageDataQuery> {
	return fetchApi(GetPresenterListPageDataDocument, { variables });
}

export async function getPresenterListPathsData<T>(
	variables: ExactAlt<T, GetPresenterListPathsDataQueryVariables>
): Promise<GetPresenterListPathsDataQuery> {
	return fetchApi(GetPresenterListPathsDataDocument, { variables });
}
