import { Testament } from '../types';

/**
 * Converts a Bible ID to its FCBH fileset ID
 * Example: ENGKJV2 -> ENGKJVO2DA (Old Testament) or ENGKJVN2DA (New Testament)
 */
export function getFcbhFilesetId(
	versionId: string,
	testament: Testament,
): string {
	const digits = versionId.match(/\d+$/)?.[0];

	if (!digits) {
		throw new Error('Invalid Bible ID format');
	}

	const base = versionId.slice(0, -digits.length);
	const lastDigit = digits.slice(-1);
	const testamentLetter = testament === 'OT' ? 'O' : 'N';

	return `${base}${testamentLetter}${lastDigit}DA`;
}
