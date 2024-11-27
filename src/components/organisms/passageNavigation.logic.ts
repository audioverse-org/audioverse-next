import { PassageNavigationFragment } from './__generated__/passageNavigation';

export function getChapters(
	audiobibles: PassageNavigationFragment,
	selected: string | null,
) {
	const books = audiobibles.nodes?.[0].books;
	const chapters = books?.find((book) => book?.title === selected)?.chapters;

	return chapters;
}
