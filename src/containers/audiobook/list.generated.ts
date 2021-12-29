import * as Types from '../../lib/generated/graphql';

import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.generated';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetAudiobookListPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
	first?: Types.InputMaybe<Types.Scalars['Int']>;
	offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetAudiobookListPageDataQuery = {
	__typename?: 'Query';
	audiobooks: {
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

export type GetAudiobookListPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetAudiobookListPathsDataQuery = {
	__typename?: 'Query';
	audiobooks: {
		__typename?: 'SequenceConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
	};
};

export const GetAudiobookListPageDataDocument = `
    query getAudiobookListPageData($language: Language!, $first: Int = 12, $offset: Int = 0) {
  audiobooks(
    language: $language
    first: $first
    offset: $offset
    orderBy: [{field: TITLE, direction: ASC}]
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
export const useGetAudiobookListPageDataQuery = <
	TData = GetAudiobookListPageDataQuery,
	TError = unknown
>(
	variables: GetAudiobookListPageDataQueryVariables,
	options?: UseQueryOptions<GetAudiobookListPageDataQuery, TError, TData>
) =>
	useQuery<GetAudiobookListPageDataQuery, TError, TData>(
		['getAudiobookListPageData', variables],
		graphqlFetcher<
			GetAudiobookListPageDataQuery,
			GetAudiobookListPageDataQueryVariables
		>(GetAudiobookListPageDataDocument, variables),
		options
	);
export const GetAudiobookListPathsDataDocument = `
    query getAudiobookListPathsData($language: Language!) {
  audiobooks(language: $language) {
    aggregate {
      count
    }
  }
}
    `;
export const useGetAudiobookListPathsDataQuery = <
	TData = GetAudiobookListPathsDataQuery,
	TError = unknown
>(
	variables: GetAudiobookListPathsDataQueryVariables,
	options?: UseQueryOptions<GetAudiobookListPathsDataQuery, TError, TData>
) =>
	useQuery<GetAudiobookListPathsDataQuery, TError, TData>(
		['getAudiobookListPathsData', variables],
		graphqlFetcher<
			GetAudiobookListPathsDataQuery,
			GetAudiobookListPathsDataQueryVariables
		>(GetAudiobookListPathsDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetAudiobookListPageDataDocument = `query getAudiobookListPageData($language:Language!$first:Int=12$offset:Int=0){audiobooks(language:$language first:$first offset:$offset orderBy:[{field:TITLE direction:ASC}]){nodes{...cardSequence}aggregate{count}}}`;
export async function getAudiobookListPageData<T>(
	variables: ExactAlt<T, GetAudiobookListPageDataQueryVariables>
): Promise<GetAudiobookListPageDataQuery> {
	return fetchApi(GetAudiobookListPageDataDocument, { variables });
}

export const GetAudiobookListPathsDataDocument = `query getAudiobookListPathsData($language:Language!){audiobooks(language:$language){aggregate{count}}}`;
export async function getAudiobookListPathsData<T>(
	variables: ExactAlt<T, GetAudiobookListPathsDataQueryVariables>
): Promise<GetAudiobookListPathsDataQuery> {
	return fetchApi(GetAudiobookListPathsDataDocument, { variables });
}
