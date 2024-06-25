import { getSessionToken } from '~lib/cookies';

import { AndMiniplayerFragment } from '../../components/templates/__generated__/andMiniplayer';

export const shouldLoadRecordingPlaybackProgress = (
	recording: AndMiniplayerFragment | null | undefined
) =>
	!!recording?.id &&
	!(recording.id + '').includes('/') && // Bible ids
	!!getSessionToken();
