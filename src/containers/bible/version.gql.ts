// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.gql';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetAudiobibleVersionDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetAudiobibleVersionDataQuery = {
	__typename?: 'Query';
	collection?: {
		__typename?: 'Collection';
		id: string;
		title: string;
		description: string;
		contentType: Types.CollectionContentType;
		canonicalPath: string;
		sponsor?: {
			__typename?: 'Sponsor';
			canonicalPath: string;
			title: string;
			website?: any | null;
		} | null;
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
	} | null;
};

export const GetAudiobibleVersionDataDocument = `
    query getAudiobibleVersionData($id: ID!) {
  collection(id: $id) {
    id
    title
    description
    contentType
    canonicalPath(useFuturePath: true)
    sponsor {
      canonicalPath(useFuturePath: true)
      title
      website
    }
    sequences(first: 66, orderBy: [{field: ID, direction: ASC}]) {
      nodes {
        ...cardSequence
      }
    }
  }
}
    ${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}`;
export const useGetAudiobibleVersionDataQuery = <
	TData = GetAudiobibleVersionDataQuery,
	TError = unknown
>(
	variables: GetAudiobibleVersionDataQueryVariables,
	options?: UseQueryOptions<GetAudiobibleVersionDataQuery, TError, TData>
) =>
	useQuery<GetAudiobibleVersionDataQuery, TError, TData>(
		['getAudiobibleVersionData', variables],
		graphqlFetcher<
			GetAudiobibleVersionDataQuery,
			GetAudiobibleVersionDataQueryVariables
		>(GetAudiobibleVersionDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getAudiobibleVersionData<T>(
	variables: ExactAlt<T, GetAudiobibleVersionDataQueryVariables>
): Promise<GetAudiobibleVersionDataQuery> {
	return fetchApi(GetAudiobibleVersionDataDocument, { variables });
}
