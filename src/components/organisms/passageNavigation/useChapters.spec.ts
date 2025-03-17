import { renderHook, waitFor } from '@testing-library/react';

import isServerSide from '~src/lib/isServerSide';

import { useBooksQuery, useChaptersQuery } from './__generated__/useChapters';
import useChapters from './useChapters';

jest.mock('./__generated__/useChapters');
jest.mock('~src/lib/isServerSide');

describe('useChapters', () => {
	beforeEach(() => {
		jest.mocked(useBooksQuery).mockReturnValue({
			data: {
				sequences: { nodes: [{ id: 'the_sequence_id', title: 'Genesis' }] },
			},
		} as any);

		jest.mocked(useChaptersQuery).mockReturnValue({
			data: {
				recordings: { nodes: [{ id: 'the_chapter_id', title: 'Genesis 1' }] },
			},
		} as any);

		jest.mocked(isServerSide).mockReturnValue(false);
	});

	it('returns graphql chapters', () => {
		const { result } = renderHook(() => useChapters('1', 'GEN'));

		expect(result.current).toHaveLength(1);
	});

	it('returns fcbh chapters', async () => {
		const { result } = renderHook(() => useChapters('ENGKJV2', 'GEN'));

		await waitFor(() => {
			expect(result.current?.length).toBeGreaterThan(1);
		});
	});

	it('returns undefined if still loading chapters', () => {
		jest.mocked(useChaptersQuery).mockReturnValue({
			data: undefined,
		} as any);

		const { result } = renderHook(() => useChapters('1', 'GEN'));

		expect(result.current).toBeUndefined();
	});

	it('converts chapter ids to numbers', async () => {
		renderHook(() => useChapters('1', 'GEN'));

		expect(useChaptersQuery).toHaveBeenCalledWith(
			expect.objectContaining({
				sequenceId: 'the_sequence_id',
			}),
			expect.anything(),
		);
	});

	it('does not query data on server side', () => {
		jest.mocked(isServerSide).mockReturnValue(true);

		renderHook(() => useChapters('1', 'GEN'));

		expect(useBooksQuery).toHaveBeenCalledWith(
			expect.objectContaining({
				collectionId: expect.anything(),
			}),
			expect.objectContaining({
				enabled: false,
			}),
		);
	});

	it('does not query fcbh on server side', () => {
		jest.mocked(isServerSide).mockReturnValue(true);

		const { result } = renderHook(() => useChapters('ENGKJV2', 'GEN'));

		expect(result.current).toBeUndefined();
	});
});
