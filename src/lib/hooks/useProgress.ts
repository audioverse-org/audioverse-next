import {
	AndMiniplayerFragment,
	useGetRecordingPlaybackProgressQuery,
} from '@components/templates/__generated__/andMiniplayer';
import { useContext, useEffect, useMemo, useState } from 'react';
import useIsLoaded from '@lib/hooks/useIsLoaded';
import {
	shouldLoadRecordingPlaybackProgress,
	VjsContext,
} from '@components/templates/andVjs';
import useWithRecording from '@lib/hooks/useWithRecording';
import usePosition from '@lib/hooks/usePosition';
import useDuration from '@lib/hooks/useDuration';

function usePreviousValue<T>(v: T): T | undefined {
	const [value, setValue] = useState<T | undefined>(undefined);
	useEffect(() => setValue(v), [v]);
	return value;
}

export default function useProgress(
	recording: AndMiniplayerFragment | null,
	options: {
		playlistRecordings?: AndMiniplayerFragment[];
		prefersAudio?: boolean;
	} = {}
): [number, (percent: number) => void] {
	const isLoaded = useIsLoaded(recording);
	const duration = useDuration(recording);
	const [position, setPosition] = usePosition(recording, options);
	const [progress, setProgress] = useState<number>(0);
	const previous = usePreviousValue(progress);
	// const [trace] = useState(new Error().stack);

	useEffect(() => {
		if (duration === 0) return;
		if (previous === progress) {
			setProgress(position / duration);
		} else {
			setPosition(progress * duration);
		}
	}, [previous, progress, duration, position, setPosition, setProgress]);

	// useEffect(() => {
	// 	if (!recording) return;
	// 	if (duration === 0) return;
	// 	const p = progress * duration;
	// 	if (p === position) return;
	// 	console.log({ p, position, progress, duration });
	// 	setPosition(p);
	// }, [setPosition, recording, progress, duration, position]);
	//
	// useEffect(() => {
	// 	if (!recording) return;
	// 	if (position > duration) return;
	// 	const p = position / duration;
	// 	if (isNaN(p)) return;
	// 	if (p === progress) return;
	// 	_setProgress(p);
	// }, [recording, position, duration, progress]);
	//
	// const shouldLoadPlaybackProgress =
	// 	shouldLoadRecordingPlaybackProgress(recording);
	// const withRecording = useWithRecording(recording, options);
	//
	// const { refetch } = useGetRecordingPlaybackProgressQuery(
	// 	{
	// 		id: recording?.id || 0,
	// 	},
	// 	{
	// 		enabled: shouldLoadPlaybackProgress,
	// 		onSuccess: (d) => {
	// 			const p = d?.recording?.viewerPlaybackSession?.positionPercentage;
	// 			if (!p) return;
	// 			setPosition(p * duration);
	// 		},
	// 	}
	// );
	//
	// useEffect(() => {
	// 	if (isLoaded || !shouldLoadPlaybackProgress) return;
	// 	refetch();
	// }, [isLoaded, shouldLoadPlaybackProgress, refetch]);
	//
	// function setProgress(percent: number) {
	// 	if (percent === progress) return;
	// 	console.log('setProgress');
	// 	withRecording(() => _setProgress(percent));
	// }

	return [progress, setProgress];
}
