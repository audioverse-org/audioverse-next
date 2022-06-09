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
export type GetSearchResultsRecordingsQueryVariables = Types.Exact<{
	language: Types.Language;
	term: Types.Scalars['String'];
	first: Types.Scalars['Int'];
	offset: Types.Scalars['Int'];
}>;

export type GetSearchResultsRecordingsQuery = {
	__typename?: 'Query';
	recordings: {
		__typename?: 'RecordingConnection';
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
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

export const GetSearchResultsRecordingsDocument = `
    query getSearchResultsRecordings($language: Language!, $term: String!, $first: Int!, $offset: Int!) {
  recordings(language: $language, search: $term, first: $first, offset: $offset) {
    aggregate {
      count
    }
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
export const useGetSearchResultsRecordingsQuery = <
	TData = GetSearchResultsRecordingsQuery,
	TError = unknown
>(
	variables: GetSearchResultsRecordingsQueryVariables,
	options?: UseQueryOptions<GetSearchResultsRecordingsQuery, TError, TData>
) =>
	useQuery<GetSearchResultsRecordingsQuery, TError, TData>(
		['getSearchResultsRecordings', variables],
		graphqlFetcher<
			GetSearchResultsRecordingsQuery,
			GetSearchResultsRecordingsQueryVariables
		>(GetSearchResultsRecordingsDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getSearchResultsRecordings<T>(
	variables: ExactAlt<T, GetSearchResultsRecordingsQueryVariables>
): Promise<GetSearchResultsRecordingsQuery> {
	return fetchApi(GetSearchResultsRecordingsDocument, { variables });
}
