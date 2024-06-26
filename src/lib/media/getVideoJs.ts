import VideoJs from 'video.js';

let vjs: typeof VideoJs;

export default async function getVideoJs() {
	if (!vjs) {
		vjs = (await import('video.js')).default;

		const airplay = await import('@silvermine/videojs-airplay');
		const chromecast = await import('@silvermine/videojs-chromecast');

		await airplay.default(vjs);
		await chromecast.default(vjs, { preloadWebComponents: true });
	}

	return vjs;
}
