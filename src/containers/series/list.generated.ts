import * as Types from '../../lib/generated/graphql';

import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.generated';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetSeriesListPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
	offset: Types.InputMaybe<Types.Scalars['Int']>;
	first: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetSeriesListPageDataQuery = {
	__typename?: 'Query';
	serieses: {
		__typename?: 'SequenceConnection';
		nodes:
			| Array<{
					__typename?: 'Sequence';
					id: string | number;
					title: string;
					canonicalPath: string;
					contentType: Types.SequenceContentType;
					duration: number;
					summary: string;
					speakers: {
						__typename?: 'PersonConnection';
						nodes:
							| Array<{
									__typename?: 'Person';
									name: string;
									canonicalPath: string;
									imageWithFallback: { __typename?: 'Image'; url: string };
							  }>
							| null
							| undefined;
					};
					sequenceWriters: {
						__typename?: 'PersonConnection';
						nodes:
							| Array<{
									__typename?: 'Person';
									name: string;
									canonicalPath: string;
									imageWithFallback: { __typename?: 'Image'; url: string };
							  }>
							| null
							| undefined;
					};
					allRecordings: {
						__typename?: 'RecordingConnection';
						aggregate:
							| { __typename?: 'Aggregate'; count: number }
							| null
							| undefined;
					};
			  }>
			| null
			| undefined;
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
	};
};

export type GetSeriesListPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetSeriesListPathsDataQuery = {
	__typename?: 'Query';
	serieses: {
		__typename?: 'SequenceConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
	};
};

export const GetSeriesListPageDataDocument = `
    query getSeriesListPageData($language: Language!, $offset: Int, $first: Int) {
  serieses(
    language: $language
    offset: $offset
    first: $first
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: ASC}]
  ) {
    nodes {
      ...cardSequence
    }
    aggregate {
      count
    }
  }
}
    ${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}`;
export const useGetSeriesListPageDataQuery = <
	TData = GetSeriesListPageDataQuery,
	TError = unknown
>(
	variables: GetSeriesListPageDataQueryVariables,
	options?: UseQueryOptions<GetSeriesListPageDataQuery, TError, TData>
) =>
	useQuery<GetSeriesListPageDataQuery, TError, TData>(
		['getSeriesListPageData', variables],
		graphqlFetcher<
			GetSeriesListPageDataQuery,
			GetSeriesListPageDataQueryVariables
		>(GetSeriesListPageDataDocument, variables),
		options
	);
export const GetSeriesListPathsDataDocument = `
    query getSeriesListPathsData($language: Language!) {
  serieses(language: $language) {
    aggregate {
      count
    }
  }
}
    `;
export const useGetSeriesListPathsDataQuery = <
	TData = GetSeriesListPathsDataQuery,
	TError = unknown
>(
	variables: GetSeriesListPathsDataQueryVariables,
	options?: UseQueryOptions<GetSeriesListPathsDataQuery, TError, TData>
) =>
	useQuery<GetSeriesListPathsDataQuery, TError, TData>(
		['getSeriesListPathsData', variables],
		graphqlFetcher<
			GetSeriesListPathsDataQuery,
			GetSeriesListPathsDataQueryVariables
		>(GetSeriesListPathsDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetSeriesListPageDataDocument = `query getSeriesListPageData($language:Language!$offset:Int$first:Int){serieses(language:$language offset:$offset first:$first orderBy:[{field:RECORDING_PUBLISHED_AT direction:ASC}]){nodes{...cardSequence}aggregate{count}}}`;
export async function getSeriesListPageData<T>(
	variables: ExactAlt<T, GetSeriesListPageDataQueryVariables>
): Promise<GetSeriesListPageDataQuery> {
	return fetchApi(GetSeriesListPageDataDocument, { variables });
}

export const GetSeriesListPathsDataDocument = `query getSeriesListPathsData($language:Language!){serieses(language:$language){aggregate{count}}}`;
export async function getSeriesListPathsData<T>(
	variables: ExactAlt<T, GetSeriesListPathsDataQueryVariables>
): Promise<GetSeriesListPathsDataQuery> {
	return fetchApi(GetSeriesListPathsDataDocument, { variables });
}
