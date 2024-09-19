import videojs from 'video.js';
import Player from 'video.js/dist/types/player';

interface SetPlayerMockOptions {
	isPaused?: boolean;
	time?: number;
	duration?: number;
	volume?: number;
	playbackRate?: number;
	functions?: Partial<Player>;
	supportsFullScreen?: boolean;
	isFullscreen?: boolean;
}

type MockPlayer = Pick<
	Player,
	| 'play'
	| 'pause'
	| 'paused'
	| 'currentTime'
	| 'duration'
	| 'src'
	| 'volume'
	| 'options'
	| 'playbackRate'
	| 'requestFullscreen'
	| 'controls'
	| 'supportsFullScreen'
	| 'on'
> & {
	_updateOptions: (options: SetPlayerMockOptions) => void;
	_fire: (event: string, data?: any) => void;
};

export const mockVideojs = videojs as unknown as jest.Mock;

export default function setPlayerMock(
	options: SetPlayerMockOptions = {},
): MockPlayer {
	let {
		isPaused = true,
		time = 50,
		duration = 100,
		volume = 0.5,
		playbackRate = 1,
		functions = {},
	} = options;
	const { supportsFullScreen = true, isFullscreen = false } = options;

	const handlers: Record<string, Array<(data: any) => any>> = {};

	const mockPlayer: MockPlayer = {
		_updateOptions: (options) => {
			const update = (key: keyof SetPlayerMockOptions, fallback: any) => {
				if (!(key in options)) return fallback;
				if (options[key] === undefined) return fallback;
				return options[key];
			};
			isPaused = update('isPaused', isPaused);
			time = update('time', time);
			duration = update('duration', duration);
			functions = update('functions', functions);
		},
		_fire: (event: string, data: any = null) => {
			handlers[event]?.map((fn: (data: any) => any) => fn(data));
		},
		play: jest.fn(async () => {
			isPaused = false;
		}),
		pause: jest.fn(() => {
			isPaused = true;
			return mockPlayer as unknown as Player;
		}),
		paused: jest.fn(() => isPaused),
		currentTime: jest.fn((newTime: number | undefined) => {
			if (newTime !== undefined) time = newTime;
			return time;
		}),
		volume: jest.fn((newVolume: number | null = null) => {
			if (newVolume !== null) volume = newVolume;
			return volume;
		}) as any,
		duration: jest.fn(() => duration),
		src: jest.fn(),
		options: jest.fn(),
		playbackRate: jest.fn((newRate?: number) => {
			if (newRate) playbackRate = newRate;
			return playbackRate;
		}),
		defaultPlaybackRate: jest.fn(),
		requestFullscreen: jest.fn(),
		controls: jest.fn(),
		supportsFullScreen: jest.fn(() => supportsFullScreen),
		isFullscreen: jest.fn(() => isFullscreen),
		on: jest.fn((event: string, fn: (data: any) => any) => {
			if (!(event in handlers)) handlers[event] = [];
			handlers[event].push(fn);
		}) as any,
		bufferedEnd: jest.fn(),
		...functions,
	};

	mockVideojs.mockReturnValue(mockPlayer);

	return mockPlayer;
}
