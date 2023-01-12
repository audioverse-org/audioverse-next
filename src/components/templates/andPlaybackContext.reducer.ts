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
			type: 'SET_RECORDING';
			payload: AndMiniplayerFragment;
	  }
	| {
			type: 'SET_VIDEO_HANDLER';
			payload?: (el: Element) => void;
	  }
	| {
			type: 'SET_SOURCE_RECORDINGS';
			payload: AndMiniplayerFragment[];
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

function isShowingVideo(state: PlaybackState): boolean {
	return !!state.recording && hasVideo(state.recording) && !state.prefersAudio;
}

function getVideoLocation(
	state: PlaybackState
): PlaybackState['videoLocation'] {
	if (!state.isShowingVideo) return undefined;
	if (state.videoHandler) return 'portal';
	return 'miniplayer';
}

function updateState(
	state: PlaybackState,
	newState: Partial<PlaybackState>
): PlaybackState {
	const _isShowingVideo = isShowingVideo({
		...state,
		...newState,
	});

	return {
		...state,
		...newState,
		isShowingVideo: _isShowingVideo,
		videoLocation: getVideoLocation({
			...state,
			...newState,
			isShowingVideo: _isShowingVideo,
		}),
	};
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
		case 'SET_RECORDING':
			return updateState(state, {
				recording: action.payload,
			});
		case 'SET_VIDEO_HANDLER':
			return updateState(state, {
				videoHandler: action.payload,
			});
		case 'SET_SOURCE_RECORDINGS':
			return updateState(state, {
				sourceRecordings: action.payload,
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
