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
import getBookMeta from '~src/services/bibles/getBookName';
import getChapter from '~src/services/bibles/getChapter';
import getChapters from '~src/services/bibles/getChapters';
import getVersions from '~src/services/bibles/getVersions';

export default Book;

const notFound = {
	notFound: true,
} satisfies GetStaticPropsResult<ChapterProps & IBaseProps>;

export async function getStaticProps({
	params,
}: GetStaticPropsContext): Promise<
	GetStaticPropsResult<ChapterProps & IBaseProps>
> {
	const versionId = params?.version as string;
	const bookMeta = getBookMeta(decodeURIComponent(params?.book as string));
	const chapterNumber = Number(params?.chapter);

	if (!versionId || !bookMeta || !chapterNumber) {
		console.error('Missing required parameters', {
			versionId,
			bookMeta,
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

	const chapters = await getChapters(versionId, bookMeta.fcbhId);

	if (!chapters?.length) {
		console.error('Chapters not found for book:', bookMeta.fcbhId);
		return notFound;
	}

	const chapter = await getChapter(versionId, bookMeta.fcbhId, chapterNumber);

	if (!chapter) {
		console.error('Chapter not found:', { bookName: bookMeta, chapterNumber });
		return notFound;
	}

	const versions = await getVersions().then((v) =>
		Promise.all(
			v.map(async (v) => ({
				...v,
				disabled: !(await doesVersionHaveChapter(
					v.id,
					bookMeta.fullName,
					chapterNumber,
				)),
			})),
		),
	);

	return {
		props: {
			version,
			book: { id: bookMeta.fcbhId, title: bookMeta.fullName },
			chapters,
			chapter,
			versions,
			title: bookMeta.fullName,
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
