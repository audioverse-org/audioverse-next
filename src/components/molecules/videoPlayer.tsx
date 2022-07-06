import React from 'react';
import 'video.js/dist/video-js.css';

export default function VideoPlayer(props: {
	className?: string;
	videoRef: React.RefObject<HTMLDivElement>;
	videoElRef: React.RefObject<HTMLVideoElement>;
}) {
	return (
		<div ref={props.videoRef} className={props.className}>
			<div data-vjs-player={true}>
				<video
					ref={props.videoElRef}
					className="video-js"
					playsInline
					data-testid="video-element"
				/>
			</div>
		</div>
	);
}
