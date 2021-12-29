import * as Types from '../../lib/generated/graphql';

import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetSponsorListPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
	startsWith: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type GetSponsorListPageDataQuery = {
	__typename?: 'Query';
	sponsors: {
		__typename?: 'SponsorConnection';
		nodes:
			| Array<{
					__typename?: 'Sponsor';
					canonicalPath: string;
					title: string;
					image: { __typename?: 'Image'; url: string } | null | undefined;
			  }>
			| null
			| undefined;
	};
	sponsorLetterCounts: Array<{
		__typename?: 'LetterCount';
		letter: string;
		count: number;
	}>;
};

export type GetSponsorListPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetSponsorListPathsDataQuery = {
	__typename?: 'Query';
	sponsorLetterCounts: Array<{
		__typename?: 'LetterCount';
		letter: string;
		count: number;
	}>;
};

export const GetSponsorListPageDataDocument = `
    query getSponsorListPageData($language: Language!, $startsWith: String) {
  sponsors(
    language: $language
    startsWith: $startsWith
    first: 1500
    orderBy: [{field: TITLE, direction: ASC}]
  ) {
    nodes {
      canonicalPath(useFuturePath: true)
      title
      image {
        url(size: 128)
      }
    }
  }
  sponsorLetterCounts(language: $language) {
    letter
    count
  }
}
    `;
export const useGetSponsorListPageDataQuery = <
	TData = GetSponsorListPageDataQuery,
	TError = unknown
>(
	variables: GetSponsorListPageDataQueryVariables,
	options?: UseQueryOptions<GetSponsorListPageDataQuery, TError, TData>
) =>
	useQuery<GetSponsorListPageDataQuery, TError, TData>(
		['getSponsorListPageData', variables],
		graphqlFetcher<
			GetSponsorListPageDataQuery,
			GetSponsorListPageDataQueryVariables
		>(GetSponsorListPageDataDocument, variables),
		options
	);
export const GetSponsorListPathsDataDocument = `
    query getSponsorListPathsData($language: Language!) {
  sponsorLetterCounts(language: $language) {
    letter
    count
  }
}
    `;
export const useGetSponsorListPathsDataQuery = <
	TData = GetSponsorListPathsDataQuery,
	TError = unknown
>(
	variables: GetSponsorListPathsDataQueryVariables,
	options?: UseQueryOptions<GetSponsorListPathsDataQuery, TError, TData>
) =>
	useQuery<GetSponsorListPathsDataQuery, TError, TData>(
		['getSponsorListPathsData', variables],
		graphqlFetcher<
			GetSponsorListPathsDataQuery,
			GetSponsorListPathsDataQueryVariables
		>(GetSponsorListPathsDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetSponsorListPageDataDocument = `query getSponsorListPageData($language:Language!$startsWith:String){sponsors(language:$language startsWith:$startsWith first:1500 orderBy:[{field:TITLE direction:ASC}]){nodes{canonicalPath(useFuturePath:true)title image{url(size:128)}}}sponsorLetterCounts(language:$language){letter count}}`;
export async function getSponsorListPageData<T>(
	variables: ExactAlt<T, GetSponsorListPageDataQueryVariables>
): Promise<GetSponsorListPageDataQuery> {
	return fetchApi(GetSponsorListPageDataDocument, { variables });
}

export const GetSponsorListPathsDataDocument = `query getSponsorListPathsData($language:Language!){sponsorLetterCounts(language:$language){letter count}}`;
export async function getSponsorListPathsData<T>(
	variables: ExactAlt<T, GetSponsorListPathsDataQueryVariables>
): Promise<GetSponsorListPathsDataQuery> {
	return fetchApi(GetSponsorListPathsDataDocument, { variables });
}
