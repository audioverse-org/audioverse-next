import { useQuery } from '@tanstack/react-query';

import isServerSide from '~src/lib/isServerSide';
import getBookMeta from '~src/services/bibles/getBookMeta';
import getChapter from '~src/services/bibles/getChapter';
import getChapters from '~src/services/bibles/getChapters';
import getRelatedTeachings from '~src/services/bibles/getRelatedTeachings';
import getVersion from '~src/services/bibles/getVersion';
import getVersions from '~src/services/bibles/getVersions';

export function useChapterData(params: {
	versionId: string;
	bookId: string;
	chapterNumber: number;
}) {
	const { versionId, bookId, chapterNumber } = params;
	const decodedBookId = decodeURIComponent(bookId);
	const bookMeta = getBookMeta(decodedBookId);

	const version = useQuery({
		queryKey: ['bibleVersion', versionId],
		queryFn: () => getVersion(versionId),
		enabled: !!versionId && !isServerSide(),
	});

	const chapters = useQuery({
		queryKey: ['bibleChapters', versionId, bookMeta?.fcbhId],
		queryFn: () => getChapters(versionId, bookMeta?.fcbhId || ''),
		enabled: !!versionId && !!bookMeta?.fcbhId && !isServerSide(),
	});

	const chapter = useQuery({
		queryKey: ['bibleChapter', versionId, bookMeta?.fcbhId, chapterNumber],
		queryFn: () => getChapter(versionId, bookMeta?.fcbhId || '', chapterNumber),
		enabled:
			!!versionId && !!bookMeta?.fcbhId && !!chapterNumber && !isServerSide(),
	});

	const versions = useQuery({
		queryKey: ['bibleVersions'],
		queryFn: () => getVersions(),
		enabled: !isServerSide(),
	});

	const relatedTeachings = useQuery({
		queryKey: ['relatedTeachings'],
		queryFn: () => getRelatedTeachings(bookId, chapterNumber),
		enabled: !isServerSide(),
	});

	return {
		version: version.data,
		book: bookMeta ? { id: bookMeta.fcbhId, title: bookMeta.fullName } : null,
		chapters: chapters.data || null,
		chapter: chapter.data || null,
		versions: versions.data || [],
		relatedTeachings: relatedTeachings.data || null,
		isLoading:
			version.isLoading ||
			chapters.isLoading ||
			chapter.isLoading ||
			versions.isLoading ||
			relatedTeachings.isLoading,
	};
}
