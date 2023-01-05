import { __load, fetchApi } from './fetchApi';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./fetchApi');

describe('fetchApi mock', () => {
	it('runs', () => {
		fetchApi('query');
	});

	it('has load helper', async () => {
		__load('query', 'result');

		const result = await fetchApi('query');

		expect(result).toBe('result');
	});

	it('tracks multiple results', async () => {
		__load('query1', 'result1');
		__load('query2', 'result2');

		const result1 = await fetchApi('query1');
		const result2 = await fetchApi('query2');

		expect(result1).toBe('result1');
		expect(result2).toBe('result2');
	});
});
