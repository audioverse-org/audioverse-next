import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import Book, { ChapterProps } from '~src/containers/bible/chapter';
import { REVALIDATE } from '~src/lib/constants';
import getBible from '~src/services/bibles/getBible';
import getChapter from '~src/services/bibles/getChapter';
import getChapters from '~src/services/bibles/getChapters';
import getVersions from '~src/services/bibles/getVersions';

export default Book;

const notFound = {
	notFound: true,
} satisfies GetStaticPropsResult<ChapterProps & IBaseProps>;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	version: string;
	book: string;
	chapter: string;
}>): Promise<GetStaticPropsResult<ChapterProps & IBaseProps>> {
	const versionId = params?.version as string;
	const bookName = params?.book as string;
	const chapterNumber = params?.chapter as string;
	const version = await getBible(versionId).catch((e) => {
		console.error(e);
		return null;
	});

	if (!version) {
		console.error('version not found');
		return notFound;
	}

	const chapters = await getChapters(versionId, bookName);

	if (!chapters?.length) {
		console.error('chapters not found');
		return notFound;
	}

	const chapter = await getChapter(versionId, bookName, Number(chapterNumber));

	if (!chapter) {
		console.error('chapter not found');
		return notFound;
	}

	const versions = await getVersions();

	return {
		props: {
			version,
			book: { id: bookName, title: bookName },
			chapters,
			chapter,
			versions,
			title: bookName,
		},
		revalidate: REVALIDATE,
	};
}

export function getStaticPaths(): GetStaticPathsResult {
	return {
		paths: [],
		fallback: 'blocking',
	};
}
