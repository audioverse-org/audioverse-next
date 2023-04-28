import * as Types from '../../../__generated__/graphql';

import { SponsorPivotFragmentDoc } from './pivot';
import { CardSequenceFragmentDoc } from '../../../components/molecules/card/__generated__/sequence';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSponsorSeriesPageDataQueryVariables = Types.Exact<{
  language: Types.Language;
  id: Types.Scalars['ID'];
  offset: Types.InputMaybe<Types.Scalars['Int']>;
  first: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetSponsorSeriesPageDataQuery = { __typename?: 'Query', sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, sequences: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } };

export type GetSponsorSeriesPathsDataQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetSponsorSeriesPathsDataQuery = { __typename?: 'Query', sponsors: { __typename?: 'SponsorConnection', nodes: Array<{ __typename?: 'Sponsor', id: string | number }> | null } };


export const GetSponsorSeriesPageDataDocument = `
    query getSponsorSeriesPageData($language: Language!, $id: ID!, $offset: Int, $first: Int) {
  sponsor(id: $id) {
    ...sponsorPivot
  }
  sequences(
    language: $language
    sponsorId: $id
    offset: $offset
    first: $first
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSequence
    }
    aggregate {
      count
    }
  }
}
    ${SponsorPivotFragmentDoc}
${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}`;
export const useGetSponsorSeriesPageDataQuery = <
      TData = GetSponsorSeriesPageDataQuery,
      TError = unknown
    >(
      variables: GetSponsorSeriesPageDataQueryVariables,
      options?: UseQueryOptions<GetSponsorSeriesPageDataQuery, TError, TData>
    ) =>
    useQuery<GetSponsorSeriesPageDataQuery, TError, TData>(
      ['getSponsorSeriesPageData', variables],
      graphqlFetcher<GetSponsorSeriesPageDataQuery, GetSponsorSeriesPageDataQueryVariables>(GetSponsorSeriesPageDataDocument, variables),
      options
    );
export const GetSponsorSeriesPathsDataDocument = `
    query getSponsorSeriesPathsData($language: Language!, $first: Int) {
  sponsors(language: $language, first: $first) {
    nodes {
      id
    }
  }
}
    `;
export const useGetSponsorSeriesPathsDataQuery = <
      TData = GetSponsorSeriesPathsDataQuery,
      TError = unknown
    >(
      variables: GetSponsorSeriesPathsDataQueryVariables,
      options?: UseQueryOptions<GetSponsorSeriesPathsDataQuery, TError, TData>
    ) =>
    useQuery<GetSponsorSeriesPathsDataQuery, TError, TData>(
      ['getSponsorSeriesPathsData', variables],
      graphqlFetcher<GetSponsorSeriesPathsDataQuery, GetSponsorSeriesPathsDataQueryVariables>(GetSponsorSeriesPathsDataDocument, variables),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function getSponsorSeriesPageData<T>(
	variables: ExactAlt<T, GetSponsorSeriesPageDataQueryVariables>
): Promise<GetSponsorSeriesPageDataQuery> {
	return fetchApi(GetSponsorSeriesPageDataDocument, { variables });
}

export async function getSponsorSeriesPathsData<T>(
	variables: ExactAlt<T, GetSponsorSeriesPathsDataQueryVariables>
): Promise<GetSponsorSeriesPathsDataQuery> {
	return fetchApi(GetSponsorSeriesPathsDataDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getSponsorSeriesPageData: ExactAlt<T, GetSponsorSeriesPageDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getSponsorSeriesPageData', () => getSponsorSeriesPageData(vars.getSponsorSeriesPageData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}