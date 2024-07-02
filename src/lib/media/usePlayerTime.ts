import { useEffect, useState } from 'react';

import usePlayer from './usePlayer';

export default function usePlayerTime() {
	const { player } = usePlayer();
	const [time, setTime] = useState(player?.currentTime() ?? 0);

	useEffect(() => {
		const onTimeUpdate = () => {
			setTime(player?.currentTime() ?? 0);
		};

		player?.on('timeupdate', onTimeUpdate);

		return () => {
			player?.off('timeupdate', onTimeUpdate);
		};
	}, [player]);

	return {
		time,
		setTime: (time: number) => {
			player?.currentTime(time);
			setTime(time);
		},
	};
}
