import { fetchFcbhChapters } from './fcbh/fetchFcbhChapters';
import getBible from './getBible';

jest.mock('./fcbh/fetchFcbhChapters');

describe('getBible', () => {
	it('fetches fcbh bible chapters', async () => {
		jest.mocked(fetchFcbhChapters).mockResolvedValue([]);

		await getBible('ENGKJV2');

		expect(fetchFcbhChapters).toBeCalled();
	});
});
