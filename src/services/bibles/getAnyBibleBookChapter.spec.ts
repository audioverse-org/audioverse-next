import { fetchFcbhChapters } from './fcbh/fetchFcbhChapters';
import getAnyBibleBookChapter from './getAnyBibleBookChapter';

jest.mock('./fcbh/fetchFcbhChapters');

describe('getAnyBibleBookChapter', () => {
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
	});

	it('looks up book case insensitively', async () => {
		const result = await getAnyBibleBookChapter('ENGKJV2', 'GENESIS', 1);

		expect(result).toBeDefined();
		expect(result?.id).toBe('GEN/1');
	});
});
