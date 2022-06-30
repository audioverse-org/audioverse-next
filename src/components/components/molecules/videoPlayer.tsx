import React from 'react';
import 'video.js/dist/video-js.css';

export default function VideoPlayer(props: {
	videoRef: React.RefObject<HTMLDivElement>;
	videoElRef: React.RefObject<HTMLVideoElement>;
	onTimeUpdate: () => void;
	onPause: () => void;
	onPlay: () => void;
	onEnded: () => void;
	className?: string;
}) {
	return (
		<div ref={props.videoRef} className={props.className}>
			<div data-vjs-player={true}>
				<video
					ref={props.videoElRef}
					className="video-js"
					playsInline
					data-testid="video-element"
					onTimeUpdate={props.onTimeUpdate}
					onPause={props.onPause}
					onPlay={props.onPlay}
					onEnded={props.onEnded}
				/>
			</div>
		</div>
	);
}
