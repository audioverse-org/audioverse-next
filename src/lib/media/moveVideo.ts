type Options = {
	isShowingVideo: boolean;
	isPaused: boolean;
	pause: () => void;
	play: () => void;
	video: HTMLElement | null;
	origin: HTMLElement | null;
	videoHandler?: (video: HTMLElement) => void;
};

export default function moveVideo({
	isShowingVideo,
	isPaused,
	pause,
	play,
	video,
	origin,
	videoHandler,
}: Options) {
	console.log('moveVideo', {
		isShowingVideo,
		isPaused,
		videoHandler: !!videoHandler,
	});

	if (!video) {
		console.log('no video');
		try {
			throw new Error('trace');
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
			console.log(e.stack);
		}
		return;
	}

	if (videoHandler) {
		console.log('moving video to detail portal');
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
		console.warn(
			'destination element not found for',
			isShowingVideo ? 'mini-player' : 'origin'
		);
		return;
	}

	console.log('destination', isShowingVideo ? 'mini-player' : 'origin');

	if (destination === video.parentElement) {
		console.log('video already there');
		return;
	}

	console.log('moving video there');

	destination.appendChild(video);

	// WORKAROUND: player pauses when moving to miniplayer
	if (isPaused) {
		pause();
	} else {
		play();
	}
}
