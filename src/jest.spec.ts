import { when } from 'jest-when';
import { resolveWithDelay } from '@lib/test/resolveWithDelay';

describe('jest and helpers', () => {
	it('can setup failing mock with when', async () => {
		const fn = jest.fn();

		when(fn).calledWith(1).mockRejectedValue('Oops!');

		await expect(() => fn(1)).rejects.toMatch('Oops!');
	});

	it('can add deferred default after training', async () => {
		const fn = jest.fn();

		when(fn).calledWith(1).mockRejectedValue('Oops!');

		resolveWithDelay(fn, { ms: 50, value: 'default' });

		await expect(() => fn(1)).rejects.toMatch('Oops!');
		await expect(fn()).resolves.toEqual('default');
	});

	it('can add default after training, reduced', async () => {
		const fn = jest.fn();

		when(fn).calledWith(1).mockReturnValue('a');

		// https://github.com/timkindberg/jest-when/issues/59#issuecomment-922558860
		when(fn).mockReturnValue('b');

		expect(fn(1)).toEqual('a');
		expect(fn(2)).toEqual('b');
	});
});
