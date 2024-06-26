import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { GetRecordingPlaybackProgressQuery } from '~src/components/templates/__generated__/andMiniplayer';

import useUpdateServerProgress from './useUpdateServerProgress';

const RECORDING_PROGRESSES = new Map<string | number, number>();

function getServerProgress(
	recordingId: string | number,
	queryClient: QueryClient
) {
	const d = queryClient.getQueryData<GetRecordingPlaybackProgressQuery>([
		'getRecordingPlaybackProgress',
		{ id: recordingId },
	]);

	return d?.recording?.viewerPlaybackSession?.positionPercentage || 0;
}

export default function useProgress(recordingId?: string | number) {
	const client = useQueryClient();
	const throttledUpdateProgress = useUpdateServerProgress(recordingId);
	const [progress, _setProgress] = useState<number>(0);

	useEffect(() => {
		if (!recordingId) {
			console.warn('no recording id; not updating progress');
			return;
		}
		if (RECORDING_PROGRESSES.has(recordingId)) {
			console.log('updating progress from memory');
			const p = RECORDING_PROGRESSES.get(recordingId);
			_setProgress(p || 0);
			return;
		}
		console.log('updating progress from server');
		const p = getServerProgress(recordingId, client);
		_setProgress(p);
		RECORDING_PROGRESSES.set(recordingId, p);
	}, [client, recordingId]);

	return {
		progress,
		setProgress: ({
			percentage,
			recordingId: id,
		}: {
			percentage: number;
			recordingId?: number | string;
		}) => {
			const _id = id || recordingId;
			console.log('setProgress', _id, percentage);
			if (_id) RECORDING_PROGRESSES.set(_id, percentage);
			if (_id !== recordingId) return;
			throttledUpdateProgress({ percentage });
			_setProgress(percentage);
		},
	};
}
