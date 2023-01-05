import set from 'lodash/set';

import { fetchApi } from '@lib/api/fetchApi';
import { storeRequest } from '@lib/api/storeRequest';
import { describe, expect, it, Mock, vi } from 'vitest';

const noopQuery = 'query noop { noop { noop } }';

global.fetch = vi.fn();
vi.unmock('@lib/api/fetchApi');

const mockFetchResponse = () => {
	(global.fetch as Mock).mockResolvedValue({
		text: () => Promise.resolve(JSON.stringify('result')),
		ok: true,
	});
};

const setRequest = (cookie = '') => {
	const req = set({}, 'headers.cookie', cookie);

	storeRequest(req as any);
};

describe('fetchApi', () => {
	it('uses saved request', async () => {
		mockFetchResponse();
		setRequest('avSession=the_token');

		await fetchApi(noopQuery);

		const api_url = 'https://graphql-staging.audioverse.org/graphql';

		expect(global.fetch).toBeCalledWith(api_url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-av-session': 'the_token',
			},
			body: expect.any(String),
		});
	});

	it('leaves auth token out of request if none saved', async () => {
		mockFetchResponse();
		setRequest();

		await fetchApi(noopQuery);

		const api_url = 'https://graphql-staging.audioverse.org/graphql';

		expect(global.fetch).toBeCalledWith(api_url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: expect.any(String),
		});
	});
});
