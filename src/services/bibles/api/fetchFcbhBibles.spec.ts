import { FCBH_VERSIONS, fetchFcbhBibles } from './fetchFcbhBibles';
import { fetchFcbhChapters } from './fetchFcbhChapters';
import fetchResponse from './fetchResponse';

jest.mock('./fetchResponse');
jest.mock('./fetchFcbhChapters');

describe('fetchFcbhBibles', () => {
	beforeEach(() => {
		jest.mocked(fetchResponse).mockResolvedValue({
			data: {
				books: [{ book_id: 'the_book_id', testament: 'the_testament' }],
				id: 'the_version_id',
			},
		});

		jest.mocked(fetchFcbhChapters).mockResolvedValue([
			{
				title: 'the_chapter_title',
			} as any,
		]);
	});

	it('fetches chapters', async () => {
		await fetchFcbhBibles();

		expect(fetchFcbhChapters).toBeCalled();
	});

	it('fetches chapters for the correct book', async () => {
		await fetchFcbhBibles();

		expect(fetchFcbhChapters).toBeCalledWith(
			FCBH_VERSIONS[0].id,
			'the_testament',
			'the_book_id',
		);
	});

	it('includes chapters in return value', async () => {
		const bibles = await fetchFcbhBibles();

		expect(bibles).toContainEqual(
			expect.objectContaining({
				books: expect.arrayContaining([
					expect.objectContaining({
						book_id: `${FCBH_VERSIONS[0].id}/the_book_id`,
						chapters_full: expect.arrayContaining([
							expect.objectContaining({
								title: 'the_chapter_title',
							}),
						]),
					}),
				]),
			}),
		);
	});
});
