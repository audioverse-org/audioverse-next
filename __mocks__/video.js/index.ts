import type og from 'video.js';
import ReactTestUtils, { act } from 'react-dom/test-utils';

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

type MockedMethodName =
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
	| 'off';

type MockPlayer = Pick<og.Player, MockedMethodName> & {
	_updateOptions: (options: Options) => void;
	_fire: (event: string, data?: any) => void;
};

const videojs = jest.fn(() => __mockPlayer);

let __mockPlayer: MockPlayer;

type Handler = (data: any) => any;
type Handlers = Record<string, Array<Handler>>;

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

	const handlers: Handlers = {};
	const oneTimeHandlers: Handlers = {};

	const appendHandler = (
		event: VideoJsEvent | VideoJsEvent[],
		handler: Handler,
		handlers: Handlers
	) => {
		if (Array.isArray(event)) {
			event.forEach((e) => appendHandler(e, handler, handlers));
		} else {
			if (!(event in handlers)) {
				handlers[event] = [];
			}
			handlers[event].push(handler);
		}
	};

	const _fire = (event: string, data: any = null) => {
		handlers[event]?.map((fn: (data: any) => any) => fn(data));
		oneTimeHandlers[event]?.map((fn: (data: any) => any) => fn(data));
		delete oneTimeHandlers[event];
	};

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
		_fire,
		play: jest.fn(async () => {
			isPaused = false;
			_fire('play');
		}),
		pause: jest.fn(() => {
			isPaused = true;
			_fire('pause');
			return __mockPlayer as unknown as og.Player;
		}),
		paused: jest.fn(() => isPaused),
		currentTime: jest.fn((newTime: number | null = null) => {
			if (newTime !== null) {
				time = newTime;
				_fire('timeupdate');
			}
			return time;
		}),
		volume: jest.fn((newVolume: number | null = null) => {
			if (newVolume !== null) volume = newVolume;
			return volume;
		}) as any,
		duration: jest.fn(() => duration),
		src: jest.fn(() => {
			_fire('canplay');
		}) as any,
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
		on: jest.fn((event: VideoJsEvent | VideoJsEvent[], fn: Handler) => {
			appendHandler(event, fn, handlers);
		}) as any,
		off: jest.fn((event: string, fn: (data: any) => any) => {
			if (!(event in handlers)) return;
			handlers[event] = handlers[event].filter((f) => f !== fn);
		}) as any,
		one: jest.fn((event: VideoJsEvent | VideoJsEvent[], fn: Handler) => {
			appendHandler(event, fn, oneTimeHandlers);
		}) as any,
		bufferedEnd: jest.fn(),
		...functions,
	};

	videojs.mockImplementation(() => __mockPlayer);

	return __mockPlayer;
}

declare module 'video.js' {
	const __mockPlayer: MockPlayer;
	function __loadMockPlayer(options?: SetPlayerMockOptions): MockPlayer;
}

export { __mockPlayer, __loadMockPlayer };

export default videojs;
