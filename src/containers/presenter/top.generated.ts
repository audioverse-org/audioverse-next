import * as Types from '../../lib/generated/graphql';

import { PresenterPivotFragmentDoc } from './pivot.generated';
import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.generated';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/recordingSequenceHat.generated';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.generated';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/teaseRecording.generated';
import { AndMiniplayerFragmentDoc } from '../../components/templates/andMiniplayer.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetPresenterTopPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
	offset: Types.InputMaybe<Types.Scalars['Int']>;
	first: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetPresenterTopPageDataQuery = {
	__typename?: 'Query';
	person:
		| {
				__typename?: 'Person';
				id: string | number;
				language: Types.Language;
				name: string;
				canonicalPath: string;
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
				imageWithFallback: { __typename?: 'Image'; url: string };
		  }
		| null
		| undefined;
};

export const GetPresenterTopPageDataDocument = `
    query getPresenterTopPageData($id: ID!, $offset: Int, $first: Int) {
  person(id: $id) {
    id
    language
    ...presenterPivot
    recordings(
      offset: $offset
      first: $first
      orderBy: [{field: DOWNLOADS_ALL_TIME, direction: DESC}]
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
    ${PresenterPivotFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetPresenterTopPageDataQuery = <
	TData = GetPresenterTopPageDataQuery,
	TError = unknown
>(
	variables: GetPresenterTopPageDataQueryVariables,
	options?: UseQueryOptions<GetPresenterTopPageDataQuery, TError, TData>
) =>
	useQuery<GetPresenterTopPageDataQuery, TError, TData>(
		['getPresenterTopPageData', variables],
		graphqlFetcher<
			GetPresenterTopPageDataQuery,
			GetPresenterTopPageDataQueryVariables
		>(GetPresenterTopPageDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetPresenterTopPageDataDocument = `query getPresenterTopPageData($id:ID!$offset:Int$first:Int){person(id:$id){id language ...presenterPivot recordings(offset:$offset first:$first orderBy:[{field:DOWNLOADS_ALL_TIME direction:DESC}]){nodes{...cardRecording}aggregate{count}}}}`;
export async function getPresenterTopPageData<T>(
	variables: ExactAlt<T, GetPresenterTopPageDataQueryVariables>
): Promise<GetPresenterTopPageDataQuery> {
	return fetchApi(GetPresenterTopPageDataDocument, { variables });
}
