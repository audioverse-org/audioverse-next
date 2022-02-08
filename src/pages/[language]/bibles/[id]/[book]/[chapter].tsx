import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import Book, { BookProps } from '@containers/bible/book';
import { getBible, getBibleBookChapters, getBibles } from '@lib/api/bibleBrain';
import { LANGUAGES, REVALIDATE, REVALIDATE_FAILURE } from '@lib/constants';
import { makeBibleBookRoute } from '@lib/routes';

export default Book;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	id: string;
	book: string;
	chapter: string;
}>): Promise<GetStaticPropsResult<BookProps & IBaseProps>> {
	const id = params?.id as string;
	const book = params?.book as string;
	const chapterNumber = params?.chapter as string;
	const version = await getBible(id).catch((e) => {
		console.log(e);
		return null;
	});
	if (!version) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
		};
	}

	const bibleBook = version.books.find(
		({ book_id }) => `${id}/${book}` === book_id
	);
	if (!bibleBook) {
		return {
			notFound: true,
		};
	}
	const chapters = await getBibleBookChapters(id, bibleBook.testament, book);

	return {
		props: {
			version,
			book: bibleBook,
			chapters,
			chapterNumber,
			title: bibleBook.name,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const response = await getBibles();
	return {
		paths: (response || [])
			.map((version) =>
				(version.books || []).map(({ book_id }) =>
					makeBibleBookRoute(LANGUAGES.ENGLISH.base_url, book_id)
				)
			)
			.flat(2),
		fallback: 'blocking',
	};
}
