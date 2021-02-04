import Book, { BookProps } from '@containers/bibles/book';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import {
	getBibleBookDetailPageData,
	getBibleBookDetailPathsData,
} from '@lib/generated/graphql';
import { makeBibleBookRoute } from '@lib/routes';
import { REVALIDATE } from '@lib/constants';

export default Book;

interface StaticProps {
	props: BookProps;
	revalidate: number;
}

export async function getStaticProps({
	params,
}: {
	params: { id: string; book: string };
}): Promise<StaticProps> {
	const { id, book } = params;

	const data = await getBibleBookDetailPageData({
		versionId: id,
		bookId: `${id}-${book}`,
	});

	return {
		props: { data },
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
