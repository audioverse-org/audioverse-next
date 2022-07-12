import React, { useCallback } from 'react';
import 'video.js/dist/video-js.css';
import { VideoJsPlayer } from 'video.js';

export default function VideoPlayer(props: {
	onLoad: (vjs: VideoJsPlayer) => void;
}) {
	const originRef = React.useRef<HTMLDivElement>(null);

	const loadVjs = useCallback(
		async (el: HTMLVideoElement) => {
			const vjs = (await import('video.js')).default(el);
			props.onLoad(vjs);
		},
		[props]
	);

	return (
		<div ref={originRef}>
			<div data-vjs-player={true}>
				<video
					ref={loadVjs}
					className="video-js"
					playsInline
					data-testid="video-element"
				/>
			</div>
		</div>
	);
}
