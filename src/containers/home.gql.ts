// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../types/generated';

import { CardRecordingFragmentDoc } from '../components/molecules/card/recording.gql';
import { CardRecordingSequenceHatFragmentDoc } from '../components/molecules/card/recordingSequenceHat.gql';
import { PersonLockupFragmentDoc } from '../components/molecules/personLockup.gql';
import { CardHatSponsorFragmentDoc } from '../components/molecules/card/hat/sponsor.gql';
import { TeaseRecordingFragmentDoc } from '../components/molecules/teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../components/templates/andMiniplayer.gql';
import { TestimoniesFragmentDoc } from '../components/organisms/testimonies.gql';
import { CardPostFragmentDoc } from '../components/molecules/card/post.gql';
import { CardSequenceFragmentDoc } from '../components/molecules/card/sequence.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetHomeStaticPropsQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetHomeStaticPropsQuery = {
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
	testimonies: {
		__typename?: 'TestimonyConnection';
		nodes?: Array<{
			__typename?: 'Testimony';
			id: string;
			body: string;
			author: string;
		}> | null;
	};
	blogPosts: {
		__typename?: 'BlogPostConnection';
		nodes?: Array<{
			__typename?: 'BlogPost';
			publishDate: any;
			title: string;
			teaser: string;
			canonicalPath: string;
			readingDuration?: number | null;
			image?: { __typename?: 'Image'; url: any } | null;
		}> | null;
	};
	bibleChapters: {
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
};

export const GetHomeStaticPropsDocument = `
    query getHomeStaticProps($language: Language!) {
  websiteRecentRecordings(language: $language) {
    nodes {
      ...cardRecording
    }
  }
  testimonies(
    language: $language
    first: 3
    orderBy: [{field: WRITTEN_DATE, direction: DESC}]
  ) {
    nodes {
      ...testimonies
    }
  }
  blogPosts(
    language: $language
    first: 3
    orderBy: {field: PUBLISHED_AT, direction: DESC}
  ) {
    nodes {
      ...cardPost
    }
  }
  bibleChapters: sequences(language: $language, first: 1, contentType: BIBLE_BOOK) {
    nodes {
      ...cardSequence
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}
${TestimoniesFragmentDoc}
${CardPostFragmentDoc}
${CardSequenceFragmentDoc}`;
export const useGetHomeStaticPropsQuery = <
	TData = GetHomeStaticPropsQuery,
	TError = unknown
>(
	variables: GetHomeStaticPropsQueryVariables,
	options?: UseQueryOptions<GetHomeStaticPropsQuery, TError, TData>
) =>
	useQuery<GetHomeStaticPropsQuery, TError, TData>(
		['getHomeStaticProps', variables],
		graphqlFetcher<GetHomeStaticPropsQuery, GetHomeStaticPropsQueryVariables>(
			GetHomeStaticPropsDocument,
			variables
		),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getHomeStaticProps<T>(
	variables: ExactAlt<T, GetHomeStaticPropsQueryVariables>
): Promise<GetHomeStaticPropsQuery> {
	return fetchApi(GetHomeStaticPropsDocument, { variables });
}
