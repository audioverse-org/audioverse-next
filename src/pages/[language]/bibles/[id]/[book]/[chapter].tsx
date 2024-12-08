import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import Book, { BookProps } from '~containers/bible/book';
import { LANGUAGES, REVALIDATE, REVALIDATE_FAILURE } from '~lib/constants';
import root from '~lib/routes';
import { BibleIndexProps } from '~src/containers/bible';
import {
	concatBibles,
	getApiBibles,
	getFcbhBibles,
} from '~src/lib/getBibleStaticProps';
import { getLanguageIdByRoute } from '~src/lib/getLanguageIdByRoute';
import { getBible } from '~src/services/fcbh/getBible';
import { getBibleBookChapters } from '~src/services/fcbh/getBibleBookChapters';
import { getBibles } from '~src/services/fcbh/getBibles';

export default Book;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	language: string;
	id: string;
	book: string;
	chapter: string;
}>): Promise<GetStaticPropsResult<BookProps & BibleIndexProps & IBaseProps>> {
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
		({ book_id }) => `${id}/${book}` === book_id,
	);
	if (!bibleBook) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
		};
	}
	const chapters = await getBibleBookChapters(id, bibleBook.testament, book);

	const languageRoute = params?.language || 'en';
	const languageId = getLanguageIdByRoute(languageRoute);

	const apiBibles = await getApiBibles(languageId);

	if (!apiBibles) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
		};
	}

	const fcbhBibles = await getFcbhBibles(languageRoute);

	return {
		props: {
			version,
			book: bibleBook,
			chapters,
			chapterNumber,
			title: bibleBook.name,
			data: concatBibles(fcbhBibles, apiBibles),
		},
		revalidate: fcbhBibles ? REVALIDATE : REVALIDATE_FAILURE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const response = await getBibles();
	return {
		paths: (response || [])
			.map((version) =>
				(version.books || []).map(({ book_id }) =>
					root
						.lang(LANGUAGES.ENGLISH.base_urls[0])
						.bibles.bookId(book_id)
						.chapterNumber(1)
						.get(),
				),
			)
			.flat(2),
		fallback: 'blocking',
	};
}
