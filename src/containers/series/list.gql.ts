// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.gql';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetSeriesListPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
	offset?: Types.InputMaybe<Types.Scalars['Int']>;
	first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetSeriesListPageDataQuery = {
	__typename?: 'Query';
	serieses: {
		__typename?: 'SequenceConnection';
		nodes?: Array<{
			__typename?: 'Sequence';
			id: string;
			title: string;
			canonicalPath: string;
			contentType: Types.SequenceContentType;
			duration: number;
			summary: string;
			speakers: {
				__typename?: 'PersonConnection';
				nodes?: Array<{
					__typename?: 'Person';
					name: string;
					canonicalPath: string;
					imageWithFallback: { __typename?: 'Image'; url: any };
				}> | null;
			};
			sequenceWriters: {
				__typename?: 'PersonConnection';
				nodes?: Array<{
					__typename?: 'Person';
					name: string;
					canonicalPath: string;
					imageWithFallback: { __typename?: 'Image'; url: any };
				}> | null;
			};
			allRecordings: {
				__typename?: 'RecordingConnection';
				nodes?: Array<{
					__typename?: 'Recording';
					canonicalPath: string;
				}> | null;
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
			collection?: { __typename?: 'Collection'; title: string } | null;
		}> | null;
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
	};
};

export type GetSeriesListPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetSeriesListPathsDataQuery = {
	__typename?: 'Query';
	serieses: {
		__typename?: 'SequenceConnection';
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
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

export async function getSeriesListPageData<T>(
	variables: ExactAlt<T, GetSeriesListPageDataQueryVariables>
): Promise<GetSeriesListPageDataQuery> {
	return fetchApi(GetSeriesListPageDataDocument, { variables });
}

export async function getSeriesListPathsData<T>(
	variables: ExactAlt<T, GetSeriesListPathsDataQueryVariables>
): Promise<GetSeriesListPathsDataQuery> {
	return fetchApi(GetSeriesListPathsDataDocument, { variables });
}
