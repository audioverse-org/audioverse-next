import { fetchFcbhChapters } from './fcbh/fetchFcbhChapters';
import getBook from './getBook';

jest.mock('./fcbh/fetchFcbhChapters');

describe('getBook', () => {
	beforeEach(() => {
		jest.mocked(fetchFcbhChapters).mockResolvedValue([]);
	});

	it('finds fcbh book case insensitive', async () => {
		const book = await getBook('ENGKJV2', 'genesis');

		expect(book).toBeDefined();
	});
});
