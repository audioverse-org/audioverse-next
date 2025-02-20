import { getFcbhBookId } from './getFcbhBookId';

describe('getFcbhBookId', () => {
	it('should convert book name to FCBH ID', () => {
		expect(getFcbhBookId('1 Samuel')).toBe('1SA');
		expect(getFcbhBookId('Genesis')).toBe('GEN');
	});

	it('should handle URL-encoded book names', () => {
		expect(getFcbhBookId('1%20Samuel')).toBe('1SA');
	});

	it('should throw error for invalid book names', () => {
		expect(() => getFcbhBookId('Invalid Book')).toThrow(
			'Book Invalid Book not found in BIBLE_BOOK_METAS',
		);
	});
});
