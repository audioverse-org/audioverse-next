import * as Types from '../../__generated__/graphql';

export type GenerateFeedFragment = { __typename?: 'Recording', id: string | number, title: string, contentType: Types.RecordingContentType, description: string | null, publishDate: string | null, audioFiles: Array<{ __typename?: 'AudioFile', id: string | number, url: string, filesize: string, duration: number, mimeType: string, bitrate: number }>, videoFiles: Array<{ __typename?: 'VideoFile', id: string | number, url: string, filesize: string, duration: number, mimeType: string, bitrate: number, container: string }>, persons: Array<{ __typename?: 'Person', name: string }>, sequence: { __typename?: 'Sequence', title: string } | null, sponsor: { __typename?: 'Sponsor', title: string } | null };

export const GenerateFeedFragmentDoc = `
    fragment generateFeed on Recording {
  id
  title
  contentType
  description
  publishDate
  audioFiles {
    id
    url(requestType: RSS)
    filesize
    duration
    mimeType
    bitrate
  }
  videoFiles(allowedContainers: [M4A, M4V, MOV, MP4]) {
    id
    url(requestType: RSS)
    filesize
    duration
    mimeType
    bitrate
    container
  }
  persons(role: SPEAKER) {
    name
  }
  sequence {
    title
  }
  sponsor {
    title
  }
}
    `;