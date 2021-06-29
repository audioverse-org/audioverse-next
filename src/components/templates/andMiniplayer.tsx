import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { useRouter } from 'next/router';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

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
	getProgress: () => number;
	setProgress: (p: number) => void;
	loadRecording: (
		recording: AndMiniplayerFragment,
		options?: {
			onLoad?: (c: PlaybackContextType) => void;
		}
	) => void;
	loadPortalContainer: (container: Element | null) => void;
	hasPlayer: () => boolean;
	hasVideo: () => boolean;
	isShowingVideo: () => boolean;
	getRecording: () => AndMiniplayerFragment | undefined;
};

export const PlaybackContext = React.createContext<PlaybackContextType>({
	play: () => undefined,
	pause: () => undefined,
	paused: () => true,
	getTime: () => 0,
	setTime: () => undefined,
	setPrefersAudio: () => undefined,
	getProgress: () => 0,
	setProgress: () => undefined,
	loadRecording: () => undefined,
	loadPortalContainer: () => undefined,
	hasPlayer: () => false,
	hasVideo: () => false,
	isShowingVideo: () => false,
	getRecording: () => undefined,
});

interface AndMiniplayerProps {
	children: ReactNode;
}

export default function AndMiniplayer({
	children,
}: AndMiniplayerProps): JSX.Element {
	const onVideo = useCallback((el) => setVideoEl(el), []);

	const [player, setPlayer] = useState<VideoJsPlayer>();
	const [videoEl, setVideoEl] = useState();
	const [recording, setRecording] = useState<AndMiniplayerFragment>();
	const [progress, setProgress] = useState<number>(0);
	const [volume, setVolume] = useState<number>(100);
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const [prefersAudio, setPrefersAudio] = useState(false);
	const [sources, setSources] = useState<{ src: string; type: string }[]>([]);
	const [onLoad, setOnLoad] = useState<(c: PlaybackContextType) => void>();
	const [fingerprint, setFingerprint] = useState<string>();
	const [portalContainer, setPortalContainer] = useState<Element | null>(null);

	const hasSources = sources && sources.length > 0;
	const isShowingVideo = !!recording && hasVideo(recording) && !prefersAudio;

	const options: VideoJsPlayerOptions = {
		poster: 'https://s.audioverse.org/images/template/player-bg4.jpg',
		controls: true,
		// TODO: Should this be set back to `auto` once streaming urls are fixed?
		// https://docs.videojs.com/docs/guides/options.html
		preload: 'metadata',
		width: 212,
		height: 90,
		sources,
	};

	const playback: PlaybackContextType = {
		play: () => {
			player?.play();
			setIsPaused(false);
			playback.setProgress(progress);
		},
		pause: () => {
			player?.pause();
			setIsPaused(true);
		},
		paused: () => isPaused,
		getTime: () => player?.currentTime() || 0,
		setTime: (t: number) => {
			if (!player) return;
			setProgress(t / player.duration());
			player.currentTime(t);
		},
		setPrefersAudio: (prefersAudio: boolean) => {
			if (!recording) return;
			setPrefersAudio(prefersAudio);
		},
		getProgress: () => progress,
		setProgress: (p: number) => {
			setProgress(p);
			const duration = player?.duration();
			if (!player || !duration || isNaN(duration)) return;
			player.currentTime(p * duration);
		},
		loadRecording: (recording: AndMiniplayerFragment, options = {}) => {
			const { onLoad } = options;
			setOnLoad(() => onLoad);
			setRecording(recording);
		},
		loadPortalContainer: (portalContainer: Element | null) => {
			setPortalContainer(portalContainer);
			portalContainer?.appendChild(
				document.getElementById('video-test') as any
			);
		},
		hasPlayer: () => !!player,
		hasVideo: () => !!recording && hasVideo(recording),
		isShowingVideo: () => isShowingVideo,
		getRecording: () => recording,
	};

	useEffect(() => {
		if (!recording) return;
		setSources(getSources(recording, prefersAudio));
	}, [recording, prefersAudio]);

	useEffect(() => {
		if (!videoEl) return;
		if (!hasSources) return;

		console.log({ m: 'init videojs', videoEl, portalContainer, player });

		if (!player) {
			setPlayer(videojs(videoEl, options));
		} else if (sources) {
			player.src(sources);
		}

		setIsPaused(true);
		setFingerprint(JSON.stringify(sources));
	}, [hasSources, sources, videoEl, portalContainer]);

	useEffect(() => {
		onLoad && onLoad(playback);
		setOnLoad(undefined);
		setVolume(player ? player.volume() * 100 : 100);
	}, [fingerprint]);

	useEffect(() => {
		player?.volume(volume / 100);
	}, [volume]);

	const playerNode = (
		<div data-vjs-player={true}>
			<video
				ref={onVideo}
				className="video-js"
				playsInline
				data-testid={'video-element'}
				onTimeUpdate={() => {
					console.log('onTIme', player);
					if (!player) return;
					setProgress(player.currentTime() / player.duration());
				}}
			/>
		</div>
	);

	const router = useRouter();

	useEffect(() => {
		router.events.on('routeChangeStart', () => {
			document
				.getElementById('mini-player')
				?.appendChild(document.getElementById('video-test') as any);
		});
	}, []);

	return (
		<div className={styles.base}>
			<div id="video-test">{playerNode}</div>
			<div className={styles.content}>
				<PlaybackContext.Provider value={playback}>
					{children}
				</PlaybackContext.Provider>
			</div>
			{recording && (
				<div className={styles.miniplayer}>
					<div
						id="mini-player"
						className={styles.player}
						style={{
							display: isShowingVideo ? 'block' : 'none',
						}}
					></div>
					<div className={styles.meta}>{recording?.title}</div>
					<div className={styles.volume}>
						<VolumeDown />
						{/*TODO: Localize*/}
						<Slider
							value={volume}
							onChange={(e, val) => setVolume(val as number)}
							aria-label={'volume'}
						/>
						<VolumeUp />
					</div>
					<button
						onClick={() =>
							document
								.getElementById('mini-player')
								?.appendChild(document.getElementById('video-test') as any)
						}
					></button>
				</div>
			)}
		</div>
	);
}
