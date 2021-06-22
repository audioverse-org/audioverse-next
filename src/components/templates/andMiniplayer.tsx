import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

import { AndMiniplayerFragment } from '@lib/generated/graphql';

import styles from './andMiniplayer.module.scss';

interface Playable {
	url: string;
	mimeType: string;
}

const getFiles = (
	recording: AndMiniplayerFragment,
	prefersAudio: boolean
): Playable[] => {
	if (!recording) return [];

	const {
		videoStreams = [],
		playerVideoFiles = [],
		playerAudioFiles = [],
	} = recording;

	if (prefersAudio) return playerAudioFiles;
	if (videoStreams.length > 0) return videoStreams;
	if (playerVideoFiles.length > 0) return playerVideoFiles;

	return playerAudioFiles;
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

const hasVideo = (recording: AndMiniplayerFragment) => {
	const { videoStreams = [], playerVideoFiles = [] } = recording;

	return videoStreams.length > 0 || playerVideoFiles.length > 0;
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
	load: (recording: AndMiniplayerFragment) => void;
	hasPlayer: () => boolean;
	hasVideo: () => boolean;
	isShowingVideo: () => boolean;
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
	load: () => undefined,
	hasPlayer: () => false,
	hasVideo: () => false,
	isShowingVideo: () => false,
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
	const [time, setTime] = useState<number | undefined>();
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const [prefersAudio, setPrefersAudio] = useState(false);
	const [sources, setSources] = useState<{ src: string; type: string }[]>([]);

	const hasSources = sources && sources.length > 0;
	const isShowingVideo = !!recording && hasVideo(recording) && !prefersAudio;
	const duration = player?.duration();

	// TODO: Fix poster disappearing after audio playback start
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

	useEffect(() => {
		if (!recording) return;
		setSources(getSources(recording, prefersAudio));
	}, [recording, prefersAudio]);

	useEffect(() => {
		if (!videoEl) return;
		if (!hasSources) return;

		if (!player) {
			setPlayer(videojs(videoEl, options));
		} else if (sources) {
			player.src(sources);
		}

		setIsPaused(true);
	}, [hasSources, sources, videoEl]);

	const playbackContext: PlaybackContextType = {
		play: () => {
			player?.play();
			setIsPaused(false);
		},
		pause: () => {
			player?.pause();
			setIsPaused(true);
		},
		paused: () => isPaused,
		getTime: () => player?.currentTime() || 0,
		setTime: (t: number) => {
			setTime(t);
			player?.currentTime(t);
		},
		setPrefersAudio,
		getProgress: () => (time && duration ? time / duration : 0),
		setProgress: (p: number) => {
			if (!player) return;
			const newTime = p * player.duration();
			playbackContext.setTime(newTime);
		},
		load: (recording: AndMiniplayerFragment) => {
			setRecording(recording);
		},
		hasPlayer: () => !!player,
		hasVideo: () => !!recording && hasVideo(recording),
		isShowingVideo: () => isShowingVideo,
	};

	return (
		<div className={styles.base}>
			<div className={styles.content}>
				<PlaybackContext.Provider value={playbackContext}>
					{children}
				</PlaybackContext.Provider>
			</div>
			<div className={styles.miniplayer}>
				<div
					className={styles.player}
					style={{
						display: isShowingVideo ? 'block' : 'none',
					}}
				>
					<div data-vjs-player={true}>
						<video
							ref={onVideo}
							className="video-js"
							playsInline
							data-testid={'video-element'}
							onTimeUpdate={() => {
								if (!player) return;
								setTime(player.currentTime());
							}}
						/>
					</div>
				</div>
				<div className={styles.meta}>{recording?.title}</div>
			</div>
		</div>
	);
}
