import { Dispatch, Reducer, useReducer } from 'react';

type Processor<T> = (item: T) => void;

type QueueAction<T> =
	| {
			type: 'ADD';
			payload: T;
	  }
	| {
			type: 'CLEAR';
	  }
	| { type: 'PROCESS'; payload: Processor<T> };

export type Queue<T> = {
	add: (item: T) => void;
	clear: () => void;
	process: (processor: Processor<T>) => void;
	items: T[];
};

const reducer = <T>(state: Queue<T>, action: QueueAction<T>): Queue<T> => {
	switch (action.type) {
		case 'ADD':
			return {
				...state,
				items: [...state.items, action.payload],
			};
		case 'PROCESS':
			state.items.forEach(action.payload);
			return state;
		case 'CLEAR':
			if (state.items.length === 0) return state;
			return {
				...state,
				items: [],
			};
		default:
			return state;
	}
};

export default function useQueue<T>(): Queue<T> {
	// @ts-ignore
	const [state, dispatch]: [Queue<T>, Dispatch<QueueAction<T>>] = useReducer<
		Reducer<Queue<T>, QueueAction<T>>
	>(reducer, {
		items: [],
		add: (item: T) => {
			dispatch({ type: 'ADD', payload: item });
		},
		process: (fn: Processor<T>) => {
			dispatch({ type: 'PROCESS', payload: fn });
		},
		clear: () => dispatch({ type: 'CLEAR' }),
	});

	return state;
}
