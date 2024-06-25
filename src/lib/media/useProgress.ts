import { useMutation } from '@tanstack/react-query';
import throttle from 'lodash/throttle';
import { useMemo, useState } from 'react';

import {
	recordingPlaybackProgressSet,
	RecordingPlaybackProgressSetMutationVariables,
} from '~src/components/templates/__generated__/andMiniplayer';

import { getSessionToken } from '../cookies';

const SERVER_UPDATE_WAIT_TIME = 5 * 1000;

export default function useProgress(recordingId?: string | number) {
	const [progress, _setProgress] = useState<number>(0);

	const { mutate: updateProgress } = useMutation(
		({
			percentage,
		}: Pick<RecordingPlaybackProgressSetMutationVariables, 'percentage'>) => {
			if (!getSessionToken() || !recordingId) {
				return Promise.resolve() as Promise<unknown>;
			}
			return recordingPlaybackProgressSet({
				id: recordingId,
				percentage,
			});
		}
	);

	const throttledUpdateProgress = useMemo(
		() => throttle(updateProgress, SERVER_UPDATE_WAIT_TIME, { leading: true }),
		[updateProgress]
	);

	return {
		progress,
		setProgress: (percentage: number) => {
			throttledUpdateProgress({ percentage });
			_setProgress(percentage);
		},
		setProgressLocal: _setProgress,
	};
}
