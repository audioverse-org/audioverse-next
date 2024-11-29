import { IBibleVersion } from '~src/lib/api/bibleBrain';

export function getChapters(
	audiobibles: IBibleVersion[],
	selected: string | null,
) {
	const books = audiobibles[0].books;
	console.log({ selected, books });
	const chapters = books?.find(
		(book) => book?.name.toLowerCase() === selected?.toLowerCase(),
	)?.chapters;

	return chapters;
}

export function getBookId(title: string, audiobibles: IBibleVersion[]) {
	const books = audiobibles[0].books;
	const book = books?.find((book) => book?.name === title);

	return book?.book_id;
}
