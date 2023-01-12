import { AndMiniplayerFragment } from '@lib/generated/graphql';
import hasVideo from '@lib/hasVideo';

export type PlaybackAction =
	| {
			type: 'PLAY' | 'PAUSE';
	  }
	| {
			type: 'SET_PREFERS_AUDIO';
			payload: boolean;
	  }
	| {
			type: 'SET_RECORDING';
			payload: AndMiniplayerFragment;
	  };

export type PlaybackState = {
	paused: boolean;
	prefersAudio: boolean;
	recording?: AndMiniplayerFragment;
	videojs: Promise<typeof import('video.js')>;
	airplay: Promise<typeof import('@silvermine/videojs-airplay')>;
	chromecast: Promise<typeof import('@silvermine/videojs-chromecast')>;
	isShowingVideo: boolean;
};

export const initialState: PlaybackState = {
	paused: true,
	prefersAudio: false,
	videojs: import('video.js'),
	airplay: import('@silvermine/videojs-airplay'),
	chromecast: import('@silvermine/videojs-chromecast'),
	isShowingVideo: false,
};

function isShowingVideo(state: PlaybackState): boolean {
	return !!state.recording && hasVideo(state.recording) && !state.prefersAudio;
}

export function reducer(
	state: PlaybackState,
	action: PlaybackAction
): PlaybackState {
	switch (action.type) {
		case 'PLAY':
			return { ...state, paused: false };
		case 'PAUSE':
			return { ...state, paused: true };
		case 'SET_PREFERS_AUDIO':
			if (!state.recording) return state;
			return {
				...state,
				prefersAudio: action.payload,
				isShowingVideo: isShowingVideo({
					...state,
					prefersAudio: action.payload,
				}),
			};
		case 'SET_RECORDING':
			return {
				...state,
				recording: action.payload,
				isShowingVideo: isShowingVideo({
					...state,
					recording: action.payload,
				}),
			};
		default:
			return state;
	}
}
