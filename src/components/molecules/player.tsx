import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import videojs, { VideoJsPlayer } from 'video.js';

import { PlayerFragment } from '@lib/generated/graphql';

import BackIcon from '../../../public/img/icon-nudge-left.svg';
import ForwardIcon from '../../../public/img/icon-nudge-right.svg';

import styles from './player.module.scss';

interface Playable {
	url: string;
	mimeType: string;
}

const getFiles = (
	recording: PlayerFragment,
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

const getSources = (recording: PlayerFragment, prefersAudio: boolean) => {
	const files = getFiles(recording, prefersAudio) || [];

	return files.map((f) => ({
		src: f.url,
		type: f.mimeType,
	}));
};

const hasVideo = (recording: PlayerFragment) => {
	const { videoStreams = [], playerVideoFiles = [] } = recording;

	return videoStreams.length > 0 || playerVideoFiles.length > 0;
};

// Source:
// https://github.com/vercel/next.js/blob/canary/examples/with-videojs/components/Player.js

// If this solution becomes unviable, for instance, due to needing to
// update more props than just sources, this alternative approach may work:
// https://github.com/videojs/video.js/issues/4970#issuecomment-520591504

interface PlayerProps {
	recording: PlayerFragment;
}

const Player = ({ recording }: PlayerProps): JSX.Element => {
	const onVideo = useCallback((el) => setVideoEl(el), []);

	const [prefersAudio, setPrefersAudio] = useState(false);
	const [videoEl, setVideoEl] = useState(null);
	const [player, setPlayer] = useState<VideoJsPlayer | null>(null);
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const [time, setTime] = useState<number | undefined>();
	const [sources, setSources] = useState<{ src: string; type: string }[]>([]);

	const hasSources = sources && sources.length > 0;
	const duration = player?.duration();
	const progress = time && duration ? time / duration : 0;

	// TODO: Fix poster disappearing after audio playback start
	const options = {
		poster: 'https://s.audioverse.org/images/template/player-bg4.jpg',
		controls: true,
		fluid: true,
		// TODO: Should this be set back to `auto` once streaming urls are fixed?
		// https://docs.videojs.com/docs/guides/options.html
		preload: 'metadata',
		sources,
	};

	useEffect(() => {
		setSources(getSources(recording, prefersAudio));
	}, [recording, prefersAudio]);

	useEffect(() => {
		if (videoEl == null) return;
		if (!hasSources) return;

		if (!player) {
			setPlayer(videojs(videoEl, options));
		} else if (sources) {
			player.src(sources);
		}
	}, [hasSources, sources, videoEl]);

	useEffect(() => {
		if (!player) return;
		setTime(player.currentTime());
	}, [player]);

	const update = () => {
		if (!player) return;
		setIsPaused(player.paused());
	};

	function setPlayerTime(newTime: number) {
		if (!player) return;
		setTime(newTime);
		player.currentTime(newTime);
	}

	return hasSources ? (
		<div>
			{isPaused ? (
				<button
					aria-label={'play'}
					onClick={() => {
						player?.play();
						update();
					}}
				>
					<PlayArrowIcon />
				</button>
			) : (
				<button
					aria-label={'pause'}
					onClick={() => {
						player?.pause();
						update();
					}}
				>
					<PauseIcon />
				</button>
			)}
			<div
				className={styles.waves}
				style={{ '--progress': `${progress * 100}%` } as CSSProperties}
			>
				<input
					type="range"
					aria-label={'progress'}
					value={progress * 100}
					onChange={(e) => {
						if (!player) return;
						const percent = parseInt(e.target.value) / 100;
						const newTime = percent * player.duration();
						setPlayerTime(newTime);
					}}
				/>
			</div>
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
			<div>
				<button
					aria-label={'back 15 seconds'}
					onClick={() => {
						if (!time) return;
						setPlayerTime(time - 15);
					}}
				>
					<BackIcon />
				</button>
				<button
					aria-label={'forward 15 seconds'}
					onClick={() => {
						if (!time) return;
						setPlayerTime(time + 15);
					}}
				>
					<ForwardIcon />
				</button>
			</div>
			{hasVideo(recording) && (
				<button onClick={() => setPrefersAudio(!prefersAudio)}>
					Play {prefersAudio ? 'Video' : 'Audio'}
				</button>
			)}
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
