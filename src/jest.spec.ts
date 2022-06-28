import { when } from 'jest-when';

describe('jest and helpers', () => {
	it('can setup failing mock with when', async () => {
		const fn = jest.fn();

		when(fn).calledWith(1).mockRejectedValue('Oops!');

		await expect(() => fn(1)).rejects.toMatch('Oops!');
	});

	// TODO: https://github.com/timkindberg/jest-when/issues/59
	// it('can add deferred default after training', async () => {
	// 	const fn = jest.fn();
	//
	// 	when(fn).calledWith(1).mockRejectedValue('Oops!');
	//
	// 	resolveWithDelay(fn, 50, 'default');
	//
	// 	await expect(() => fn(1)).rejects.toMatch('Oops!');
	// 	await expect(fn).resolves.toMatch('default');
	// });

	// TODO: https://github.com/timkindberg/jest-when/issues/59
	// it('can add default after training, reduced', async () => {
	// 	const fn = jest.fn();
	//
	// 	when(fn).calledWith(1).mockReturnValue('a');
	//
	// 	fn.mockReturnValue('b');
	//
	// 	expect(fn(1)).toEqual('a');
	// 	expect(fn(2)).toEqual('b');
	// });
});
