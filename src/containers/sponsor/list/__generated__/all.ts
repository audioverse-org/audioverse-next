import * as Types from '../../../../__generated__/graphql';

import { SponsorListEntryFragmentDoc } from './list';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSponsorListAllPageDataQueryVariables = Types.Exact<{
  language: Types.Language;
  after: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetSponsorListAllPageDataQuery = { __typename?: 'Query', sponsors: { __typename?: 'SponsorConnection', nodes: Array<{ __typename?: 'Sponsor', canonicalPath: string, title: string, image: { __typename?: 'Image', url: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };


export const GetSponsorListAllPageDataDocument = `
    query getSponsorListAllPageData($language: Language!, $after: String) {
  sponsors(
    language: $language
    orderBy: [{field: TITLE, direction: ASC}]
    first: 20
    after: $after
  ) {
    nodes {
      ...sponsorListEntry
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${SponsorListEntryFragmentDoc}`;
export const useGetSponsorListAllPageDataQuery = <
      TData = GetSponsorListAllPageDataQuery,
      TError = unknown
    >(
      variables: GetSponsorListAllPageDataQueryVariables,
      options?: UseQueryOptions<GetSponsorListAllPageDataQuery, TError, TData>
    ) =>
    useQuery<GetSponsorListAllPageDataQuery, TError, TData>(
      ['getSponsorListAllPageData', variables],
      graphqlFetcher<GetSponsorListAllPageDataQuery, GetSponsorListAllPageDataQueryVariables>(GetSponsorListAllPageDataDocument, variables),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function getSponsorListAllPageData<T>(
	variables: ExactAlt<T, GetSponsorListAllPageDataQueryVariables>
): Promise<GetSponsorListAllPageDataQuery> {
	return fetchApi(GetSponsorListAllPageDataDocument, { variables });
}