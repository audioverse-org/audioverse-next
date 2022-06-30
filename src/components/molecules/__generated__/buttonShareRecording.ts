import * as Types from '../../../__generated__/graphql';

export type ButtonShareRecordingFragment = {
	__typename?: 'Recording';
	id: string | number;
	title: string;
	shareUrl: string;
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
