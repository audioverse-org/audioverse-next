import { useCallback, useContext, useEffect, useState } from 'react';

import { MediaContext } from '~src/components/templates/andMediaContext';

import hasVideo from './hasVideo';
import useOnPlayerLoad from './useOnPlayerLoad';
import usePlayerRecording from './usePlayerRecording';
import usePrefersAudio from './usePrefersAudio';
import useVideoElement from './useVideoElement';

export type LocationId = 'origin' | 'detail' | 'miniplayer';

export default function usePlayerLocation() {
	const [playerLocation, _setPlayerLocation] = useState<LocationId>('origin');
	const onLoad = useOnPlayerLoad();
	const videoEl = useVideoElement();
	const { recording } = usePlayerRecording();
	const { prefersAudio } = usePrefersAudio();
	const context = useContext(MediaContext);

	const setPlayerLocation = useCallback(
		(locationId: LocationId) => {
			console.log('executing move to', locationId);
			if (locationId === playerLocation) {
				console.log('cancelling move -- same location');
				return;
			}
			if (!videoEl) {
				console.log('cancelling move -- no video element found');
				return;
			}
			const location = context[locationId];
			if (!location) {
				console.log('cancelling move -- no location found');
				return;
			}
			console.log('moving player', {
				locationId,
				location: location.outerHTML,
				videoEl: videoEl.outerHTML,
			});
			location.appendChild(videoEl);
			_setPlayerLocation(locationId);
		},
		[context, playerLocation, videoEl]
	);

	useEffect(() => {
		onLoad(() => {
			const _hasVideo = recording && hasVideo(recording);
			console.log({
				recording: !!recording,
				prefersAudio,
				loadedRecordingId: recording?.id,
				registeredRecordingId: context.detailId,
				_hasVideo,
			});
			if (!recording || prefersAudio || !_hasVideo) {
				setPlayerLocation('origin');
			} else if (recording.id === context.detailId) {
				setPlayerLocation('detail');
			} else {
				setPlayerLocation('miniplayer');
			}
		});
	}, [recording, prefersAudio, setPlayerLocation, onLoad, context.detailId]);

	const registerPlayerLocation = useCallback(
		(options: {
			locationId: LocationId;
			locationEl: HTMLDivElement;
			recordingId?: string | number | null;
		}) => {
			switch (options.locationId) {
				case 'origin':
					throw new Error('Cannot register origin location');
				case 'detail':
					context.setDetail(options.locationEl);
					context.setDetailId(options.recordingId ?? null);
					break;
				case 'miniplayer':
					context.setMiniplayer(options.locationEl);
					break;
			}
		},
		[context]
	);

	const unregisterPlayerLocation = useCallback(
		(locationId: LocationId) => {
			switch (locationId) {
				case 'origin':
					throw new Error('Cannot unregister origin location');
				case 'detail':
					context.setDetail(null);
					context.setDetailId(null);
					break;
				case 'miniplayer':
					context.setMiniplayer(null);
					break;
			}
		},
		[context]
	);

	return { playerLocation, registerPlayerLocation, unregisterPlayerLocation };
}
