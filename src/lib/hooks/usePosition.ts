import { AndMiniplayerFragment } from '@components/templates/__generated__/andMiniplayer';
import { useCallback, useContext, useEffect, useState } from 'react';
import { VjsContext } from '@components/templates/andVjs';
import useWithRecording from '@lib/hooks/useWithRecording';
import useDuration from '@lib/hooks/useDuration';
import useVjsValue from '@lib/hooks/useVjsValue';

export default function usePosition(
	recording: AndMiniplayerFragment | null,
	options: {
		playlistRecordings?: AndMiniplayerFragment[];
		prefersAudio?: boolean;
	} = {}
): [position: number, setPosition: (position: number) => void] {
	const context = useContext(VjsContext);
	const [position, setPosition] = useVjsValue({
		e: 'timeupdate',
		get: context?.getTime,
		set: context?.setTime,
		defaultValue: 0,
	});

	return [position, setPosition];

	// const context = useContext(PlaybackContext);
	// const [position, _setPosition] = useState<number>(0);
	// const withRecording = useWithRecording(recording, options);
	// const duration = useDuration(recording);
	//
	// useEffect(() => {
	// 	const fn = () => {
	// 		const t = context.getTime();
	// 		if (t === position) return;
	// 		if (t > duration) return;
	// 		_setPosition(t);
	// 	};
	// 	fn();
	// 	context.on('timeupdate', fn);
	// 	return () => {
	// 		context.off('timeupdate', fn);
	// 	};
	// });
	//
	// const setPosition = useCallback(
	// 	(p: number) => {
	// 		if (p > duration) return;
	// 		if (Math.abs(p - position) <= 1) return;
	// 		console.log('setPosition', p);
	// 		withRecording(() => {
	// 			context.setTime(p);
	// 		});
	// 	},
	// 	[position, context, duration, withRecording]
	// );
	//
	// return [position, setPosition];
}
