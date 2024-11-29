import { GetBibleBookContentDocument } from '../../lib/api/__generated__/bibleContent';
import { buildLoader } from '../../lib/test/buildLoader';
import { getBibleBookChapters } from './getBibleBookChapters';
import getResponse from './getResponse';

jest.mock('./getResponse');

const loadData = buildLoader(GetBibleBookContentDocument, {});

describe('bibleBrain', () => {
	beforeEach(() => {
		jest.mocked(getResponse).mockResolvedValue({
			data: [
				{
					book_id: 'GEN',
					book_name: 'Genesis',
					chapter_start: 2,
					path: 'ENGKJV/GEN/2.mp3',
					duration: 1,
				},
				{
					book_id: 'GEN',
					book_name: 'Genesis',
					chapter_start: 1,
					path: 'ENGKJV/GEN/1.mp3',
					duration: 1,
				},
			],
		});
		loadData();
	});

	it('sorts chapters', async () => {
		const result = await getBibleBookChapters('ENGKJV', 'OLD', 'GEN');

		expect(result[0].number).toBe(1);
		expect(result[1].number).toBe(2);
	});
});
