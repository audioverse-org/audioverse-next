// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { CardCollectionFragmentDoc } from '../../components/molecules/card/collection.gql';
import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.gql';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetAudiobibleVersionsDataQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetAudiobibleVersionsDataQuery = {
	__typename?: 'Query';
	collections: {
		__typename?: 'CollectionConnection';
		nodes?: Array<{
			__typename?: 'Collection';
			id: string;
			canonicalPath: string;
			title: string;
			startDate?: any | null;
			endDate?: any | null;
			duration: number;
			collectionContentType: Types.CollectionContentType;
			sequences: {
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
			};
			image?: { __typename?: 'Image'; id: string; url: any } | null;
			allSequences: {
				__typename?: 'SequenceConnection';
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
			allRecordings: {
				__typename?: 'RecordingConnection';
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
		}> | null;
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
	};
};

export const GetAudiobibleVersionsDataDocument = `
    query getAudiobibleVersionsData($language: Language!) {
  collections(
    language: $language
    contentType: BIBLE_VERSION
    first: 10
    orderBy: [{field: TITLE, direction: ASC}]
  ) {
    nodes {
      ...cardCollection
      sequences(first: 2, orderBy: [{field: ID, direction: ASC}]) {
        nodes {
          ...cardSequence
        }
      }
    }
    aggregate {
      count
    }
  }
}
    ${CardCollectionFragmentDoc}
${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}`;
export const useGetAudiobibleVersionsDataQuery = <
	TData = GetAudiobibleVersionsDataQuery,
	TError = unknown
>(
	variables: GetAudiobibleVersionsDataQueryVariables,
	options?: UseQueryOptions<GetAudiobibleVersionsDataQuery, TError, TData>
) =>
	useQuery<GetAudiobibleVersionsDataQuery, TError, TData>(
		['getAudiobibleVersionsData', variables],
		graphqlFetcher<
			GetAudiobibleVersionsDataQuery,
			GetAudiobibleVersionsDataQueryVariables
		>(GetAudiobibleVersionsDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getAudiobibleVersionsData<T>(
	variables: ExactAlt<T, GetAudiobibleVersionsDataQueryVariables>
): Promise<GetAudiobibleVersionsDataQuery> {
	return fetchApi(GetAudiobibleVersionsDataDocument, { variables });
}
