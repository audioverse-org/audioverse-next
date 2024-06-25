import * as VideoJsModule from 'video.js';

let vjs: typeof VideoJsModule;

export default async function getVideoJs() {
	if (!vjs) {
		vjs = await import('video.js');

		const airplay = await import('@silvermine/videojs-airplay');
		const chromecast = await import('@silvermine/videojs-chromecast');

		await airplay.default(vjs);
		await chromecast.default(vjs, { preloadWebComponents: true });
	}

	return vjs;
}
