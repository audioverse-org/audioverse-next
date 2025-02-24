export function parseChapterNumber(title: string): number {
	const d = Number(title.split(' ').pop());
	return isNaN(d) ? 1 : d;
}

// SOURCE: https://stackoverflow.com/a/196991
export function toTitleCase(str: string) {
	return str.replace(
		/\w\S*/g,
		(text: string) =>
			text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
	);
}
