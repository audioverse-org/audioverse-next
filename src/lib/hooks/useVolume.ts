import React, { useContext, useEffect } from 'react';
import { VjsContext } from '@components/templates/andVjs';

export default function useVolume(): [Percent, (v: number) => void] {
	const context = useContext(VjsContext);
	const [volume, _setVolume] = React.useState<Percent>(context.getVolume);

	useEffect(() => {
		const fn = () => {
			_setVolume(context.getVolume());
		};
		fn();
		context.on('volumechange', fn);
		return () => {
			context.off('volumechange', fn);
		};
	}, [context]);

	const setVolume = (value: number) => {
		const v = Math.max(0, Math.min(100, value)) as Percent;
		context.setVolume(v);
	};

	return [volume, setVolume];
}
