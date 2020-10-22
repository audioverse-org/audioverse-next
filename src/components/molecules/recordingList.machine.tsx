import { Machine } from 'xstate';

const machine = Machine({
	initial: 'all',
	states: {
		all: {
			on: {
				VIDEO: 'video',
				AUDIO: 'audio',
			},
		},
		video: {
			on: {
				ALL: 'all',
				AUDIO: 'audio',
			},
		},
		audio: {
			on: {
				ALL: 'all',
				VIDEO: 'video',
			},
		},
	},
});

export default machine;
