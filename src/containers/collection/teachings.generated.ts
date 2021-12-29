import * as Types from '../../lib/generated/graphql';

import { CollectionPivotFragmentDoc } from './pivot.generated';
import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.generated';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/recordingSequenceHat.generated';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.generated';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/teaseRecording.generated';
import { AndMiniplayerFragmentDoc } from '../../components/templates/andMiniplayer.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetCollectionTeachingsPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
	offset: Types.InputMaybe<Types.Scalars['Int']>;
	first: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetCollectionTeachingsPageDataQuery = {
	__typename?: 'Query';
	collection:
		| {
				__typename?: 'Collection';
				id: string | number;
				title: string;
				canonicalPath: string;
				contentType: Types.CollectionContentType;
				recordings: {
					__typename?: 'RecordingConnection';
					nodes:
						| Array<{
								__typename?: 'Recording';
								canonicalPath: string;
								sequenceIndex: number | null | undefined;
								id: string | number;
								title: string;
								duration: number;
								recordingContentType: Types.RecordingContentType;
								sequence:
									| {
											__typename?: 'Sequence';
											id: string | number;
											canonicalPath: string;
											contentType: Types.SequenceContentType;
											title: string;
											image:
												| { __typename?: 'Image'; url: string }
												| null
												| undefined;
											recordings: {
												__typename?: 'RecordingConnection';
												aggregate:
													| { __typename?: 'Aggregate'; count: number }
													| null
													| undefined;
											};
									  }
									| null
									| undefined;
								writers: Array<{
									__typename?: 'Person';
									name: string;
									canonicalPath: string;
									imageWithFallback: { __typename?: 'Image'; url: string };
								}>;
								persons: Array<{
									__typename?: 'Person';
									name: string;
									canonicalPath: string;
									imageWithFallback: { __typename?: 'Image'; url: string };
								}>;
								audioFiles: Array<{
									__typename?: 'AudioFile';
									url: string;
									filesize: string;
									mimeType: string;
									duration: number;
								}>;
								videoFiles: Array<{
									__typename?: 'VideoFile';
									url: string;
									filesize: string;
									mimeType: string;
									duration: number;
								}>;
								videoStreams: Array<{
									__typename?: 'VideoFile';
									url: string;
									filesize: string;
									mimeType: string;
									duration: number;
								}>;
						  }>
						| null
						| undefined;
					aggregate:
						| { __typename?: 'Aggregate'; count: number }
						| null
						| undefined;
				};
		  }
		| null
		| undefined;
};

export const GetCollectionTeachingsPageDataDocument = `
    query getCollectionTeachingsPageData($id: ID!, $offset: Int, $first: Int) {
  collection(id: $id) {
    id
    ...collectionPivot
    recordings(
      offset: $offset
      first: $first
      sequenceId: 0
      orderBy: [{field: TITLE, direction: ASC}]
    ) {
      nodes {
        ...cardRecording
      }
      aggregate {
        count
      }
    }
  }
}
    ${CollectionPivotFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetCollectionTeachingsPageDataQuery = <
	TData = GetCollectionTeachingsPageDataQuery,
	TError = unknown
>(
	variables: GetCollectionTeachingsPageDataQueryVariables,
	options?: UseQueryOptions<GetCollectionTeachingsPageDataQuery, TError, TData>
) =>
	useQuery<GetCollectionTeachingsPageDataQuery, TError, TData>(
		['getCollectionTeachingsPageData', variables],
		graphqlFetcher<
			GetCollectionTeachingsPageDataQuery,
			GetCollectionTeachingsPageDataQueryVariables
		>(GetCollectionTeachingsPageDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetCollectionTeachingsPageDataDocument = `query getCollectionTeachingsPageData($id:ID!$offset:Int$first:Int){collection(id:$id){id ...collectionPivot recordings(offset:$offset first:$first sequenceId:0 orderBy:[{field:TITLE direction:ASC}]){nodes{...cardRecording}aggregate{count}}}}`;
export async function getCollectionTeachingsPageData<T>(
	variables: ExactAlt<T, GetCollectionTeachingsPageDataQueryVariables>
): Promise<GetCollectionTeachingsPageDataQuery> {
	return fetchApi(GetCollectionTeachingsPageDataDocument, { variables });
}
