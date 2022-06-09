// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { CardRecordingFragmentDoc } from '../molecules/card/recording.gql';
import { CardRecordingSequenceHatFragmentDoc } from '../molecules/card/recordingSequenceHat.gql';
import { PersonLockupFragmentDoc } from '../molecules/personLockup.gql';
import { CardHatSponsorFragmentDoc } from '../molecules/card/hat/sponsor.gql';
import { TeaseRecordingFragmentDoc } from '../molecules/teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../templates/andMiniplayer.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetNotFoundPageDataQueryVariables = Types.Exact<{
	[key: string]: never;
}>;

export type GetNotFoundPageDataQuery = {
	__typename?: 'Query';
	websiteRecentRecordings: {
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
	};
};

export const GetNotFoundPageDataDocument = `
    query getNotFoundPageData {
  websiteRecentRecordings(language: ENGLISH, first: 3) {
    nodes {
      ...cardRecording
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetNotFoundPageDataQuery = <
	TData = GetNotFoundPageDataQuery,
	TError = unknown
>(
	variables?: GetNotFoundPageDataQueryVariables,
	options?: UseQueryOptions<GetNotFoundPageDataQuery, TError, TData>
) =>
	useQuery<GetNotFoundPageDataQuery, TError, TData>(
		variables === undefined
			? ['getNotFoundPageData']
			: ['getNotFoundPageData', variables],
		graphqlFetcher<GetNotFoundPageDataQuery, GetNotFoundPageDataQueryVariables>(
			GetNotFoundPageDataDocument,
			variables
		),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getNotFoundPageData<T>(
	variables: ExactAlt<T, GetNotFoundPageDataQueryVariables>
): Promise<GetNotFoundPageDataQuery> {
	return fetchApi(GetNotFoundPageDataDocument, { variables });
}
