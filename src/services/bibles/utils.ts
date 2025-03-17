export function parseChapterNumber(chapterTitle: string): number {
	const d = Number(chapterTitle.split(' ').pop());
	return isNaN(d) ? 1 : d;
}

export function parseBookName(chapterTitle: string): string {
	return chapterTitle.split(' ').slice(0, -1).join(' ');
}

// SOURCE: https://stackoverflow.com/a/196991
export function toTitleCase(str: string) {
	return str.replace(
		/\w\S*/g,
		(text: string) =>
			text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
	);
}
