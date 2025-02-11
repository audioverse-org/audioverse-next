export function parseChapterNumber(title: string): number {
	const d = Number(title.split(' ').pop());
	return isNaN(d) ? 1 : d;
}
