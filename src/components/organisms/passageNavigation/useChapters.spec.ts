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

	it('returns undefined data and isLoading true when still loading chapters', async () => {
		// Mock getChapters to return a promise that never resolves to simulate loading state
		let resolvePromise: (value: any[]) => void;
		const neverResolvingPromise = new Promise<any[]>((resolve) => {
			resolvePromise = resolve;
		});
		jest.mocked(getChapters).mockReturnValue(neverResolvingPromise);

		const { result } = await renderHookWithProviders(() =>
			useChapters('1', 'GEN'),
		);

		expect(result.current?.data).toBeUndefined();
		expect(result.current?.isLoading).toBe(true);

		// Clean up by resolving the promise
		resolvePromise!([]);
	});

	it('does not query data on server side', () => {
		jest.mocked(isServerSide).mockReturnValue(true);

		renderHookWithProviders(() => useChapters('1', 'GEN'));

		expect(getChapters).not.toHaveBeenCalled();
	});
});
