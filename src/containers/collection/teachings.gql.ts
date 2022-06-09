// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { CollectionPivotFragmentDoc } from './pivot.gql';
import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.gql';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/recordingSequenceHat.gql';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.gql';
import { CardHatSponsorFragmentDoc } from '../../components/molecules/card/hat/sponsor.gql';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../../components/templates/andMiniplayer.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetCollectionTeachingsPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
	offset?: Types.InputMaybe<Types.Scalars['Int']>;
	first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetCollectionTeachingsPageDataQuery = {
	__typename?: 'Query';
	collection?: {
		__typename?: 'Collection';
		id: string;
		title: string;
		canonicalPath: string;
		contentType: Types.CollectionContentType;
		recordings: {
			__typename?: 'RecordingConnection';
			nodes?: Array<{
				__typename?: 'Recording';
				canonicalPath: string;
				sequenceIndex?: number | null;
				id: string;
				title: string;
				duration: number;
				recordingContentType: Types.RecordingContentType;
				sequence?: {
					__typename?: 'Sequence';
					id: string;
					canonicalPath: string;
					contentType: Types.SequenceContentType;
					title: string;
					image?: { __typename?: 'Image'; url: any } | null;
					recordings: {
						__typename?: 'RecordingConnection';
						aggregate?: { __typename?: 'Aggregate'; count: number } | null;
					};
					collection?: { __typename?: 'Collection'; title: string } | null;
				} | null;
				writers: Array<{
					__typename?: 'Person';
					name: string;
					canonicalPath: string;
					imageWithFallback: { __typename?: 'Image'; url: any };
				}>;
				sponsor?: {
					__typename?: 'Sponsor';
					id: string;
					title: string;
					canonicalPath: string;
					image?: { __typename?: 'Image'; url: any } | null;
				} | null;
				persons: Array<{
					__typename?: 'Person';
					name: string;
					canonicalPath: string;
					imageWithFallback: { __typename?: 'Image'; url: any };
				}>;
				collection?: { __typename?: 'Collection'; title: string } | null;
				audioFiles: Array<{
					__typename?: 'AudioFile';
					url: any;
					filesize: string;
					mimeType: string;
					duration: number;
				}>;
				videoFiles: Array<{
					__typename?: 'VideoFile';
					url: any;
					filesize: string;
					mimeType: string;
					duration: number;
				}>;
				videoStreams: Array<{
					__typename?: 'VideoFile';
					url: any;
					logUrl?: any | null;
					filesize: string;
					mimeType: string;
					duration: number;
				}>;
			}> | null;
			aggregate?: { __typename?: 'Aggregate'; count: number } | null;
		};
	} | null;
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
${CardHatSponsorFragmentDoc}
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

export async function getCollectionTeachingsPageData<T>(
	variables: ExactAlt<T, GetCollectionTeachingsPageDataQueryVariables>
): Promise<GetCollectionTeachingsPageDataQuery> {
	return fetchApi(GetCollectionTeachingsPageDataDocument, { variables });
}
