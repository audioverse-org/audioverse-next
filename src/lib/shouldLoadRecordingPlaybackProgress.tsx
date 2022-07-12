import { AndMiniplayerFragment } from '@lib/generated/graphql';
import { getSessionToken } from '@lib/cookies';

export const shouldLoadRecordingPlaybackProgress = (
	recording: AndMiniplayerFragment | null | undefined
) =>
	!!recording?.id &&
	!(recording.id + '').includes('/') && // Bible ids
	!!getSessionToken();
