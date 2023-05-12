import { when } from 'jest-when';

describe('jest and helpers', () => {
	it('can setup failing mock with when', async () => {
		const fn = jest.fn();

		when(fn).calledWith(1).mockRejectedValue('Oops!');

		await expect(() => fn(1)).rejects.toMatch('Oops!');
	});

	// https://github.com/timkindberg/jest-when/issues/59
	it('can add default after training', async () => {
		const fn = jest.fn();

		when(fn).calledWith(1).mockReturnValue('a');

		when(fn).mockReturnValue('b');

		expect(fn(1)).toEqual('a');
		expect(fn(2)).toEqual('b');
	});

	// https://github.com/timkindberg/jest-when/issues/104
	it('supports expect.objectContaining()', async () => {
		const fn = jest.fn();

		when(fn).mockReturnValue(false);
		when(fn)
			.calledWith(
				'id',
				expect.objectContaining({
					k: 'v',
				})
			)
			.mockReturnValue(true);

		// this test passes
		expect(
			fn('id', {
				k: 'v',
			})
		).toBeTruthy();
	});

	// https://github.com/timkindberg/jest-when/issues/104
	it('deprioritizes expect.anything() against literal values', async () => {
		const fn = jest.fn();

		when(fn).calledWith('id', expect.anything()).mockReturnValue(false);
		when(fn)
			.calledWith('id', {
				k: 'v',
			})
			.mockReturnValue(true);

		// this test passes
		expect(
			fn('id', {
				k: 'v',
			})
		).toBeTruthy();
	});

	// TODO: https://github.com/timkindberg/jest-when/issues/104
	// it('deprioritizes expect.anything() against other asymmetric matchers', async () => {
	// 	const fn = jest.fn();

	// 	when(fn).calledWith('id', expect.anything()).mockReturnValue(false);
	// 	when(fn)
	// 		.calledWith(
	// 			'id',
	// 			expect.objectContaining({
	// 				k: 'v',
	// 			})
	// 		)
	// 		.mockReturnValue(true);

	// 	// this test fails
	// 	expect(
	// 		fn('id', {
	// 			k: 'v',
	// 		})
	// 	).toBeTruthy();
	// });

	// TODO: https://github.com/timkindberg/jest-when/issues/104
	// it('accounts for assymetric matcher specificity', async () => {
	// 	const fn = jest.fn();

	// 	when(fn)
	// 		.calledWith(
	// 			expect.objectContaining({
	// 				id: 'id',
	// 			})
	// 		)
	// 		.mockReturnValue(false);
	// 	when(fn)
	// 		.calledWith(
	// 			expect.objectContaining({
	// 				id: 'id',
	// 				k: 'v',
	// 			})
	// 		)
	// 		.mockReturnValue(true);

	// 	// this test fails
	// 	expect(
	// 		fn({
	// 			id: 'id',
	// 			k: 'v',
	// 		})
	// 	).toBeTruthy();
	// });
});
