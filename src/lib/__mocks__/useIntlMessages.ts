import { waitFor } from '@testing-library/react';

declare module '@lib/useIntlMessages' {
	function __waitForIntlMessages(): Promise<void>;
}

const fn = () => {
	const { default: actual } = jest.requireActual('@lib/useIntlMessages');
	return actual();
};

const useIntlMessages = jest.fn(fn);

beforeEach(() => {
	useIntlMessages.mockImplementation(fn);
});

export default useIntlMessages;

export async function __waitForIntlMessages() {
	await waitFor(() => {
		const { results } = useIntlMessages.mock;

		// WORKAROUND: This could be done with an additional expectation. But
		// we try to limit one expectation per waitFor() call, and including two
		// waitFor() calls in this helper would result in a moment in time when
		// this waiting period would not be wrapped in act(), which would result
		// in intermittent "not wrapped in act()" console errors. Hence, we throw
		// an error instead of using an additional expectation.
		// https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-unnecessary-act.md
		// https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
		if (results.length === 0) {
			throw new Error('useIntlMessages not called');
		}

		const { value } = results[results.length - 1];

		expect(value).toEqual(
			expect.objectContaining({
				loading: false,
			})
		);
	});
}
