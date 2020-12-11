import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import videojs, { VideoJsPlayerOptions } from 'video.js';

// Source:
// https://github.com/vercel/next.js/blob/canary/examples/with-videojs/components/Player.js

const Player = (props: VideoJsPlayerOptions): JSX.Element => {
	// TODO: Fix poster disappearing after audio playback start
	const options = _.assign(
		{
			poster: 'https://s.audioverse.org/images/template/player-bg4.jpg',
			controls: true,
			fluid: true,
		},
		props
	);

	const [videoEl, setVideoEl] = useState(null);
	const onVideo = useCallback((el) => {
		setVideoEl(el);
	}, []);

	useEffect(() => {
		if (videoEl == null) return;
		const player = videojs(videoEl, options);
		return () => {
			if (!player) return;
			player.dispose();
		};
	}, [props, videoEl]);

	return (
		<div data-vjs-player>
			<video ref={onVideo} className="video-js" playsInline />
		</div>
	);
};

export default Player;
