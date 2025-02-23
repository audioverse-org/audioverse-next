import { when } from 'jest-when';

import { fetchApi } from '~lib/api/fetchApi';

import {
	GetGraphqlChaptersDocument,
	SearchBibleBooksDocument,
} from './__generated__/getChapters';
import { fetchFcbhChapters } from './fcbh/fetchFcbhChapters';
import fetchResponse from './fcbh/fetchResponse';
import getChapters from './getChapters';

jest.mock('./fcbh/fetchFcbhChapters');

describe('getChapters', () => {
	beforeEach(() => {
		jest.mocked(fetchFcbhChapters).mockResolvedValue([
			{
				id: 'GEN/1',
				number: 1,
				title: 'Genesis 1',
				duration: 123,
				text: 'In the beginning...',
				url: 'https://example.com/audio.mp3',
				book_name: 'Genesis',
				version_id: 'ENGKJV2',
				version_name: 'King James Version',
			},
		]);

		when(fetchApi)
			.calledWith(SearchBibleBooksDocument, expect.anything())
			.mockResolvedValue({
				sequences: {
					nodes: [],
				},
			});

		when(fetchApi)
			.calledWith(GetGraphqlChaptersDocument, expect.anything())
			.mockResolvedValue({
				recordings: {
					nodes: [],
				},
			});
	});

	it('returns book chapters case insensitive', async () => {
		const result = await getChapters('ENGKJV2', 'genesis');

		expect(result?.length).toBeGreaterThan(0);
	});

	it('converts book name to title case', async () => {
		jest.mocked(fetchResponse).mockRejectedValue(new Error('Not found'));

		await getChapters('472', 'genesis').catch(() => null);

		expect(fetchApi).toHaveBeenCalledWith(
			SearchBibleBooksDocument,
			expect.objectContaining({
				variables: expect.objectContaining({
					bookSearch: 'Genesis',
				}),
			}),
		);
	});
});
