import { getFcbhFilesetId } from './getFcbhFilesetId';

describe('getFcbhFilesetId', () => {
	it('should convert ENGKJV2 to ENGKJVO2DA for Old Testament', () => {
		expect(getFcbhFilesetId('ENGKJV2', 'OT')).toBe('ENGKJVO2DA');
	});

	it('should convert ENGKJV2 to ENGKJVN2DA for New Testament', () => {
		expect(getFcbhFilesetId('ENGKJV2', 'NT')).toBe('ENGKJVN2DA');
	});

	it('should handle other Bible IDs', () => {
		expect(getFcbhFilesetId('SPNRV95', 'OT')).toBe('SPNRVO5DA');
		expect(getFcbhFilesetId('SPNRV95', 'NT')).toBe('SPNRVN5DA');
	});

	it('should throw error for invalid Bible ID format', () => {
		expect(() => getFcbhFilesetId('INVALID', 'OT')).toThrow(
			'Invalid Bible ID format',
		);
	});
});
