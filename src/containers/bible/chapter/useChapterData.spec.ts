import isServerSide from '~src/lib/isServerSide';
import renderHookWithProviders from '~src/lib/test/renderHookWithProviders';

import { useChapterData } from './useChapterData';

jest.mock('~src/lib/isServerSide');

describe('useChapterData', () => {
	beforeEach(() => {
		jest.mocked(isServerSide).mockReturnValue(false);
	});

	it('disables queries when on server side', async () => {
		jest.mocked(isServerSide).mockReturnValue(true);

		const { result } = await renderHookWithProviders(() =>
			useChapterData({
				versionId: 'ENGKJV',
				bookId: 'GEN',
				chapterNumber: 1,
			}),
		);

		expect(result.current.version).toBeUndefined();
		expect(result.current.chapters).toBeNull();
		expect(result.current.chapter).toBeNull();
		expect(result.current.versions).toEqual([]);
		expect(result.current.isLoading).toBe(false);
	});
});
