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
}: {
	params: { id: string; book: string; chapter: string };
}): Promise<StaticProps<BookProps>> {
	const { id, book, chapter } = params;

	const { audiobible } = await getBibleBookDetailPageData({
		versionId: id,
		bookId: `${id}-${book}`,
	}).catch(() => ({ audiobible: null }));

	return {
		props: { audiobible, chapterNumber: chapter },
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
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
		fallback: true,
	};
}
