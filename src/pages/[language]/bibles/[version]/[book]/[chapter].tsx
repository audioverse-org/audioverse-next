import { GetServerSidePropsResult, GetStaticPropsContext } from 'next';

import { IBaseProps } from '~containers/base';
import Book, { BookProps } from '~containers/bible/book';
import getAnyBible from '~src/services/bibles/getAnyBible';
import getAnyBibleBookChapter from '~src/services/bibles/getAnyBibleBookChapter';
import getAnyBibleBookChapters from '~src/services/bibles/getAnyBibleBookChapters';

export default Book;

const notFound = {
	notFound: true,
} satisfies GetServerSidePropsResult<BookProps & IBaseProps>;

export async function getServerSideStaticProps({
	params,
}: GetStaticPropsContext<{
	version: string;
	book: string;
	chapter: string;
}>): Promise<GetServerSidePropsResult<BookProps & IBaseProps>> {
	const versionId = params?.version as string;
	const bookName = params?.book as string;
	const chapterNumber = params?.chapter as string;
	const version = await getAnyBible(versionId).catch((e) => {
		console.error(e);
		return null;
	});

	if (!version) {
		console.error('version not found');
		return notFound;
	}

	const chapters = await getAnyBibleBookChapters(versionId, bookName);

	if (!chapters?.length) {
		console.error('chapters not found');
		return notFound;
	}

	const chapter = await getAnyBibleBookChapter(
		versionId,
		bookName,
		Number(chapterNumber),
	);

	if (!chapter) {
		console.error('chapter not found');
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
	};
}
