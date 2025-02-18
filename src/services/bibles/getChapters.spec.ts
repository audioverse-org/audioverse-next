import { fetchFcbhChapters } from './fcbh/fetchFcbhChapters';
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
	});

	it('returns book chapters case insensitive', async () => {
		const result = await getChapters('ENGKJV2', 'genesis');

		expect(result?.length).toBeGreaterThan(0);
	});
});
