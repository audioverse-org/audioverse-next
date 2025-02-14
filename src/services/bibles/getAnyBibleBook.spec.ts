import { fetchFcbhChapters } from './fcbh/fetchFcbhChapters';
import getAnyBibleBook from './getAnyBibleBook';

jest.mock('./fcbh/fetchFcbhChapters');

describe('getAnyBibleBook', () => {
	beforeEach(() => {
		jest.mocked(fetchFcbhChapters).mockResolvedValue([]);
	});

	it('finds fcbh book case insensitive', async () => {
		const book = await getAnyBibleBook('ENGKJV2', 'genesis');

		expect(book).toBeDefined();
	});
});
