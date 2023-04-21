import * as Types from '../../../__generated__/graphql';

import { AndMiniplayerFragmentDoc } from '../../templates/__generated__/andMiniplayer';
import { PersonLockupFragmentDoc } from './personLockup';
export type TeaseRecordingFragment = { __typename?: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sequence: { __typename?: 'Sequence', id: string | number, title: string, contentType: Types.SequenceContentType, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } } | null, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> };

export const TeaseRecordingFragmentDoc = `
    fragment teaseRecording on Recording {
  ...andMiniplayer
  recordingContentType: contentType
  canonicalPath(useFuturePath: true)
  persons(role: SPEAKER) {
    ...personLockup
  }
  sequenceIndex
  sequence {
    id
    recordings {
      aggregate {
        count
      }
    }
  }
}
    `;