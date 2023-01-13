import { getSessionToken } from '@lib/cookies';
import {
	AndMiniplayerFragment,
	recordingPlaybackProgressSet,
	Scalars,
} from '@lib/generated/graphql';
import hasVideo from '@lib/hasVideo';
import throttle from 'lodash/throttle';
import { VideoJsPlayer } from 'video.js';
import getSources, { Playable } from '@lib/getSources';

export type PlaybackAction =
	| {
			type:
				| 'PLAY'
				| 'PAUSE'
				| 'ADVANCE'
				| 'TRIGGER_CHROMECAST'
				| 'TRIGGER_AIRPLAY';
	  }
	| {
			type: 'SET_PREFERS_AUDIO';
			payload: boolean;
	  }
	| {
			type: 'SET_RECORDINGS';
			payload: AndMiniplayerFragment[];
	  }
	| {
			type: 'SET_VIDEO_HANDLER';
			payload?: {
				id: Scalars['ID'];
				handler: (el: Element) => void;
			};
	  }
	| {
			type: 'SET_PROGRESS';
			payload: number;
	  }
	| {
			type: 'SET_BUFFERED_PROGRESS';
			payload: number;
	  }
	| {
			type: 'SET_VOLUME';
			payload: number;
	  }
	| {
			type: 'SET_SPEED';
			payload: number;
	  }
	| {
			type: 'SET_PLAYER';
			payload: VideoJsPlayer;
	  }
	| {
			type: 'SET_SOURCES';
			payload: Playable[];
	  }
	| {
			type: 'SET_TIME';
			payload: number;
	  };

export type PlaybackState = {
	paused: boolean;
	prefersAudio: boolean;
	recording?: AndMiniplayerFragment;
	videojs: Promise<typeof import('video.js')>;
	airplay: Promise<typeof import('@silvermine/videojs-airplay')>;
	chromecast: Promise<typeof import('@silvermine/videojs-chromecast')>;
	isShowingVideo: boolean;
	videoHandler?: (el: Element) => void;
	videoHandlerId?: Scalars['ID'];
	sourceRecordings: AndMiniplayerFragment[];
	videoLocation?: 'miniplayer' | 'portal';
	progress: number;
	bufferedProgress: number;
	volume: number;
	speed: number;
	player?: VideoJsPlayer;
	sources: Playable[];
	duration: number;
};

export const initialState: PlaybackState = {
	paused: true,
	prefersAudio: false,
	videojs: import('video.js'),
	airplay: import('@silvermine/videojs-airplay'),
	chromecast: import('@silvermine/videojs-chromecast'),
	isShowingVideo: false,
	sourceRecordings: [],
	progress: 0,
	bufferedProgress: 0,
	volume: 100,
	speed: 1,
	sources: [],
	duration: 0,
};

function syncIsShowingVideo(s: PlaybackState): PlaybackState {
	const n = !!s.recording && hasVideo(s.recording) && !s.prefersAudio;
	return { ...s, isShowingVideo: n };
}

function syncVideoLocation(state: PlaybackState): PlaybackState {
	const f = (s: PlaybackState) => {
		if (!s.isShowingVideo) return undefined;
		if (s.videoHandler) return 'portal';
		return 'miniplayer';
	};

	return { ...state, videoLocation: f(state) };
}

function syncSources(state: PlaybackState): PlaybackState {
	if (!state.recording) return state;

	return {
		...state,
		sources: getSources(state.recording, state.prefersAudio),
	};
}

function syncDuration(state: PlaybackState): PlaybackState {
	return {
		...state,
		duration: state.sources[0]?.duration || state.recording?.duration || 0,
	};
}

function updateState(
	state: PlaybackState,
	newState: Partial<PlaybackState>
): PlaybackState {
	const s0 = { ...state, ...newState };
	const s1 = syncIsShowingVideo(s0);
	const s2 = syncVideoLocation(s1);
	const s3 = syncSources(s2);
	const s4 = syncDuration(s3);
	return s4;
}

function setBufferedProgress(state: PlaybackState, progress: number) {
	updateServerProgress(state, progress);

	const p = Math.max(
		state.bufferedProgress, // Don't ever reduce the buffered amount
		state.progress, // We've always buffered as much as we're playing
		progress // Actually use computed progress
	);

	return updateState(state, {
		bufferedProgress: p >= 0.99 ? 1 : +p.toFixed(2),
	});
}

const SERVER_UPDATE_WAIT_TIME = 5 * 1000;

const updateServerProgress = throttle(
	(state: PlaybackState, progress: number) => {
		if (!getSessionToken() || !state.recording) return;
		recordingPlaybackProgressSet({
			id: state.recording.id,
			percentage: progress,
		});
	},
	SERVER_UPDATE_WAIT_TIME,
	{ leading: true }
);

export function reducer(
	state: PlaybackState,
	action: PlaybackAction
): PlaybackState {
	switch (action.type) {
		case 'PLAY':
			return updateState(state, { paused: false });
		case 'PAUSE':
			state.player?.pause();
			return updateState(state, { paused: true });
		case 'SET_PREFERS_AUDIO':
			if (!state.recording) return state;
			return updateState(state, {
				prefersAudio: action.payload,
			});
		case 'SET_RECORDINGS':
			return updateState(state, {
				recording: action.payload[0],
				sourceRecordings: action.payload,
			});
		case 'SET_VIDEO_HANDLER':
			return updateState(state, {
				videoHandlerId: action.payload?.id,
				videoHandler: action.payload?.handler,
			});
		case 'ADVANCE':
			if (state.sourceRecordings.length < 2) return state;
			return updateState(state, {
				recording: state.sourceRecordings[1],
				sourceRecordings: state.sourceRecordings.slice(1),
			});
		case 'SET_PROGRESS':
			return updateState(state, {
				progress: action.payload,
			});
		case 'SET_BUFFERED_PROGRESS':
			return setBufferedProgress(state, action.payload);
		case 'SET_TIME':
			if (!state.player) return state;
			state.player.currentTime(action.payload);
			return updateState(state, {
				progress: action.payload / state.duration,
			});
		case 'SET_VOLUME':
			state.player?.volume(action.payload / 100);
			return updateState(state, {
				volume: action.payload,
			});
		case 'SET_SPEED':
			state.player?.playbackRate(action.payload);
			state.player?.defaultPlaybackRate(action.payload);
			return updateState(state, {
				speed: action.payload,
			});
		case 'SET_PLAYER':
			return updateState(state, {
				player: action.payload,
			});
		case 'TRIGGER_CHROMECAST':
			state.player?.trigger('chromecastRequested');
			return state;
		case 'TRIGGER_AIRPLAY':
			state.player?.trigger('airPlayRequested');
			return state;
		case 'SET_SOURCES':
			return updateState(state, {
				sources: action.payload,
			});
		default:
			return state;
	}
}
