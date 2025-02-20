import { getFcbhFilesetId } from './getFcbhFilesetId';

describe('getFcbhFilesetId', () => {
	it('should convert ENGKJV2 to ENGKJVO2DA', () => {
		expect(getFcbhFilesetId('ENGKJV2')).toBe('ENGKJVO2DA');
	});

	it('should handle other Bible IDs', () => {
		expect(getFcbhFilesetId('SPNRV95')).toBe('SPNRVO5DA');
	});

	it('should throw error for invalid Bible ID format', () => {
		expect(() => getFcbhFilesetId('INVALID')).toThrow(
			'Invalid Bible ID format',
		);
	});
});
