import isServerSide from '../isServerSide';

let el: HTMLVideoElement | null = null;

export default function useVideoElement() {
	if (!el && !isServerSide()) {
		el = document?.getElementById('video-element') as HTMLVideoElement;
	}
	return el;
}
