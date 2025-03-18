import isServerSide from '~src/lib/isServerSide';
import renderHookWithProviders from '~src/lib/test/renderHookWithProviders';

import { useVersion } from './useVersion';

jest.mock('~src/lib/isServerSide');

describe('useVersion', () => {
	beforeEach(() => {
		jest.mocked(isServerSide).mockReturnValue(false);
	});

	it('disables query when on server side', async () => {
		jest.mocked(isServerSide).mockReturnValue(true);

		const { result } = await renderHookWithProviders(() =>
			useVersion('ENGKJV'),
		);

		expect(result.current.data).toBeUndefined();
		expect(result.current.isLoading).toBe(false);
	});
});
