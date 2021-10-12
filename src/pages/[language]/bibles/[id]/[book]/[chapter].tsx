import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import Book, { BookProps } from '@containers/bible/book';
import { REVALIDATE } from '@lib/constants';
import {
	getBibleBookDetailPageData,
	getBibleBookDetailPathsData,
} from '@lib/generated/graphql';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeBibleBookRoute } from '@lib/routes';

export default Book;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	id: string;
	book: string;
	chapter: string;
}>): Promise<GetStaticPropsResult<BookProps>> {
	const id = params?.id as string;
	const book = params?.book as string;
	const chapter = params?.chapter as string;

	const { audiobible } = await getBibleBookDetailPageData({
		versionId: id,
		bookId: `${id}-${book}`,
	}).catch(() => ({ audiobible: null }));

	return {
		props: { audiobible, chapterNumber: chapter },
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const languageRoutes = getLanguageRoutes();
	const data = await getBibleBookDetailPathsData({});
	const bibles = data?.audiobibles.nodes || [];
	const books = bibles.map((b) => b.books).flat();
	const bookIds = books.map((b) => b.id);
	const pathSets = languageRoutes.map((r) =>
		bookIds.map((id) => makeBibleBookRoute(r, id))
	);

	return {
		paths: pathSets.flat(),
		fallback: 'blocking',
	};
}
