import _ from 'lodash';

import { fetchApi, storeRequest } from '@lib/api/fetchApi';

const noopQuery = 'query noop { noop { noop } }';

global.fetch = jest.fn();
jest.unmock('@lib/api/fetchApi');

const mockFetchResponse = () => {
	(global.fetch as jest.Mock).mockResolvedValue({
		text: () => Promise.resolve(JSON.stringify('result')),
		ok: true,
	});
};

const setRequest = (cookie = '') => {
	const req = _.set({}, 'headers.cookie', cookie);

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

	it('dedupes fragment definitions', async () => {
		mockFetchResponse();
		setRequest();

		const doc =
			'\n    query getSermonDetailData($id: ID!) {\n  sermon(id: $id) {\n    ...recording\n    sequence {\n      title\n      recordings {\n        nodes {\n          ...recordingList\n        }\n      }\n    }\n  }\n}\n    \n    fragment recording on Recording {\n  id\n  title\n  persons {\n    ...speakerName\n  }\n  audioFiles {\n    url\n    filesize\n    mimeType\n  }\n  videoFiles(allowedContainers: [M4A, M4V, MOV, MP4]) {\n    url\n    filesize\n    mimeType\n  }\n  videoStreams: videoFiles(allowedContainers: [M3U8_WEB]) {\n    url\n    filesize\n    mimeType\n  }\n  videoDownloads: videoFiles(allowedContainers: MP4) {\n    id\n    url\n    filesize\n  }\n  audioDownloads: audioFiles(allowedContainers: MP3) {\n    id\n    url\n    filesize\n  }\n  description\n  imageWithFallback {\n    url(size: 50)\n  }\n  recordingDate\n  recordingTags {\n    nodes {\n      tag {\n        id\n        name\n      }\n    }\n  }\n  sponsor {\n    title\n    location\n  }\n  sequence {\n    id\n    title\n  }\n  copyrightYear\n  distributionAgreement {\n    sponsor {\n      title\n    }\n    license {\n      summary\n      image {\n        url(size: 100)\n      }\n    }\n  }\n}\n    \n    fragment speakerName on Person {\n  id\n  name\n  imageWithFallback {\n    url(size: 100)\n  }\n  summary\n  website\n  viewerHasFavorited\n}\n    \n\n    fragment recordingList on Recording {\n  id\n  title\n  description\n  duration\n  imageWithFallback {\n    url(size: 50)\n  }\n  persons {\n    ...speakerName\n  }\n  videoFiles {\n    url\n  }\n  recordingDate\n  canonicalUrl\n}\n    \n    fragment speakerName on Person {\n  id\n  name\n  imageWithFallback {\n    url(size: 100)\n  }\n  summary\n  website\n  viewerHasFavorited\n}\n    ';

		await fetchApi(doc);

		const calls = (global.fetch as jest.Mock).mock.calls;
		const body = calls[0][1].body;
		const query = JSON.parse(body).query;
		const matches = query.match(/fragment speakerName on Person/g) || [];

		expect(matches).toHaveLength(1);
	});
});
