type Options = {
	isShowingVideo: boolean;
	isPaused: boolean;
	pause: () => void;
	play: () => void;
	video: HTMLElement | null;
	origin: HTMLElement | null;
	videoHandler?: (video: HTMLElement) => void;
};

const LOGGING = false;

export default function moveVideo({
	isShowingVideo,
	isPaused,
	pause,
	play,
	video,
	origin,
	videoHandler,
}: Options) {
	if (LOGGING)
		console.log('moveVideo', {
			isShowingVideo,
			isPaused,
			videoHandler: !!videoHandler,
		});

	if (!video) {
		if (LOGGING) {
			console.log('no video');
			try {
				throw new Error('trace');
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (e: any) {
				console.log(e.stack);
			}
		}
		return;
	}

	if (videoHandler) {
		if (LOGGING) console.log('moving video to detail portal');
		setTimeout(() => {
			// Move the video on the next tick to avoid FOPV (flash-of-previous-video ;))
			videoHandler(video);
		}, 0);
		return;
	}

	const destination = isShowingVideo
		? document.getElementById('mini-player')
		: origin;

	if (!destination) {
		if (LOGGING)
			console.warn(
				'destination element not found for',
				isShowingVideo ? 'mini-player' : 'origin'
			);
		return;
	}

	if (LOGGING)
		console.log('destination', isShowingVideo ? 'mini-player' : 'origin');

	if (destination === video.parentElement) {
		if (LOGGING) console.log('video already there');
		return;
	}

	if (LOGGING) console.log('moving video there');

	destination.appendChild(video);

	// WORKAROUND: player pauses when moving to miniplayer
	if (isPaused) {
		pause();
	} else {
		play();
	}
}
