import { fetchFcbhChapters } from './fcbh/fetchFcbhChapters';
import getAnyBible from './getAnyBible';

jest.mock('./fcbh/fetchFcbhChapters');

describe('getAnyBible', () => {
	it('fetches fcbh bible chapters', async () => {
		jest.mocked(fetchFcbhChapters).mockResolvedValue([]);

		await getAnyBible('ENGKJV2');

		expect(fetchFcbhChapters).toBeCalled();
	});
});
