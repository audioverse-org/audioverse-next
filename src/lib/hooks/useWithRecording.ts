import { VjsContext, VjsContextType } from '@components/templates/andVjs';
import { AndMiniplayerFragment } from '@components/templates/__generated__/andMiniplayer';
import { Reducer, useContext, useEffect, useMemo, useReducer } from 'react';
import useIsLoaded from '@lib/hooks/useIsLoaded';
import useQueue, { Queue } from '@lib/hooks/useQueue';

type Job = (c: VjsContextType) => void;

type UseWithRecordingState = {
	toLoad: AndMiniplayerFragment | AndMiniplayerFragment[] | null;
	prefersAudio: boolean;
	queue: Queue<Job>;
	isLoaded: boolean;
	context: VjsContextType | undefined;
	withRecording: (fn: Job) => void;
};

type UseWithRecordingAction =
	| {
			type: 'add';
			payload: Job;
	  }
	| {
			type: 'updateState';
			payload: Partial<UseWithRecordingState>;
	  };

function loadRecording(
	context: VjsContextType,
	recording: AndMiniplayerFragment | AndMiniplayerFragment[]
) {
	const toLoad = Array.isArray(recording) ? recording[0] : recording;

	context.setRecording(toLoad);
}

function loadRecordingMaybe(s: UseWithRecordingState) {
	if (!s.toLoad) return;
	if (s.isLoaded) return;
	if (!s.context) return;
	if (!s.queue.items.length) return;

	loadRecording(s.context, s.toLoad);
}

const updateState = (
	prev: UseWithRecordingState,
	update: Partial<UseWithRecordingState>
) => {
	const s = { ...prev, ...update };
	const { context: c, queue: q } = s;

	if (!c) return s;

	loadRecordingMaybe(s);

	if (!s.isLoaded) return s;

	q.process((fn) => fn(c));
	q.clear();

	return s;
};

const reducer = (
	state: UseWithRecordingState,
	action: UseWithRecordingAction
) => {
	switch (action.type) {
		case 'add':
			if (!state.toLoad) return state;
			if (state.isLoaded && state.context) {
				action.payload(state.context);
			} else {
				state.queue.add(action.payload);
			}
			return state;
		case 'updateState':
			return updateState(state, action.payload);
		default:
			return state;
	}
};

export default function useWithRecording(
	recording: AndMiniplayerFragment | null,
	options: {
		playlistRecordings?: AndMiniplayerFragment[];
		prefersAudio?: boolean;
	} = {}
): (fn: Job) => void {
	const context = useContext(VjsContext);
	const isLoaded = useIsLoaded(recording);
	const queue = useQueue<Job>();
	const toLoad = useMemo(
		() => options.playlistRecordings || recording,
		[recording, options.playlistRecordings]
	);

	const [state, dispatch] = useReducer<
		Reducer<UseWithRecordingState, UseWithRecordingAction>
	>(reducer, {
		toLoad,
		queue,
		isLoaded,
		context,
		prefersAudio: options.prefersAudio ?? false,
		withRecording: (fn: Job): void => {
			dispatch({ type: 'add', payload: fn });
		},
	});

	useEffect(() => {
		dispatch({
			type: 'updateState',
			payload: {
				toLoad,
				isLoaded,
				context,
				queue,
			},
		});
	}, [dispatch, toLoad, isLoaded, context, queue]);

	return state.withRecording;
}
