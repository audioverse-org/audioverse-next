import * as Types from '../../../../__generated__/graphql';

import { CardRecordingSequenceHatFragmentDoc } from './recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../templates/__generated__/andMiniplayer';
export type CardRecordingFragment = { __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> };

export const CardRecordingFragmentDoc = `
    fragment cardRecording on Recording {
  __typename
  ...cardRecordingSequenceHat
  ...cardHatSponsor
  ...teaseRecording
}
    `;