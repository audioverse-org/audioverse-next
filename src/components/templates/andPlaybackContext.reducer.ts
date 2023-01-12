export type PlaybackAction = {
	type: 'PLAY' | 'PAUSE';
};

export type PlaybackState = {
	paused: boolean;
};

export const initialState: PlaybackState = {
	paused: true,
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
		default:
			return state;
	}
}
