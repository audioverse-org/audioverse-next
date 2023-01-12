import { AndMiniplayerFragment } from '@lib/generated/graphql';
import hasVideo from '@lib/hasVideo';

export type PlaybackAction =
	| {
			type: 'PLAY' | 'PAUSE' | 'ADVANCE';
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
			payload?: (el: Element) => void;
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
	sourceRecordings: AndMiniplayerFragment[];
	videoLocation?: 'miniplayer' | 'portal';
};

export const initialState: PlaybackState = {
	paused: true,
	prefersAudio: false,
	videojs: import('video.js'),
	airplay: import('@silvermine/videojs-airplay'),
	chromecast: import('@silvermine/videojs-chromecast'),
	isShowingVideo: false,
	sourceRecordings: [],
};

function updateIsShowingVideo(s: PlaybackState): PlaybackState {
	const n = !!s.recording && hasVideo(s.recording) && !s.prefersAudio;
	return { ...s, isShowingVideo: n };
}

function updateVideoLocation(state: PlaybackState): PlaybackState {
	const f = (s: PlaybackState) => {
		if (!s.isShowingVideo) return undefined;
		if (s.videoHandler) return 'portal';
		return 'miniplayer';
	};

	return { ...state, videoLocation: f(state) };
}

function updateState(
	state: PlaybackState,
	newState: Partial<PlaybackState>
): PlaybackState {
	const s0 = { ...state, ...newState };
	const s1 = updateIsShowingVideo(s0);
	const s2 = updateVideoLocation(s1);
	return s2;
}

export function reducer(
	state: PlaybackState,
	action: PlaybackAction
): PlaybackState {
	switch (action.type) {
		case 'PLAY':
			return updateState(state, { paused: false });
		case 'PAUSE':
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
				videoHandler: action.payload,
			});
		case 'ADVANCE':
			if (state.sourceRecordings.length < 2) return state;
			return updateState(state, {
				recording: state.sourceRecordings[1],
				sourceRecordings: state.sourceRecordings.slice(1),
			});
		default:
			return state;
	}
}
