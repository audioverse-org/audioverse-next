import { useMutation } from '@tanstack/react-query';
import throttle from 'lodash/throttle';
import { useMemo } from 'react';

import {
	recordingPlaybackProgressSet,
	RecordingPlaybackProgressSetMutationVariables,
} from '~src/components/templates/__generated__/andMiniplayer';

import { getSessionToken } from '../cookies';

const SERVER_UPDATE_WAIT_TIME = 5 * 1000;

export default function useUpdateServerProgress(recordingId?: string | number) {
	const { mutate } = useMutation(
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

	return useMemo(
		() => throttle(mutate, SERVER_UPDATE_WAIT_TIME, { leading: true }),
		[mutate]
	);
}
