// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.gql';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/recordingSequenceHat.gql';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.gql';
import { CardHatSponsorFragmentDoc } from '../../components/molecules/card/hat/sponsor.gql';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../../components/templates/andMiniplayer.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetTrendingTeachingsPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
	hasVideo?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;

export type GetTrendingTeachingsPageDataQuery = {
	__typename?: 'Query';
	recordings: {
		__typename?: 'PopularRecordingConnection';
		nodes?: Array<{
			__typename?: 'PopularRecording';
			recording: {
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
			};
		}> | null;
	};
};

export const GetTrendingTeachingsPageDataDocument = `
    query getTrendingTeachingsPageData($language: Language!, $hasVideo: Boolean) {
  recordings: popularRecordings(
    language: $language
    first: 24
    contentType: SERMON
    hasVideo: $hasVideo
  ) {
    nodes {
      recording {
        ...cardRecording
      }
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetTrendingTeachingsPageDataQuery = <
	TData = GetTrendingTeachingsPageDataQuery,
	TError = unknown
>(
	variables: GetTrendingTeachingsPageDataQueryVariables,
	options?: UseQueryOptions<GetTrendingTeachingsPageDataQuery, TError, TData>
) =>
	useQuery<GetTrendingTeachingsPageDataQuery, TError, TData>(
		['getTrendingTeachingsPageData', variables],
		graphqlFetcher<
			GetTrendingTeachingsPageDataQuery,
			GetTrendingTeachingsPageDataQueryVariables
		>(GetTrendingTeachingsPageDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getTrendingTeachingsPageData<T>(
	variables: ExactAlt<T, GetTrendingTeachingsPageDataQueryVariables>
): Promise<GetTrendingTeachingsPageDataQuery> {
	return fetchApi(GetTrendingTeachingsPageDataDocument, { variables });
}
