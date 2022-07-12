import { Reducer, useContext, useEffect, useReducer } from 'react';
import { VjsContext, VjsContextType } from '@components/templates/andVjs';
import useQueue, { Queue } from '@lib/hooks/useQueue';

type Job = (c: VjsContextType) => void;

type UseWithContextState = {
	context: VjsContextType | undefined;
	queue: Queue<Job>;
	withVjs: (fn: Job) => void;
};
type UseWithContextAction =
	| {
			type: 'add';
			payload: Job;
	  }
	| {
			type: 'updateState';
			payload: Partial<UseWithContextState>;
	  };

const updateState = (
	prev: UseWithContextState,
	update: Partial<UseWithContextState>
) => {
	const s = { ...prev, ...update };
	const { context: c, queue: q } = s;

	if (!c) return s;

	q.process((fn) => c.vjs.one('canplay', () => fn(c)));
	q.clear();

	return s;
};

const reducer = (state: UseWithContextState, action: UseWithContextAction) => {
	switch (action.type) {
		case 'add':
			if (state.context) {
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

export default function useWithVjs() {
	const context = useContext(VjsContext);
	const queue = useQueue<Job>();

	const [state, dispatch] = useReducer<
		Reducer<UseWithContextState, UseWithContextAction>
	>(reducer, {
		context,
		queue,
		withVjs: (fn: Job) => {
			dispatch({ type: 'add', payload: fn });
		},
	});

	useEffect(() => {
		dispatch({
			type: 'updateState',
			payload: {
				context,
				queue,
			},
		});
	}, [context, queue]);

	return state.withVjs;
}
