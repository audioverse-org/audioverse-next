import { renderHook } from '@testing-library/react';

import isServerSide from '~src/lib/isServerSide';

import { useRefreshedRecordings } from './useRefreshedRecordings';

jest.mock('~src/lib/isServerSide');

describe('useRefreshedRecordings', () => {
	it('returns null on server side', () => {
		jest.mocked(isServerSide).mockReturnValue(true);

		const { result } = renderHook(() =>
			useRefreshedRecordings([{ id: '1' } as any]),
		);

		expect(result.current).toBeNull();
	});
});
