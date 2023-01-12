export type PlaybackAction =
	| {
			type: 'PLAY' | 'PAUSE';
	  }
	| {
			type: 'SET_PREFERS_AUDIO';
			payload: boolean;
	  };

export type PlaybackState = {
	paused: boolean;
	prefersAudio: boolean;
};

export const initialState: PlaybackState = {
	paused: true,
	prefersAudio: false,
};

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
			return { ...state, prefersAudio: action.payload };
		default:
			return state;
	}
}
