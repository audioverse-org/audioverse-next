import React, {
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

import Miniplayer from '@components/organisms/miniplayer';
import { AndMiniplayerFragment } from '@lib/generated/graphql';
import hasVideo from '@lib/hasVideo';

import styles from './andMiniplayer.module.scss';

// Source:
// https://github.com/vercel/next.js/blob/canary/examples/with-videojs/components/Player.js

// If this solution becomes unviable, for instance, due to needing to
// update more props than just sources, this alternative approach may work:
// https://github.com/videojs/video.js/issues/4970#issuecomment-520591504

interface Playable {
	url: string;
	mimeType: string;
}

const getFiles = (
	recording: AndMiniplayerFragment,
	prefersAudio: boolean
): Playable[] => {
	if (!recording) return [];

	const { videoStreams = [], videoFiles = [], audioFiles = [] } = recording;

	if (prefersAudio) return audioFiles;
	if (videoStreams.length > 0) return videoStreams;
	if (videoFiles.length > 0) return videoFiles;

	return audioFiles;
};

const getSources = (
	recording: AndMiniplayerFragment,
	prefersAudio: boolean
) => {
	const files = getFiles(recording, prefersAudio) || [];

	return files.map((f) => ({
		src: f.url,
		type: f.mimeType,
	}));
};

export type PlaybackContextType = {
	play: () => void;
	pause: () => void;
	paused: () => boolean;
	getTime: () => number;
	setTime: (t: number) => void;
	setPrefersAudio: (prefersAudio: boolean) => void;
	getPrefersAudio: () => boolean;
	getProgress: () => number;
	setProgress: (p: number) => void;
	getRecording: () => AndMiniplayerFragment | undefined;
	loadRecording: (
		recording: AndMiniplayerFragment,
		options?: {
			onLoad?: (c: PlaybackContextType) => void;
		}
	) => void;
	loadPortal: (id: string, container: Element | null) => void;
	unloadPortal: () => void;
	hasPlayer: () => boolean;
	hasVideo: () => boolean;
	supportsFullscreen: () => boolean;
	isShowingVideo: () => boolean;
	getVideoLocation: () => 'miniplayer' | 'portal' | null;
	getVolume: () => number;
	setVolume: (v: number) => void;
	setSpeed: (s: number) => void;
	getSpeed: () => number;
	getDuration: () => number;
	requestFullscreen: () => void;
};

export const PlaybackContext = React.createContext<PlaybackContextType>({
	play: () => undefined,
	pause: () => undefined,
	paused: () => true,
	getTime: () => 0,
	setTime: () => undefined,
	setPrefersAudio: () => undefined,
	getPrefersAudio: () => false,
	getProgress: () => 0,
	setProgress: () => undefined,
	supportsFullscreen: () => false,
	loadRecording: () => undefined,
	loadPortal: () => undefined,
	unloadPortal: () => undefined,
	hasPlayer: () => false,
	hasVideo: () => false,
	isShowingVideo: () => false,
	getVideoLocation: () => null,
	getRecording: () => undefined,
	getVolume: () => 100,
	setVolume: () => undefined,
	setSpeed: () => undefined,
	getSpeed: () => 1,
	getDuration: () => 0,
	requestFullscreen: () => undefined,
});

interface AndMiniplayerProps {
	children: ReactNode;
}

export default function AndMiniplayer({
	children,
}: AndMiniplayerProps): JSX.Element {
	const onVideo = useCallback((el) => setVideoEl(el), []);
	const [videoEl, setVideoEl] = useState();

	const videoRef = useRef<HTMLDivElement>(null);
	const originRef = useRef<HTMLDivElement>(null);

	const [player, setPlayer] = useState<VideoJsPlayer>();
	const [recording, setRecording] = useState<AndMiniplayerFragment>();
	const [progress, setProgress] = useState<number>(0);
	const [volume, setVolume] = useState<number>(100);
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const [prefersAudio, setPrefersAudio] = useState(false);
	const [sources, setSources] = useState<{ src: string; type: string }[]>([]);
	const [onLoad, setOnLoad] = useState<(c: PlaybackContextType) => void>();
	const [fingerprint, setFingerprint] = useState<string>();
	const [portal, setPortal] = useState<Element | null>(null);
	const [portalId, setPortalId] = useState<string>();

	const hasSources = sources && sources.length > 0;
	const isShowingVideo = !!recording && hasVideo(recording) && !prefersAudio;

	const options: VideoJsPlayerOptions = {
		poster: 'https://s.audioverse.org/images/template/player-bg4.jpg',
		controls: false,
		// TODO: Should this be set back to `auto` once streaming urls are fixed?
		// https://docs.videojs.com/docs/guides/options.html
		preload: 'metadata',
		fluid: true,
		sources,
	};

	const playback: PlaybackContextType = {
		play: () => {
			player?.play();
			setIsPaused(false);
			console.log('play setProgress');
			if (progress) playback.setProgress(progress);
		},
		pause: () => {
			player?.pause();
			setIsPaused(true);
		},
		paused: () => isPaused,
		getTime: () => player?.currentTime() || 0,
		setTime: (t: number) => {
			if (!player) return;
			console.log('setTime setProgress');
			setProgress(t / player.duration());
			player.currentTime(t);
		},
		setPrefersAudio: (prefersAudio: boolean) => {
			if (!recording) return;
			setPrefersAudio(prefersAudio);
		},
		getPrefersAudio: () => prefersAudio,
		getDuration: () => {
			// TODO: return duration according to current media file
			return player?.duration() || recording?.duration || 0;
		},
		getProgress: () => {
			console.log({ m: 'getProgress', progress });
			return progress;
		},
		setProgress: (p: number) => {
			console.log({ m: 'context setProgress', p });
			setProgress(p);
			const duration = player?.duration();
			if (!player || !duration || isNaN(duration)) return;
			player.currentTime(p * duration);
		},
		getRecording: () => recording,
		// TODO: Rename to setRecording
		loadRecording: (recording: AndMiniplayerFragment, options = {}) => {
			const { onLoad } = options;
			setOnLoad(() => onLoad);
			setRecording(recording);
		},
		loadPortal: (id: string, portalContainer: Element | null) => {
			setPortalId(id);
			setPortal(portalContainer);
		},
		unloadPortal: () => {
			setPortalId(undefined);
			setPortal(null);
		},
		hasPlayer: () => !!player,
		hasVideo: () => !!recording && hasVideo(recording),
		isShowingVideo: () => isShowingVideo,
		getVideoLocation: () => {
			if (!isShowingVideo) return null;

			if (portal) return 'portal';

			return 'miniplayer';
		},
		supportsFullscreen: () => (player ? player.supportsFullScreen() : false),
		getVolume: () => volume,
		setVolume,
		setSpeed: (s: number) => player?.playbackRate(s),
		getSpeed: () => player?.playbackRate() || 1,
		requestFullscreen: () => {
			player?.requestFullscreen();
		},
	};

	useEffect(() => {
		if (!recording) return;
		setSources(getSources(recording, prefersAudio));
	}, [recording, prefersAudio]);

	useEffect(() => {
		// TODO: return if onLoad
		if (!videoEl) return;
		if (!hasSources) return;

		if (!player) {
			setPlayer(videojs(videoEl, options));
		} else if (sources) {
			player.src(sources);
		}

		setIsPaused(true);
		setFingerprint(JSON.stringify(sources));
	}, [hasSources, sources, videoEl]);

	useEffect(() => {
		onLoad && onLoad(playback);
		setOnLoad(undefined);

		if (!player) return;

		setVolume(player.volume() * 100);

		const duration = player.duration();

		if (!duration || isNaN(duration)) return;

		const p = player.currentTime() / duration;

		console.log({ m: 'effect setProgress', p });

		setProgress(p);
	}, [fingerprint]);

	useEffect(() => {
		player?.volume(volume / 100);
	}, [volume]);

	useEffect(() => {
		console.log({ portalId, portal: !!portal, isShowingVideo });

		if (onLoad) {
			console.log('onLoad defined');
			return;
		}

		if (portalId && !portal) {
			console.log('null portal registered');
			return;
		}

		const video = videoRef.current;

		if (!video) {
			console.log('no video ref');
			return;
		}

		function findDestination() {
			console.log('finding destination');

			if (portal) {
				console.log('portal');
				return portal;
			}

			if (isShowingVideo) {
				console.log('miniplayer');
				// TODO: use ref instead of ID
				return document.getElementById('mini-player');
			}

			console.log('origin');
			return originRef.current;
		}

		const destination = findDestination();

		if (!destination) {
			console.log('no destination');
			return;
		}

		if (destination === video.parentElement) {
			console.log('video already in destination');
			return;
		}

		console.log('moving to destination');
		destination.appendChild(video);
	}, [portalId, portal, isShowingVideo, onLoad]);

	useEffect(() => {
		if (!player) return;
		player.on('fullscreenchange', () => {
			player.controls(player.isFullscreen());
		});
	}, [player]);

	return (
		<div className={styles.base}>
			<PlaybackContext.Provider value={playback}>
				<div ref={originRef} className={styles.videoOrigin}>
					<div ref={videoRef} className={styles.playerElement}>
						<div data-vjs-player={true}>
							<video
								ref={onVideo}
								className="video-js"
								playsInline
								data-testid={'video-element'}
								onTimeUpdate={() => {
									if (!player) return;
									const t = player.currentTime();
									const d = player.duration();
									const p = d ? t / d : 0;
									setProgress(p);
								}}
								onPause={() => setIsPaused(true)}
								onPlay={() => setIsPaused(false)}
							/>
						</div>
					</div>
				</div>

				<div className={styles.content}>{children}</div>
				<Miniplayer />
			</PlaybackContext.Provider>
		</div>
	);
}
