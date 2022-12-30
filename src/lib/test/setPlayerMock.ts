import videojs from 'video.js';

interface SetPlayerMockOptions {
	isPaused?: boolean;
	time?: number;
	duration?: number;
	volume?: number;
	playbackRate?: number;
	functions?: Partial<videojs.Player>;
	supportsFullScreen?: boolean;
	isFullscreen?: boolean;
}

type MockPlayer = Pick<
	videojs.Player,
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
	_updateOptions: (options: SetPlayerMockOptions) => void;
	_fire: (event: string, data?: any) => void;
};

export const mockVideojs = videojs as unknown as vi.Mock;

export default function setPlayerMock(
	options: SetPlayerMockOptions = {}
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
		play: vi.fn(async () => {
			isPaused = false;
		}),
		pause: vi.fn(() => {
			isPaused = true;
			return mockPlayer as unknown as videojs.Player;
		}),
		paused: vi.fn(() => isPaused),
		currentTime: vi.fn((newTime: number | null = null) => {
			if (newTime !== null) time = newTime;
			return time;
		}),
		volume: vi.fn((newVolume: number | null = null) => {
			if (newVolume !== null) volume = newVolume;
			return volume;
		}) as any,
		duration: vi.fn(() => duration),
		src: vi.fn(),
		options: vi.fn(),
		controlBar: {
			createEl: vi.fn(),
			dispose: vi.fn(),
		} as any,
		playbackRate: vi.fn((newRate?: number) => {
			if (newRate) playbackRate = newRate;
			return playbackRate;
		}),
		defaultPlaybackRate: vi.fn(),
		requestFullscreen: vi.fn(),
		controls: vi.fn(),
		supportsFullScreen: vi.fn(() => supportsFullScreen),
		isFullscreen: vi.fn(() => isFullscreen),
		on: vi.fn((event: string, fn: (data: any) => any) => {
			if (!(event in handlers)) handlers[event] = [];
			handlers[event].push(fn);
		}) as any,
		bufferedEnd: vi.fn(),
		...functions,
	};

	mockVideojs.mockReturnValue(mockPlayer);

	return mockPlayer;
}
