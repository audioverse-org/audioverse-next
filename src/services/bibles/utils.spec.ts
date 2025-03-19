import { toTitleCase } from './utils';

describe('utils', () => {
	describe('toTitleCase', () => {
		it('preserves leading number', () => {
			expect(toTitleCase('1 John')).toBe('1 John');
		});
	});
});
