import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import Book, { ChapterProps } from '~src/containers/bible/chapter';
import { REVALIDATE } from '~src/lib/constants';
import doesVersionHaveChapter from '~src/services/bibles/doesVersionHaveChapter';
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
	const bookName = decodeURIComponent(params?.book as string);
	const chapterNumber = Number(params?.chapter);

	if (!versionId || !bookName || !chapterNumber) {
		console.error('Missing required parameters', {
			versionId,
			bookName,
			chapterNumber,
		});
		return notFound;
	}

	const version = await getBible(versionId).catch((e) => {
		console.error('Failed to get Bible:', e);
		return null;
	});

	if (!version) {
		console.error('Version not found:', versionId);
		return notFound;
	}

	const chapters = await getChapters(versionId, bookName);

	if (!chapters?.length) {
		console.error('Chapters not found for book:', bookName);
		return notFound;
	}

	const chapter = await getChapter(versionId, bookName, chapterNumber);

	if (!chapter) {
		console.error('Chapter not found:', { bookName, chapterNumber });
		return notFound;
	}

	const versions = await getVersions().then((v) =>
		Promise.all(
			v.map(async (v) => ({
				...v,
				disabled: !(await doesVersionHaveChapter(
					v.id,
					bookName,
					chapterNumber,
				)),
			})),
		),
	);

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
