import * as Types from '../lib/generated/graphql';

import { CardRecordingFragmentDoc } from '../components/molecules/card/recording.generated';
import { TestimoniesFragmentDoc } from '../components/organisms/testimonies.generated';
import { CardPostFragmentDoc } from '../components/molecules/card/post.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetHomeStaticPropsQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetHomeStaticPropsQuery = {
	__typename?: 'Query';
	websiteRecentRecordings: {
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
								image: { __typename?: 'Image'; url: string } | null | undefined;
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
	};
	testimonies: {
		__typename?: 'TestimonyConnection';
		nodes:
			| Array<{
					__typename?: 'Testimony';
					id: string | number;
					body: string;
					author: string;
			  }>
			| null
			| undefined;
	};
	blogPosts: {
		__typename?: 'BlogPostConnection';
		nodes:
			| Array<{
					__typename?: 'BlogPost';
					publishDate: string;
					title: string;
					teaser: string;
					canonicalPath: string;
					readingDuration: number | null | undefined;
					image: { __typename?: 'Image'; url: string } | null | undefined;
			  }>
			| null
			| undefined;
	};
};

export const GetHomeStaticPropsDocument = `
    query getHomeStaticProps($language: Language!) {
  websiteRecentRecordings(language: $language) {
    nodes {
      ...cardRecording
    }
  }
  testimonies(language: $language, first: 3) {
    nodes {
      ...testimonies
    }
  }
  blogPosts(
    language: $language
    first: 6
    orderBy: {field: PUBLISHED_AT, direction: DESC}
  ) {
    nodes {
      ...cardPost
    }
  }
}
    ${CardRecordingFragmentDoc}
${TestimoniesFragmentDoc}
${CardPostFragmentDoc}`;
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
