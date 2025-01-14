import { CollectionContentType } from '~src/__generated__/graphql';
import { BibleIndexProps } from '~src/containers/bible';
import root from '~src/lib/routes';

import { BOOK_ID_MAP } from './constants';
import { getBibleBookChapters } from './getBibleBookChapters';
import { IBibleBookChapter, IBibleVersion } from './types';

type ApiBible = BibleIndexProps['versions'][0];
type ApiBook = NonNullable<ApiBible['sequences']['nodes']>[0];
type ApiChapter = NonNullable<ApiBook['recordings']['nodes']>[0];

export default async function transformBible(
	languageRoute: string,
	bible: IBibleVersion,
): Promise<ApiBible> {
	const books = Object.keys(BOOK_ID_MAP).map(
		async (bookId, i): Promise<ApiBook> => {
			const testament = i < 39 ? 'OT' : 'NT';
			const bbChapters = await getBibleBookChapters(
				bible.id,
				testament,
				bookId,
			);
			const title = bbChapters[0].book_name;

			if (!title) {
				console.log({ bible, testament, bookId, bbChapters });
				throw new Error(
					`Could not determine book title: ${bible.id} ${testament} ${bookId}`,
				);
			}

			const chapters = bbChapters.map(
				(bbChapter: IBibleBookChapter): ApiChapter => {
					return {
						id: bbChapter.id,
						title: bbChapter.title,
						canonicalPath: root
							.lang(languageRoute)
							.bibles.versionId(bible.id)
							.bookId(bookId)
							.chapterNumber(bbChapter.number)
							.get(),
						collection: {
							id: bible.id,
							contentType: CollectionContentType.BibleVersion,
						},
					};
				},
			);

			return {
				id: bookId,
				title,
				recordings: {
					nodes: chapters,
				},
			};
		},
	);
	return {
		...bible,
		sequences: {
			nodes: await Promise.all(books),
		},
	};
}
