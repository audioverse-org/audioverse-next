// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

export type ButtonShareRecordingFragment = {
	__typename?: 'Recording';
	id: string;
	title: string;
	shareUrl: any;
	speakers: Array<{ __typename?: 'Person'; name: string }>;
};

export const ButtonShareRecordingFragmentDoc = `
    fragment buttonShareRecording on Recording {
  id
  title
  shareUrl
  speakers: persons(role: SPEAKER) {
    name
  }
}
    `;
