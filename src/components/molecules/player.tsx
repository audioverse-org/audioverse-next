import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

// Source:
// https://github.com/vercel/next.js/blob/canary/examples/with-videojs/components/Player.js

// If this solution becomes unviable, for instance, due to needing to
// update more props than just sources, this alternative approach may work:
// https://github.com/videojs/video.js/issues/4970#issuecomment-520591504

const Player = (props: VideoJsPlayerOptions): JSX.Element => {
	// TODO: Fix poster disappearing after audio playback start
	const options = {
		poster: 'https://s.audioverse.org/images/template/player-bg4.jpg',
		controls: true,
		fluid: true,
		// TODO: Should this be set back to `auto` once streaming urls are fixed?
		// https://docs.videojs.com/docs/guides/options.html
		preload: 'metadata',
		...props,
	};

	const [videoEl, setVideoEl] = useState(null);
	const [player, setPlayer] = useState<VideoJsPlayer | null>(null);
	const onVideo = useCallback((el) => setVideoEl(el), []);
	const sources = _.get(props, 'sources');
	const hasSources = sources && sources.length > 0;

	useEffect(() => {
		if (videoEl == null) return;
		if (!hasSources) return;

		if (!player) {
			setPlayer(videojs(videoEl, options));
		} else if (sources) {
			player.src(sources);
		}
	}, [hasSources, sources, videoEl]);

	return hasSources ? (
		<div data-vjs-player>
			<video ref={onVideo} className="video-js" playsInline />
		</div>
	) : (
		<p>
			<FormattedMessage
				id="player__noSources"
				defaultMessage="No media sources provided."
				description="Player 'No media sources' error"
			/>
		</p>
	);
};

export default Player;
