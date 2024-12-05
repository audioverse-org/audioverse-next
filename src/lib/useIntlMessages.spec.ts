import { renderHook, waitFor } from '@testing-library/react';

import useIntlMessages from '~src/lib/useIntlMessages';

import getIntlMessages from './getIntlMessages';

jest.mock('./getIntlMessages');

describe('useIntlMessages', () => {
	beforeEach(() => {
		jest.mocked(getIntlMessages).mockResolvedValue({
			the_key: [{ value: 'the_value' }],
		});
	});

	it("returns spanish messages when the language is 'es'", async () => {
		const { result, rerender } = renderHook(() => useIntlMessages('es'));

		rerender();

		await waitFor(() => {
			expect(result.current).toEqual(
				expect.objectContaining({
					the_key: expect.arrayContaining([
						expect.objectContaining({ value: 'the_value' }),
					]),
				}),
			);
		});
	});

	it('does not re-import current language', async () => {
		const { result, rerender } = renderHook(() => useIntlMessages('es'));

		rerender();

		await waitFor(() => {
			expect(result.current).toEqual(
				expect.objectContaining({
					the_key: expect.anything(),
				}),
			);
		});

		expect(getIntlMessages).toHaveBeenCalledTimes(1);
	});

	it('does not re-import english language', async () => {
		const { rerender } = renderHook(() => useIntlMessages('en'));

		rerender();

		expect(getIntlMessages).not.toHaveBeenCalled();
	});
});
