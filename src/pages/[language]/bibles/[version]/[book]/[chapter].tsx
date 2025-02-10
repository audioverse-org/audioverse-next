import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import Book, { BookProps } from '~containers/bible/book';
import { REVALIDATE, REVALIDATE_FAILURE } from '~lib/constants';
import getAnyBible from '~src/services/bibles/getAnyBible';
import getAnyBibleBookChapter from '~src/services/bibles/getAnyBibleBookChapter';
import getAnyBibleBookChapters from '~src/services/bibles/getAnyBibleBookChapters';

export default Book;

const notFound = {
	notFound: true,
	revalidate: REVALIDATE_FAILURE,
} satisfies GetStaticPropsResult<BookProps & IBaseProps>;

// TODO:
// Query for book separate from getAnyBible to simplify getAnyBible query
// Query for current chapter separate from getAnyBible and chapters query to simplify other queries

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	version: string;
	book: string;
	chapter: string;
}>): Promise<GetStaticPropsResult<BookProps & IBaseProps>> {
	const versionId = params?.version as string;
	const bookName = params?.book as string;
	const chapterNumber = params?.chapter as string;
	const version = await getAnyBible(versionId).catch((e) => {
		console.log(e);
		return null;
	});

	if (!version) {
		console.log('version not found');
		return notFound;
	}

	const chapters = await getAnyBibleBookChapters(versionId, bookName);

	if (!chapters?.length) {
		console.log('chapters not found');
		return notFound;
	}

	const chapter = await getAnyBibleBookChapter(
		versionId,
		bookName,
		chapterNumber,
	);

	if (!chapter) {
		console.log('chapter not found');
		return notFound;
	}

	return {
		props: {
			version,
			book: { id: bookName, title: bookName },
			chapters,
			chapter,
			title: bookName,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: [],
		fallback: 'blocking',
	};
}
