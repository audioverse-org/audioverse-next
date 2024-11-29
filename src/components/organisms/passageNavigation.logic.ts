import { PassageNavigationFragment } from './__generated__/passageNavigation';

export function getChapters(
	audiobibles: PassageNavigationFragment,
	selected: string | null,
) {
	const books = audiobibles.nodes?.[0].books;
	const chapters = books?.find((book) => book?.title === selected)?.chapters;

	return chapters;
}

export function getBookId(
	title: string,
	audiobibles: PassageNavigationFragment,
) {
	const books = audiobibles.nodes?.[0].books;
	const book = books?.find((book) => book?.title === title);

	return book?.id;
}
