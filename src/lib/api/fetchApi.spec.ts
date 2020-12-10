import _ from 'lodash';

import { fetchApi, storeRequest } from '@lib/api/fetchApi';

global.fetch = jest.fn();

describe('fetchApi', () => {
	it('uses saved request', async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			json: () => Promise.resolve('result'),
		});

		const req = _.set({}, 'headers.cookie', 'avSession=the_token');

		storeRequest(req as any);

		await fetchApi('the_query');

		const api_url = 'https://graphql-staging.audioverse.org/graphql';

		expect(global.fetch).toBeCalledWith(api_url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-av-session': 'the_token',
			},
			body: JSON.stringify({ query: 'the_query', variables: {} }),
		});
	});
});
