import * as Types from '../../../../__generated__/graphql';

import { TeaseRecordingFragmentDoc } from '../../__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../templates/__generated__/andMiniplayer';
import { PersonLockupFragmentDoc } from '../../__generated__/personLockup';
export type CardPlaylistFragment = { __typename?: 'UserPlaylist', id: string | number, title: string, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sequence: { __typename?: 'Sequence', id: string | number, title: string, contentType: Types.SequenceContentType, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } } | null, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } };

export const CardPlaylistFragmentDoc = `
    fragment cardPlaylist on UserPlaylist {
  id
  title
  recordings(first: 2) {
    nodes {
      ...teaseRecording
    }
    aggregate {
      count
    }
  }
}
    `;