import { fetchApi } from '~lib/api/fetchApi';

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

	it('finds graphql book by name', async () => {
		jest.mocked(fetchFcbhChapters).mockRejectedValue(new Error('Not found'));

		jest.mocked(fetchApi).mockResolvedValueOnce({
			sequences: {
				nodes: [
					{ id: 'graphql-a', title: 'a' },
					{ id: 'graphql-b', title: 'b' },
				],
			},
		});

		const book = await getBook('ENGKJV2', 'b');

		expect(book?.title).toBe('b');
	});

	it('finds book by name case insensitive', async () => {
		jest.mocked(fetchFcbhChapters).mockRejectedValue(new Error('Not found'));

		jest.mocked(fetchApi).mockResolvedValueOnce({
			sequences: {
				nodes: [
					{ id: 'graphql-a', title: 'a' },
					{ id: 'graphql-b', title: 'b' },
				],
			},
		});

		const book = await getBook('ENGKJV2', 'B');

		expect(book?.title).toBe('b');
	});
});
