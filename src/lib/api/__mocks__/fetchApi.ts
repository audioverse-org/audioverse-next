import { beforeEach, vi } from 'vitest';

declare module '../fetchApi' {
	const __load: (query: string, result: any) => void;
	const __loadReject: (query: string, result: any) => void;
}

const m = new Map<
	string,
	{
		data: any;
		resolve: boolean;
	}
>();

export const __load = (query: string, result: any) =>
	m.set(query, {
		data: result,
		resolve: true,
	});

export const __loadReject = (query: string, result: any) =>
	m.set(query, {
		data: result,
		resolve: false,
	});

export const fetchApi = vi.fn();

beforeEach(() => {
	m.clear();
	fetchApi.mockReset().mockImplementation((q) => {
		const { data, resolve } = m.get(q) ?? {
			data: null,
			resolve: false,
		};

		if (resolve) {
			return Promise.resolve(data);
		}

		return Promise.reject(data);
	});
});
