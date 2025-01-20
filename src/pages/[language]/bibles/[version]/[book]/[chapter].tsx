import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import Book, { BookProps } from '~containers/bible/book';
import { REVALIDATE, REVALIDATE_FAILURE } from '~lib/constants';
import getAnyBible from '~src/services/bibles/getAnyBible';

export default Book;

const notFound = {
	notFound: true,
	revalidate: REVALIDATE_FAILURE,
} satisfies GetStaticPropsResult<BookProps & IBaseProps>;

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

	const bibleBook = version.sequences.nodes?.find(
		({ title }) => bookName === title,
	);

	if (!bibleBook) {
		console.log('bible book not found:', bookName);
		return notFound;
	}

	const chapters = bibleBook.recordings.nodes;

	if (!chapters?.length) {
		console.log('chapters not found');
		return notFound;
	}

	return {
		props: {
			version,
			book: bibleBook,
			chapters,
			chapterNumber,
			title: bibleBook.title,
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
