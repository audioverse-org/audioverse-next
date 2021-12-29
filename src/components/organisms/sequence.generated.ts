import * as Types from '../../lib/generated/graphql';

import { CardRecordingFragmentDoc } from '../molecules/card/recording.generated';
export type SequenceFragment = {
	__typename?: 'Sequence';
	id: string | number;
	title: string;
	contentType: Types.SequenceContentType;
	duration: number;
	description: string;
	startDate: string | null | undefined;
	endDate: string | null | undefined;
	shareUrl: string;
	collection:
		| { __typename?: 'Collection'; title: string; canonicalPath: string }
		| null
		| undefined;
	image: { __typename?: 'Image'; url: string } | null | undefined;
	sponsor:
		| { __typename?: 'Sponsor'; title: string; canonicalPath: string }
		| null
		| undefined;
	recordings: {
		__typename?: 'RecordingConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
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
};

export const SequenceFragmentDoc = `
    fragment sequence on Sequence {
  id
  title
  contentType
  duration
  description
  startDate
  endDate
  collection {
    title
    canonicalPath(useFuturePath: true)
  }
  image {
    url(size: 100)
  }
  sponsor {
    title
    canonicalPath(useFuturePath: true)
  }
  shareUrl
  recordings(first: 250) {
    aggregate {
      count
    }
    nodes {
      ...cardRecording
    }
  }
}
    ${CardRecordingFragmentDoc}`;
