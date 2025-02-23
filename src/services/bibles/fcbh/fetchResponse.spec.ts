import { FCBH_API_BASE } from '../constants';

const { default: fetchResponse } = jest.requireActual(
	'~src/services/bibles/fcbh/fetchResponse',
);

// Mock manageAsyncFunction to return the inner function
jest.mock('~src/lib/manageAsyncFunction', () => ({
	manageAsyncFunction: (fn: unknown) => fn,
}));

describe('fetchResponse', () => {
	let originalFetch: typeof global.fetch;
	let mockFetch: jest.Mock;
	let originalWindow: typeof global.window;
	let originalProcessEnv: typeof process.env;

	beforeEach(() => {
		originalFetch = global.fetch;
		originalWindow = (global as any).window;
		originalProcessEnv = process.env;
		mockFetch = jest.fn();
		global.fetch = mockFetch;
		delete (global as any).window;
		process.env = { ...process.env, BIBLE_BRAIN_KEY: 'test-key' };
	});

	afterEach(() => {
		global.fetch = originalFetch;
		(global as any).window = originalWindow;
		process.env = originalProcessEnv;
		jest.resetModules();
	});

	it('cleans route by removing query params and normalizing slashes', async () => {
		const mockData = { data: 'test' };
		mockFetch.mockImplementation(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockData),
			}),
		);

		const result = await fetchResponse('///path//to//resource?param=value');

		expect(mockFetch).toHaveBeenCalledWith(
			`${FCBH_API_BASE}/path/to/resource`,
			{
				method: 'GET',
				headers: {
					v: '4',
					key: 'test-key',
				},
			},
		);
		expect(result).toEqual(mockData);
	});

	it('uses FCBH API directly during SSR', async () => {
		const mockData = { data: 'test' };
		mockFetch.mockImplementation(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockData),
			}),
		);

		const result = await fetchResponse('test/path');

		expect(mockFetch).toHaveBeenCalledWith(`${FCBH_API_BASE}/test/path`, {
			method: 'GET',
			headers: {
				v: '4',
				key: 'test-key',
			},
		});
		expect(result).toEqual(mockData);
	});

	it('uses Next.js API proxy in browser', async () => {
		(global as any).window = {};
		const mockData = { data: 'test' };
		mockFetch.mockImplementation(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockData),
			}),
		);

		const result = await fetchResponse('test/path');

		expect(mockFetch).toHaveBeenCalledWith('/api/fcbh/test/path', {
			method: 'GET',
			headers: {},
		});
		expect(result).toEqual(mockData);
	});

	it('throws error on non-ok response', async () => {
		mockFetch.mockImplementation(() =>
			Promise.resolve({
				ok: false,
				status: 404,
				statusText: 'Not Found',
				json: () => Promise.reject(new Error('Should not be called')),
			}),
		);

		await expect(() => fetchResponse('test/path')).rejects.toThrow(
			'FCBH request failed: 404 Not Found',
		);
	});

	it('returns parsed JSON response', async () => {
		const mockData = { test: 'data' };
		mockFetch.mockImplementation(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockData),
			}),
		);

		const result = await fetchResponse('test/path');

		expect(result).toEqual(mockData);
	});
});
