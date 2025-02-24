import { fetchFcbhChapters } from './fetchFcbhChapters';
import fetchResponse from './fetchResponse';

jest.mock('./fetchResponse');

describe('fetchFcbhChapters', () => {
	beforeEach(() => {
		jest.mocked(fetchResponse).mockResolvedValue({
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
	});

	it('sorts chapters', async () => {
		const result = await fetchFcbhChapters(
			'ENGKJV2',
			'King James Version (Dramatized)',
			'OT',
			'ENGKJV2/GEN',
		);

		expect(result[0].number).toBe(1);
		expect(result[1].number).toBe(2);
	});

	it('uses correct fileset ID format', async () => {
		await fetchFcbhChapters(
			'ENGKJV2',
			'King James Version (Dramatized)',
			'OT',
			'ENGKJV2/GEN',
		);

		expect(fetchResponse).toHaveBeenCalledWith('/bibles/filesets/ENGKJVO2DA?');

		await fetchFcbhChapters(
			'ENGKJV2',
			'King James Version (Dramatized)',
			'NT',
			'ENGKJV2/MAT',
		);

		expect(fetchResponse).toHaveBeenCalledWith('/bibles/filesets/ENGKJVN2DA?');
	});
});
