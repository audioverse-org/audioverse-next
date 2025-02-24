import { Testament } from '../types';

/**
 * Converts a Bible ID to its FCBH fileset ID
 * Example: ENGKJV2 -> ENGKJVO2DA (Old Testament) or ENGKJVN2DA (New Testament)
 */
export function getFcbhFilesetId(
	bibleId: string,
	testament: Testament,
): string {
	const digits = bibleId.match(/\d+$/)?.[0];

	if (!digits) {
		throw new Error('Invalid Bible ID format');
	}

	const base = bibleId.slice(0, -digits.length);
	const lastDigit = digits.slice(-1);
	const testamentLetter = testament === 'OT' ? 'O' : 'N';

	return `${base}${testamentLetter}${lastDigit}DA`;
}
