import { renderHook } from '@testing-library/react';

import { useBibleVersionIndicesQuery } from './__generated__/useChapterAvailability';
import useChapterAvailability from './useChapterAvailability';

jest.mock('./__generated__/useChapterAvailability');

function loadIndices() {
	jest.mocked(useBibleVersionIndicesQuery).mockReturnValue({
		data: {
			collections: {
				nodes: [
					{
						id: 'the_version_id',
						sequences: {
							nodes: [
								{
									title: 'Genesis',
									recordings: {
										nodes: [
											{
												title: 'Genesis 1',
											},
										],
									},
								},
							],
						},
					},
				],
			},
		},
	} as any);
}

describe('useChapterAvailability', () => {
	beforeEach(() => {
		loadIndices();
	});

	it('returns null when there is no data', () => {
		jest.mocked(useBibleVersionIndicesQuery).mockReturnValue({
			data: undefined,
		} as any);

		const { result } = renderHook(() => useChapterAvailability('Genesis', 1));

		expect(result.current).toBe(null);
	});

	it('returns availability', () => {
		const { result } = renderHook(() => useChapterAvailability('Genesis', 1));

		expect(result.current?.['the_version_id']).toBeTruthy();
	});

	it('reports no availability when book and chapter are not found', () => {
		const { result } = renderHook(() => useChapterAvailability('Exodus', 1));

		expect(result.current?.['the_version_id']).toBeFalsy();
	});

	it('returns true for fcbh versions', () => {
		const { result } = renderHook(() => useChapterAvailability('Genesis', 1));

		expect(result.current?.['ENGKJV2']).toBeTruthy();
	});
});
