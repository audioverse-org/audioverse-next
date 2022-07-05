import type og from 'video.js';

type Options = {
	isPaused?: boolean;
	time?: number;
	duration?: number;
	volume?: number;
	playbackRate?: number;
	functions?: Partial<og.Player>;
	supportsFullScreen?: boolean;
	isFullscreen?: boolean;
};

type SetPlayerMockOptions =
	| Options
	| {
			player: unknown;
	  };

type MockPlayer = Pick<
	og.Player,
	| 'play'
	| 'pause'
	| 'paused'
	| 'currentTime'
	| 'duration'
	| 'src'
	| 'volume'
	| 'options'
	| 'controlBar'
	| 'playbackRate'
	| 'requestFullscreen'
	| 'controls'
	| 'supportsFullScreen'
	| 'on'
> & {
	_updateOptions: (options: Options) => void;
	_fire: (event: string, data?: any) => void;
};

let __mockPlayer: MockPlayer;

function __loadMockPlayer(options: SetPlayerMockOptions = {}): MockPlayer {
	if ('player' in options) {
		return options.player as MockPlayer;
	}

	let {
		isPaused = true,
		time = 50,
		duration = 100,
		volume = 0.5,
		playbackRate = 1,
		functions = {},
		supportsFullScreen = true,
		isFullscreen = false,
	} = options;

	const handlers: Record<string, Array<(data: any) => any>> = {};

	__mockPlayer = {
		_updateOptions: (options) => {
			const update = (key: keyof Options, fallback: any) => {
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
			return __mockPlayer as unknown as og.Player;
		}),
		paused: jest.fn(() => isPaused),
		currentTime: jest.fn((newTime: number | null = null) => {
			if (newTime !== null) time = newTime;
			return time;
		}),
		volume: jest.fn((newVolume: number | null = null) => {
			if (newVolume !== null) volume = newVolume;
			return volume;
		}) as any,
		duration: jest.fn(() => duration),
		src: jest.fn(),
		options: jest.fn(),
		controlBar: {
			createEl: jest.fn(),
			dispose: jest.fn(),
		} as any,
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

	return __mockPlayer;
}

const videojs = jest.fn(() => __mockPlayer);

beforeEach(() => {
	__loadMockPlayer();
	videojs.mockImplementation(() => __mockPlayer);
});

declare module 'video.js' {
	const __mockPlayer: MockPlayer;
	function __loadMockPlayer(options?: SetPlayerMockOptions): MockPlayer;
}

export { __mockPlayer, __loadMockPlayer };

export default videojs;
