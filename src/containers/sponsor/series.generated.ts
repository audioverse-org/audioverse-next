import * as Types from '../../lib/generated/graphql';

import { SponsorPivotFragmentDoc } from './pivot.generated';
import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetSponsorSeriesPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
	id: Types.Scalars['ID'];
	offset: Types.InputMaybe<Types.Scalars['Int']>;
	first: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetSponsorSeriesPageDataQuery = {
	__typename?: 'Query';
	sponsor:
		| {
				__typename?: 'Sponsor';
				id: string | number;
				title: string;
				canonicalPath: string;
				imageWithFallback: { __typename?: 'Image'; url: string };
		  }
		| null
		| undefined;
	sequences: {
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

export type GetSponsorSeriesPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
	first: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetSponsorSeriesPathsDataQuery = {
	__typename?: 'Query';
	sponsors: {
		__typename?: 'SponsorConnection';
		nodes:
			| Array<{ __typename?: 'Sponsor'; id: string | number }>
			| null
			| undefined;
	};
};

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
${CardSequenceFragmentDoc}`;
export const useGetSponsorSeriesPageDataQuery = <
	TData = GetSponsorSeriesPageDataQuery,
	TError = unknown
>(
	variables: GetSponsorSeriesPageDataQueryVariables,
	options?: UseQueryOptions<GetSponsorSeriesPageDataQuery, TError, TData>
) =>
	useQuery<GetSponsorSeriesPageDataQuery, TError, TData>(
		['getSponsorSeriesPageData', variables],
		graphqlFetcher<
			GetSponsorSeriesPageDataQuery,
			GetSponsorSeriesPageDataQueryVariables
		>(GetSponsorSeriesPageDataDocument, variables),
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
		graphqlFetcher<
			GetSponsorSeriesPathsDataQuery,
			GetSponsorSeriesPathsDataQueryVariables
		>(GetSponsorSeriesPathsDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

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
