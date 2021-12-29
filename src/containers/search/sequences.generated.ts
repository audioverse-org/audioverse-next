import * as Types from '../../lib/generated/graphql';

import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.generated';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetSearchResultsSequencesQueryVariables = Types.Exact<{
	language: Types.Language;
	term: Types.Scalars['String'];
	first: Types.Scalars['Int'];
	offset: Types.Scalars['Int'];
}>;

export type GetSearchResultsSequencesQuery = {
	__typename?: 'Query';
	sequences: {
		__typename?: 'SequenceConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
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
	};
};

export const GetSearchResultsSequencesDocument = `
    query getSearchResultsSequences($language: Language!, $term: String!, $first: Int!, $offset: Int!) {
  sequences(language: $language, search: $term, first: $first, offset: $offset) {
    aggregate {
      count
    }
    nodes {
      ...cardSequence
    }
  }
}
    ${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}`;
export const useGetSearchResultsSequencesQuery = <
	TData = GetSearchResultsSequencesQuery,
	TError = unknown
>(
	variables: GetSearchResultsSequencesQueryVariables,
	options?: UseQueryOptions<GetSearchResultsSequencesQuery, TError, TData>
) =>
	useQuery<GetSearchResultsSequencesQuery, TError, TData>(
		['getSearchResultsSequences', variables],
		graphqlFetcher<
			GetSearchResultsSequencesQuery,
			GetSearchResultsSequencesQueryVariables
		>(GetSearchResultsSequencesDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetSearchResultsSequencesDocument = `query getSearchResultsSequences($language:Language!$term:String!$first:Int!$offset:Int!){sequences(language:$language search:$term first:$first offset:$offset){aggregate{count}nodes{...cardSequence}}}`;
export async function getSearchResultsSequences<T>(
	variables: ExactAlt<T, GetSearchResultsSequencesQueryVariables>
): Promise<GetSearchResultsSequencesQuery> {
	return fetchApi(GetSearchResultsSequencesDocument, { variables });
}
