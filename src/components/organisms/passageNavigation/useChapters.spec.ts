import isServerSide from '~src/lib/isServerSide';
import renderHookWithProviders from '~src/lib/test/renderHookWithProviders';
import getChapters from '~src/services/bibles/getChapters';

import useChapters from './useChapters';

jest.mock('~src/lib/isServerSide');
jest.mock('~src/services/bibles/getChapters');

describe('useChapters', () => {
	beforeEach(() => {
		jest.mocked(isServerSide).mockReturnValue(false);
		jest.mocked(getChapters).mockResolvedValue([]);
	});

	it('returns undefined if still loading chapters', async () => {
		const { result } = await renderHookWithProviders(() =>
			useChapters('1', 'GEN'),
		);

		expect(result.current?.data).toBeUndefined();
	});

	it('does not query data on server side', () => {
		jest.mocked(isServerSide).mockReturnValue(true);

		renderHookWithProviders(() => useChapters('1', 'GEN'));

		expect(getChapters).not.toHaveBeenCalled();
	});
});
