let el: HTMLVideoElement | null = null;

export default function useVideoElement() {
	if (!el) {
		el = document.getElementById('video-element') as HTMLVideoElement;
	}
	return el;
}
