/**
 * Converts a Bible ID to its FCBH fileset ID
 * Example: ENGKJV2 -> ENGKJVO2DA
 */
export function getFcbhFilesetId(bibleId: string): string {
	// Extract all digits from the end of the ID
	const digits = bibleId.match(/\d+$/)?.[0];
	if (!digits) {
		throw new Error(`Invalid Bible ID format: ${bibleId}`);
	}

	// Take all but the last digit for the base
	const base = bibleId.slice(0, -digits.length);
	// Take just the last digit for the suffix
	const lastDigit = digits.slice(-1);

	return `${base}O${lastDigit}DA`;
}
